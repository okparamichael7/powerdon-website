"use client";

import * as React from "react";
import type { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeWheelPicker } from "@/components/ui/time-wheel-picker";
import { cn } from "@/lib/utils";
import {
  SCREEN_TIER_IDS,
  combineLocalDateTime,
  getDeploymentDayOptions,
  getMinEventDateValue,
  splitLocalDateTime,
  toLocalDateValue,
  toLocalTimeValue,
} from "@/lib/reserve-form-schema";
import type { ReserveFormInput, ReserveFormOutput } from "@/schema";

type ReserveFormsCopy = {
  fields: {
    eventDate: string;
    startTime: string;
    deploymentAt: string;
    screenUsageQuestion: string;
    screenUsageHelper: string;
    screenContentDetails: string;
    screenTiers: Record<
      "none" | "event_display" | "full_branding",
      { label: string; contractTier: string; revShare: string }
    >;
    acceptTerms: string;
    acceptContractPrefix: string;
    acceptContractLinkText: string;
    acceptContractSuffix: string;
  };
  placeholders: {
    screenContentDetails: string;
    selectDate: string;
    selectTime: string;
    selectScreenTier: string;
  };
  deploymentHelp: string;
  deploymentHelpNoDate: string;
  deploymentDayBefore: string;
  deploymentDayOf: string;
  timePickerDone: string;
};

type FormProps = {
  control: Control<ReserveFormInput, any, ReserveFormOutput>;
  watch: UseFormWatch<ReserveFormInput>;
  copy: ReserveFormsCopy;
};

/* ------------------------------------------------------------------ */
/* Event date + start time — two focused pickers combined into the      */
/* single "eventStart" field the schema/email pipeline already expects. */
/* ------------------------------------------------------------------ */
export function EventStartField({
  control,
  copy,
  locale,
}: {
  control: Control<ReserveFormInput, any, ReserveFormOutput>;
  copy: ReserveFormsCopy;
  locale: string;
}) {
  const minDate = React.useMemo(() => getMinEventDateValue(), []);
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name="eventStart"
      render={({ field }) => {
        const { datePart, timePart } = splitLocalDateTime(
          (field.value as unknown as string) ?? "",
        );
        const selectedDate = datePart ? new Date(`${datePart}T00:00:00`) : undefined;

        return (
          <FormItem>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="event-date" className="text-black">
                  {copy.fields.eventDate}
                </Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <button
                      id="event-date"
                      type="button"
                      className={cn(
                        "mt-1 flex h-10 w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm text-black",
                        !selectedDate && "text-gray-400",
                      )}
                    >
                      <CalendarIcon className="h-4 w-4 shrink-0 text-gray-400" />
                      {selectedDate
                        ? dateFormatter.format(selectedDate)
                        : copy.placeholders.selectDate}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={selectedDate}
                      defaultMonth={selectedDate}
                      disabled={{ before: new Date(`${minDate}T00:00:00`) }}
                      onSelect={(date) => {
                        if (!date) return;
                        field.onChange(
                          combineLocalDateTime(toLocalDateValue(date), timePart),
                        );
                        setDatePickerOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="event-start-time" className="text-black">
                  {copy.fields.startTime}
                </Label>
                <div className="mt-1">
                  <TimeWheelPicker
                    id="event-start-time"
                    value={timePart}
                    disabled={!datePart}
                    placeholder={copy.placeholders.selectTime}
                    doneLabel={copy.timePickerDone}
                    onChange={(time) =>
                      field.onChange(combineLocalDateTime(datePart, time))
                    }
                  />
                </div>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Deployment moment — a day toggle (day before / day of event) plus a  */
/* time wheel bounded to the valid sub-range for whichever day is       */
/* selected, instead of a free-ranging datetime-local control.          */
/* ------------------------------------------------------------------ */
export function DeploymentField({
  control,
  watch,
  setValue,
  copy,
  locale,
}: FormProps & { setValue: UseFormSetValue<ReserveFormInput>; locale: string }) {
  const eventStart = watch("eventStart");
  const deploymentAt = watch("deploymentAt");
  const eventStartDate = eventStart ? new Date(eventStart as unknown as string) : null;
  const hasValidEventStart = Boolean(eventStartDate && !Number.isNaN(eventStartDate.getTime()));
  const disabled = !hasValidEventStart;

  const dayOptions = hasValidEventStart ? getDeploymentDayOptions(eventStartDate!) : [];
  const weekdayFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    [locale],
  );

  // Prefill deployment to "right at event start" the first time an event
  // date/time is picked, so the common case needs zero extra taps — it
  // stays fully editable afterwards.
  React.useEffect(() => {
    if (hasValidEventStart && !deploymentAt) {
      setValue(
        "deploymentAt",
        combineLocalDateTime(
          toLocalDateValue(eventStartDate!),
          toLocalTimeValue(eventStartDate!),
        ) as any,
        { shouldValidate: false },
      );
    }
    // Only seed once when eventStart first becomes available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidEventStart]);

  return (
    <FormField
      control={control}
      name="deploymentAt"
      render={({ field }) => {
        const { datePart, timePart } = splitLocalDateTime(
          (field.value as unknown as string) ?? "",
        );
        const selectedOption =
          dayOptions.find((opt) => opt.date === datePart) ?? dayOptions[0];

        return (
          <FormItem>
            <Label htmlFor="deployment-at" className="text-black">
              {copy.fields.deploymentAt}
            </Label>
            {hasValidEventStart && (
              <div className="mt-1 grid grid-cols-2 gap-2">
                {dayOptions.map((opt, i) => (
                  <button
                    key={opt.date}
                    type="button"
                    onClick={() =>
                      field.onChange(
                        combineLocalDateTime(
                          opt.date,
                          timePart && timePart >= opt.minTime && timePart <= opt.maxTime
                            ? timePart
                            : opt.minTime,
                        ),
                      )
                    }
                    className={cn(
                      "rounded-lg border p-2 text-left text-sm transition-colors",
                      selectedOption?.date === opt.date
                        ? "border-blue-400 bg-blue-50 text-black"
                        : "border-gray-300 bg-white text-gray-600",
                    )}
                  >
                    <span className="block font-medium">
                      {i === 0 ? copy.deploymentDayBefore : copy.deploymentDayOf}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {weekdayFormatter.format(new Date(`${opt.date}T00:00:00`))}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <FormControl>
              <div className="mt-2">
                <TimeWheelPicker
                  id="deployment-at"
                  value={timePart}
                  minTime={selectedOption?.minTime}
                  maxTime={selectedOption?.maxTime}
                  disabled={disabled}
                  placeholder={copy.placeholders.selectTime}
                  doneLabel={copy.timePickerDone}
                  onChange={(time) => {
                    if (!selectedOption) return;
                    field.onChange(combineLocalDateTime(selectedOption.date, time));
                  }}
                />
              </div>
            </FormControl>
            <p className="text-xs text-gray-500 mt-1.5">
              {disabled ? copy.deploymentHelpNoDate : copy.deploymentHelp}
            </p>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Screen usage — dropdown + conditional content textarea               */
/* ------------------------------------------------------------------ */
export function ScreenContentField({ control, watch, copy }: FormProps) {
  const screenTier = watch("screenTier");
  const wantsScreen = Boolean(screenTier) && screenTier !== "none";
  const selectedTier =
    screenTier && (screenTier as string) in copy.fields.screenTiers
      ? copy.fields.screenTiers[screenTier as keyof typeof copy.fields.screenTiers]
      : null;

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="screenTier"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="screen-tier" className="text-black">
              {copy.fields.screenUsageQuestion} *
            </Label>
            <p className="text-xs text-gray-500 mb-1.5">
              {copy.fields.screenUsageHelper}
            </p>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <FormControl>
                <SelectTrigger id="screen-tier" className="bg-white border-gray-300 text-black">
                  <SelectValue placeholder={copy.placeholders.selectScreenTier} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SCREEN_TIER_IDS.map((id) => (
                  <SelectItem key={id} value={id}>
                    {copy.fields.screenTiers[id].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTier && (
              <p className="text-xs text-gray-500 mt-1.5">
                {selectedTier.contractTier} · {selectedTier.revShare}
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      {wantsScreen && (
        <FormField
          control={control}
          name="screenContentDetails"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="screen-content-details" className="text-black">
                {copy.fields.screenContentDetails}
              </Label>
              <FormControl>
                <Textarea
                  id="screen-content-details"
                  rows={4}
                  className="bg-white border-gray-300 text-black mt-1"
                  placeholder={copy.placeholders.screenContentDetails}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Acceptance — terms checkbox + separate contract acceptance checkbox  */
/* ------------------------------------------------------------------ */
export function AcceptanceFields({
  control,
  copy,
  onOpenContract,
}: {
  control: Control<ReserveFormInput, any, ReserveFormOutput>;
  copy: ReserveFormsCopy;
  onOpenContract: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <FormControl>
                <Checkbox
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                  className="mt-0.5"
                />
              </FormControl>
              <span>{copy.fields.acceptTerms}</span>
            </label>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="acceptContract"
        render={({ field }) => (
          <FormItem>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <FormControl>
                <Checkbox
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                  className="mt-0.5"
                />
              </FormControl>
              <span>
                {copy.fields.acceptContractPrefix}
                <button
                  type="button"
                  onClick={onOpenContract}
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  {copy.fields.acceptContractLinkText}
                </button>
                {copy.fields.acceptContractSuffix}
              </span>
            </label>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

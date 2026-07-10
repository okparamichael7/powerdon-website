"use client";

import type { Control, UseFormWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SCREEN_TIER_IDS,
  SCREEN_TIERS,
  getDeploymentBounds,
} from "@/lib/reserve-form-schema";
import type { ReserveFormInput, ReserveFormOutput } from "@/schema";

type ReserveFormsCopy = {
  fields: {
    deploymentAt: string;
    screenUsageQuestion: string;
    screenUsageHelper: string;
    screenContentDetails: string;
    acceptTerms: string;
    acceptContractPrefix: string;
    acceptContractLinkText: string;
    acceptContractSuffix: string;
  };
  placeholders: {
    screenContentDetails: string;
  };
  deploymentHelp: string;
  deploymentHelpNoDate: string;
};

type FormProps = {
  control: Control<ReserveFormInput, any, ReserveFormOutput>;
  watch: UseFormWatch<ReserveFormInput>;
  copy: ReserveFormsCopy;
};

/* ------------------------------------------------------------------ */
/* Deployment moment — rendered directly after "Venue address"          */
/* ------------------------------------------------------------------ */
export function DeploymentField({ control, watch, copy }: FormProps) {
  const eventStart = watch("eventStart");
  const { min, max } = getDeploymentBounds(eventStart || null);
  const disabled = !eventStart;

  return (
    <FormField
      control={control}
      name="deploymentAt"
      render={({ field }) => (
        <FormItem>
          <Label htmlFor="deployment-at" className="text-black">
            {copy.fields.deploymentAt}
          </Label>
          <FormControl>
            <Input
              id="deployment-at"
              type="datetime-local"
              min={min}
              max={max}
              disabled={disabled}
              className="bg-white border-gray-300 text-black mt-1"
              {...field}
              value={(field.value as unknown as string) ?? ""}
            />
          </FormControl>
          <p className="text-xs text-gray-500 mt-1.5">
            {disabled ? copy.deploymentHelpNoDate : copy.deploymentHelp}
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Screen usage — radio group + conditional content textarea            */
/* ------------------------------------------------------------------ */
export function ScreenContentField({ control, watch, copy }: FormProps) {
  const screenTier = watch("screenTier");
  const wantsScreen = Boolean(screenTier) && screenTier !== "none";

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="screenTier"
        render={({ field }) => (
          <FormItem>
            <Label className="text-black">{copy.fields.screenUsageQuestion} *</Label>
            <p className="text-xs text-gray-500 mb-1.5">
              {copy.fields.screenUsageHelper}
            </p>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? ""}
                className="gap-3"
              >
                {SCREEN_TIER_IDS.map((id) => {
                  const tier = SCREEN_TIERS[id];
                  return (
                    <label
                      key={id}
                      htmlFor={`screen-tier-${id}`}
                      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                        field.value === id
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <RadioGroupItem value={id} id={`screen-tier-${id}`} className="mt-1" />
                      <span className="text-sm text-black">
                        <span className="font-medium">{tier.label}</span>
                        <br />
                        <span className="text-xs text-gray-500">
                          {tier.contractTier} · {tier.revShare}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            </FormControl>
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

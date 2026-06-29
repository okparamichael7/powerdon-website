"use client";

import { useState } from "react";
import { ArrowLeft, Landmark, ListFilter, ReceiptText } from "lucide-react";
import { FaPaypal } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { cn } from "@/lib/utils";

type Method = "paypal" | "bank";

type PayoutMethodValue = {
  method: Method;
  detail: string;
};

export function Payouts() {
  const { namespace } = useTranslation();
  const copy = namespace("affiliate").payouts;

  const [open, setOpen] = useState(false);
  const [savedMethod, setSavedMethod] = useState<PayoutMethodValue | null>(null);

  const summary = savedMethod
    ? copy.method.configured
        .replace(
          "{label}",
          copy.dialog.options[savedMethod.method].label,
        )
        .replace("{detail}", savedMethod.detail)
    : copy.method.none;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-blue-50/70 via-blue-50/40 to-white p-6 md:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
        {copy.title}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="border-blue-200 bg-white/80 shadow-sm">
          <CardContent className="space-y-2 p-6">
            <p className="text-sm font-semibold text-gray-900">
              {copy.terms.title}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {copy.terms.cycleLabel}
            </p>
            <p className="text-sm text-gray-500">{copy.terms.description}</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white/80 shadow-sm">
          <CardContent className="space-y-3 p-6">
            <p className="text-sm font-semibold text-gray-900">
              {copy.method.title}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-blue-300 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    {savedMethod ? (
                      <>{copy.method.change}</>
                    ) : (
                      <>
                        <span aria-hidden="true" className="mr-1.5">
                          +
                        </span>
                        {copy.method.setCta}
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <PayoutMethodDialog
                  onClose={() => setOpen(false)}
                  onSave={(value) => {
                    setSavedMethod(value);
                    setOpen(false);
                  }}
                />
              </Dialog>
              <span className="text-sm text-gray-500">{summary}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          aria-label={copy.filterLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-gray-500 hover:text-gray-800"
        >
          <ListFilter className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <ReceiptText
            className="h-9 w-9 text-blue-400"
            aria-hidden="true"
            strokeWidth={1.5}
          />
        </div>
        <p className="mt-6 text-base font-semibold text-gray-900">
          {copy.empty.title}
        </p>
        <p className="mt-1 text-sm text-gray-500">{copy.empty.description}</p>
      </div>
    </div>
  );
}

function PayoutMethodDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (value: PayoutMethodValue) => void;
}) {
  const { namespace } = useTranslation();
  const copy = namespace("affiliate").payouts.dialog;

  const [selected, setSelected] = useState<Method | null>(null);
  const [detail, setDetail] = useState("");

  const activeOption = selected ? copy.options[selected] : null;

  const canAdd = selected !== null && detail.trim().length > 0;

  return (
    <DialogContent className="max-w-md rounded-3xl border-blue-200 bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8">
      <div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {copy.back}
        </button>
        <DialogTitle className="mt-6 text-center text-2xl font-semibold text-gray-900">
          {copy.title}
        </DialogTitle>
      </div>

      <div className="mt-6 space-y-3">
        <MethodOption
          method="paypal"
          icon={
            <FaPaypal
              className="h-6 w-6 text-[#003087]"
              aria-hidden="true"
            />
          }
          label={copy.options.paypal.label}
          isActive={selected === "paypal"}
          onSelect={() => setSelected("paypal")}
        />
        <MethodOption
          method="bank"
          icon={
            <Landmark
              className="h-6 w-6 text-blue-700"
              aria-hidden="true"
              strokeWidth={1.5}
            />
          }
          label={copy.options.bank.label}
          isActive={selected === "bank"}
          onSelect={() => setSelected("bank")}
        />
      </div>

      {activeOption && (
        <div className="mt-5">
          <Label
            htmlFor="payout-detail"
            className="text-xs font-semibold text-gray-700"
          >
            {activeOption.detailLabel}
          </Label>
          <Input
            id="payout-detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            placeholder={activeOption.detailPlaceholder}
            className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
          />
        </div>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-full border-blue-300 px-6 text-sm font-semibold text-blue-700 hover:bg-blue-50"
        >
          {copy.back}
        </Button>
        <Button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            if (selected) {
              onSave({ method: selected, detail: detail.trim() });
            }
          }}
          className="rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-200 disabled:text-white"
        >
          {copy.add}
        </Button>
      </div>
    </DialogContent>
  );
}

function MethodOption({
  method,
  icon,
  label,
  isActive,
  onSelect,
}: {
  method: Method;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      data-method={method}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border bg-white px-5 py-4 text-left transition-colors",
        isActive
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-blue-200 hover:border-blue-300",
      )}
    >
      {icon}
      <span className="text-base font-semibold text-gray-900">{label}</span>
    </button>
  );
}

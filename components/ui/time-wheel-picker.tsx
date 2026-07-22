"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ITEM_HEIGHT = 40;
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i); // 0..23
const MINUTES_60 = Array.from({ length: 60 }, (_, i) => i); // 0..59

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime(value: string | undefined): { hour: number; minute: number } | null {
  const match = value ? /^(\d{1,2}):(\d{2})$/.exec(value) : null;
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function candidateOf(hour: number, minute: number): string {
  return `${pad2(hour)}:${pad2(minute)}`;
}

function withinBounds(candidate: string, minTime?: string, maxTime?: string): boolean {
  if (minTime && candidate < minTime) return false;
  if (maxTime && candidate > maxTime) return false;
  return true;
}

/**
 * Wheel-style time picker (24h hour / minute columns that scroll and snap to
 * a centered value) modeled on the classic Android spinner time picker.
 * Renders as a trigger button + popover, so it drops into a form the same
 * way a text input would. When no value has been chosen yet, the wheel
 * opens positioned at the visitor's current local time (their device clock)
 * rather than a fixed default, so it starts somewhere relevant to them.
 */
export function TimeWheelPicker({
  id,
  value,
  onChange,
  minTime,
  maxTime,
  disabled,
  placeholder,
  doneLabel,
  className,
}: {
  id?: string;
  value: string; // "HH:mm", 24h, "" if unset
  onChange: (value: string) => void;
  minTime?: string; // "HH:mm", inclusive
  maxTime?: string; // "HH:mm", inclusive
  disabled?: boolean;
  placeholder: string;
  doneLabel: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const parsed = parseTime(value);
  const clientNow = React.useMemo(() => {
    const now = new Date();
    return { hour: now.getHours(), minute: now.getMinutes() };
  }, []);
  const fallback = withinBounds(candidateOf(clientNow.hour, clientNow.minute), minTime, maxTime)
    ? clientNow
    : parseTime(minTime) ?? clientNow;
  const { hour, minute } = parsed ?? fallback;

  const commit = (nextHour: number, nextMinute: number) => {
    const candidate = candidateOf(nextHour, nextMinute);
    if (minTime && candidate < minTime) return onChange(minTime);
    if (maxTime && candidate > maxTime) return onChange(maxTime);
    onChange(candidate);
  };

  const hourAllowed = (h: number) =>
    MINUTES_60.some((m) => withinBounds(candidateOf(h, m), minTime, maxTime));
  const minuteAllowed = (m: number) => withinBounds(candidateOf(hour, m), minTime, maxTime);

  const label = parsed ? candidateOf(hour, minute) : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm text-black disabled:cursor-not-allowed disabled:opacity-50",
            !parsed && "text-gray-400",
            className,
          )}
        >
          <Clock className="h-4 w-4 shrink-0 text-gray-400" />
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-stretch justify-center gap-1">
          <WheelColumn
            items={HOURS_24}
            value={hour}
            format={pad2}
            isDisabled={(h) => !hourAllowed(h)}
            onSelect={(h) => commit(h, minute)}
            ariaLabel="Hour"
          />
          <span className="flex items-center text-lg font-medium text-gray-400">:</span>
          <WheelColumn
            items={MINUTES_60}
            value={minute}
            format={pad2}
            isDisabled={(m) => !minuteAllowed(m)}
            onSelect={(m) => commit(hour, m)}
            ariaLabel="Minute"
          />
        </div>
        <Button
          type="button"
          size="sm"
          className="mt-3 w-full bg-black hover:bg-gray-800"
          onClick={() => setOpen(false)}
        >
          {doneLabel}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function WheelColumn<T extends string | number>({
  items,
  value,
  format,
  isDisabled,
  onSelect,
  ariaLabel,
}: {
  items: T[];
  value: T;
  format: (item: T) => string;
  isDisabled: (item: T) => boolean;
  onSelect: (item: T) => void;
  ariaLabel: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const settleTimeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selectedIndex = Math.max(items.indexOf(value), 0);
  const selectedIndexRef = React.useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  // Keep the wheel scrolled to the current value when it changes from
  // outside this column (typing, or another column's change clamping this
  // one via the min/max bounds).
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = selectedIndex * ITEM_HEIGHT;
    if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target;
  }, [selectedIndex]);

  const handleScroll = () => {
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const index = Math.min(Math.max(Math.round(el.scrollTop / ITEM_HEIGHT), 0), items.length - 1);
      const item = items[index];
      if (item === undefined) return;
      if (isDisabled(item)) {
        el.scrollTo({ top: selectedIndexRef.current * ITEM_HEIGHT, behavior: "smooth" });
        return;
      }
      if (item !== value) onSelect(item);
    }, 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const delta = e.key === "ArrowUp" ? -1 : 1;
    for (let i = selectedIndex + delta; i >= 0 && i < items.length; i += delta) {
      if (!isDisabled(items[i])) {
        onSelect(items[i]);
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="listbox"
      aria-label={ariaLabel}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      className="relative h-[120px] w-14 snap-y snap-mandatory overflow-y-scroll scroll-smooth outline-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 border-y border-blue-400"
        style={{ top: ITEM_HEIGHT, height: ITEM_HEIGHT }}
      />
      <div style={{ height: ITEM_HEIGHT }} />
      {items.map((item, i) => {
        const disabled = isDisabled(item);
        const selected = i === selectedIndex;
        return (
          <button
            type="button"
            key={format(item)}
            disabled={disabled}
            onClick={() => onSelect(item)}
            aria-selected={selected}
            className={cn(
              "flex h-10 w-full snap-center items-center justify-center text-base transition-colors",
              selected ? "font-semibold text-black" : "text-gray-400",
              disabled && "pointer-events-none opacity-30",
            )}
          >
            {format(item)}
          </button>
        );
      })}
      <div style={{ height: ITEM_HEIGHT }} />
    </div>
  );
}

"use client";

import { useFormContext } from "react-hook-form";

// Real users never see or fill this field; bots filling forms
// programmatically usually populate every input they find.
export function HoneypotField() {
  const { register } = useFormContext();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        height: 0,
        overflow: "hidden",
      }}
    >
      <label htmlFor="website">Website</label>
      <input
        type="text"
        id="website"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
      />
    </div>
  );
}

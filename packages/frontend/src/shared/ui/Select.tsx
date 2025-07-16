import React, { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "בחרי אפשרות",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  // ✅ סגירה בלחיצה מחוץ לרכיב
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-right shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-dark"
      >
        {selectedLabel || placeholder}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto rounded-md border border-border bg-white shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              className={cn(
                "px-4 py-2 text-sm",
                opt.disabled
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "cursor-pointer hover:bg-primary/10",
                value === opt.value && !opt.disabled && "bg-primary/20 font-semibold"
              )}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

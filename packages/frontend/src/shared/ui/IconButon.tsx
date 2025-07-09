// shared/ui/IconButton.tsx
import * as React from "react";
import { cn } from "../utils/cn";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "danger" | "outline";
  icon: React.ReactNode;
  size?: "sm" | "md";
}

export const IconButton = ({
  variant = "outline",
  size = "sm",
  icon,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-all",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        variant === "danger" &&
          "bg-red-500 hover:bg-red-600 text-white shadow",
        variant === "outline" &&
          "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800",
        className
      )}
    >
      {icon}
    </button>
  );
};

IconButton.displayName = "IconButton";

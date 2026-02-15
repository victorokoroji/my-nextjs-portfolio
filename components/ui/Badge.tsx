"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  const variants = {
    primary:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    secondary:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    outline:
      "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

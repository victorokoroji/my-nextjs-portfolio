"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { copied, copy };
}

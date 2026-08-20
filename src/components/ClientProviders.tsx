"use client";

import type { ReactNode } from "react";
import { QuotePrefillProvider } from "@/hooks/useQuotePrefill";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <QuotePrefillProvider>{children}</QuotePrefillProvider>;
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Page-width wrapper: 1240px max, 16 / 32 / 48px side padding (mobile / tablet / desktop).
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-page px-4 sm:px-8 lg:px-12", className)}>{children}</div>;
}

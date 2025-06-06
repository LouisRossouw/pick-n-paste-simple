import { cn } from "@/lib/utils";

export function AppVersion({ className }: { className?: string }) {
  return <p className={cn("text-light", className)}>v1.0.0</p>;
}

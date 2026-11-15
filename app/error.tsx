"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md rounded-xl border border-border bg-surface p-6 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-bold text-ink">Unable to load portfolio section</h2>
        <p className="mt-2 text-sm text-muted">
          {error.message || "An unexpected rendering issue occurred."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}

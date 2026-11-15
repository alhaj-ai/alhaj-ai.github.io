import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md rounded-xl border border-border bg-surface p-8 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
          404
        </span>
        <h1 className="mt-2 text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-muted">
          The page you requested does not exist on alhaj-ai.github.io.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

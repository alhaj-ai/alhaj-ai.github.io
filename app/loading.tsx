export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas px-4 py-16 sm:px-6" role="status" aria-label="Loading portfolio">
      <div className="mx-auto max-w-6xl animate-pulse space-y-10">
        <div className="space-y-4">
          <div className="h-6 w-56 rounded-full bg-surface-elevated" />
          <div className="h-12 w-80 rounded-lg bg-surface-elevated" />
          <div className="h-5 w-full max-w-2xl rounded bg-surface-elevated" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 rounded-xl border border-border bg-surface" />
          <div className="h-64 rounded-xl border border-border bg-surface" />
        </div>
      </div>
    </div>
  );
}

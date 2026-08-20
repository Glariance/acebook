type InquiryLoadingStateProps = {
  title?: string;
  description?: string;
};

export default function InquiryLoadingState({
  title = "Loading dashboard",
  description = "Fetching inquiry records. This will only take a moment.",
}: InquiryLoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-xl rounded-2xl border border-brand/20 bg-white/90 p-8 text-center shadow-lg backdrop-blur-sm">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand/25 border-t-brand" />
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand/70 [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand/70 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand/70 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

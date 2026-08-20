const INQUIRY_FORM_SELECTOR = "form[data-inquiry-form]";

export function preventNativeInquiryFormSubmit(event: Event) {
  const target = event.target;
  if (!(target instanceof HTMLFormElement)) return;
  if (!target.matches(INQUIRY_FORM_SELECTOR)) return;
  event.preventDefault();
}

export function installInquiryFormGuard() {
  if (typeof document === "undefined") return () => {};

  document.addEventListener("submit", preventNativeInquiryFormSubmit, true);

  return () => {
    document.removeEventListener("submit", preventNativeInquiryFormSubmit, true);
  };
}

export function installDevConsoleFilters() {
  if (!import.meta.env.DEV || typeof console === "undefined") return;

  const ignoredMessages = [
    "Download the React DevTools for a better development experience",
  ];

  const shouldIgnore = (args: unknown[]) =>
    typeof args[0] === "string" && ignoredMessages.some((msg) => args[0].includes(msg));

  (["log", "info"] as const).forEach((method) => {
    const original = console[method].bind(console);
    console[method] = (...args: unknown[]) => {
      if (shouldIgnore(args)) return;
      original(...args);
    };
  });
}

export function installExtensionNoiseFilters() {
  if (typeof window === "undefined") return () => {};

  const onRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const message =
      typeof reason === "string"
        ? reason
        : reason instanceof Error
          ? reason.message
          : "";

    if (message.includes("message channel closed before a response was received")) {
      event.preventDefault();
    }
  };

  window.addEventListener("unhandledrejection", onRejection);
  return () => window.removeEventListener("unhandledrejection", onRejection);
}

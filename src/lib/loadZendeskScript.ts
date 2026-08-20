const DEFAULT_ZENDESK_KEY = "6c44defe-f64e-402f-934f-3dd3091ab4fe";

function zendeskSnippetKey(): string {
  const raw = import.meta.env.VITE_ZENDESK_KEY;
  if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
  return DEFAULT_ZENDESK_KEY;
}

function appendHeadLink(rel: "preconnect" | "dns-prefetch", href: string, crossOrigin = false): void {
  if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (crossOrigin) link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

function warmupZendeskOrigins(): void {
  if (typeof document === "undefined") return;
  appendHeadLink("dns-prefetch", "https://static.zdassets.com");
  appendHeadLink("preconnect", "https://static.zdassets.com", true);
  appendHeadLink("dns-prefetch", "https://widget-mediator.zopim.com");
  appendHeadLink("preconnect", "https://widget-mediator.zopim.com", true);
}

export function isZendeskSnippetReady(): boolean {
  if (typeof document === "undefined") return false;
  const script = document.getElementById("ze-snippet") as HTMLScriptElement | null;
  return script?.dataset.zendeskLoaded === "true";
}

export function loadZendeskScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  warmupZendeskOrigins();

  const existing = document.getElementById("ze-snippet") as HTMLScriptElement | null;
  if (existing) {
    if (existing.dataset.zendeskLoaded === "true") return Promise.resolve();
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Zendesk snippet failed to load")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = "ze-snippet";
    s.async = true;
    s.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskSnippetKey()}`;
    s.onload = () => {
      s.dataset.zendeskLoaded = "true";
      resolve();
    };
    s.onerror = () => reject(new Error("Zendesk snippet failed to load"));
    document.body.appendChild(s);
  });
}

export function scheduleZendeskOnInteraction(runAfterLoad: () => void, fallbackDelayMs = 12000): void {
  if (typeof window === "undefined") return;
  let done = false;
  const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart", "scroll"];

  const cleanup = () => {
    for (const eventName of events) {
      window.removeEventListener(eventName, trigger, true);
    }
  };

  const trigger = () => {
    if (done) return;
    done = true;
    cleanup();
    runAfterLoad();
  };

  for (const eventName of events) {
    window.addEventListener(eventName, trigger, { once: true, passive: true, capture: true });
  }

  window.setTimeout(trigger, fallbackDelayMs);
}

import { SITE_PHONE_TEL } from "@/constants/contact";
import { isZendeskSnippetReady, loadZendeskScript } from "@/lib/loadZendeskScript";

type ZeApi = ((cb: () => void) => void) & {
  (channel: string, action: string, ...rest: unknown[]): void;
  activate?: () => void;
  show?: () => void;
};

type ZeWindow = Window & {
  zE?: ZeApi;
  __zendeskUnreadAutoOpenBound?: boolean;
};

function openZendeskFallback() {
  window.location.href = `tel:${SITE_PHONE_TEL}`;
}

export function tryOpenZendeskWidget(api: ZeApi): boolean {
  const candidates: Array<() => void> = [
    () => {
      (api as ZeApi)("messenger", "render");
      (api as ZeApi)("messenger", "show");
      (api as ZeApi)("messenger", "open");
    },
    () => {
      (api as ZeApi)("messenger", "open");
    },
    () => {
      (api as ZeApi)("webWidget", "show");
      (api as ZeApi)("webWidget", "open");
    },
    () => (api as ZeApi)("webWidget", "open"),
    () => api.activate?.(),
    () => api.show?.(),
  ];
  for (const run of candidates) {
    try {
      run();
      return true;
    } catch {
      /* try next */
    }
  }
  return false;
}

function runWhenZeReady(run: (api: ZeApi) => void): boolean {
  if (!isZendeskSnippetReady()) return false;
  const zE = (window as ZeWindow).zE;
  if (typeof zE !== "function") return false;
  try {
    zE(function () {
      const api = (window as ZeWindow).zE;
      if (api && typeof api === "function") run(api);
    });
    return true;
  } catch {
    return false;
  }
}

function attemptOpenZendeskWidget(): boolean {
  return runWhenZeReady((api) => {
    tryOpenZendeskWidget(api);
  });
}

/** Click the Zendesk launcher button in the DOM if the API open call is a no-op. */
function clickZendeskLauncher(): boolean {
  const selectors = [
    "#launcher",
    "iframe#launcher",
    "button[data-testid='launcher']",
    "[data-garden-id='buttons.icon_button']",
    "div[role='presentation'] iframe",
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    if (el instanceof HTMLIFrameElement) {
      try {
        el.contentDocument?.querySelector("button")?.click();
        return true;
      } catch {
        /* cross-origin iframe — click the frame itself */
        el.click();
        return true;
      }
    }
    if (el instanceof HTMLElement) {
      el.click();
      return true;
    }
  }
  // Zendesk classic launcher iframe title
  const frames = document.querySelectorAll("iframe");
  for (const frame of frames) {
    const title = (frame.getAttribute("title") || "").toLowerCase();
    const name = (frame.getAttribute("name") || "").toLowerCase();
    if (title.includes("messaging") || title.includes("launcher") || name.includes("launcher")) {
      frame.click();
      return true;
    }
  }
  return false;
}

/**
 * Open Zendesk chat on demand. Retries until the messenger opens;
 * falls back to phone only if the snippet fails to load.
 */
export function openZendeskChat(): void {
  const tryOpen = () => {
    attemptOpenZendeskWidget();
    window.setTimeout(() => clickZendeskLauncher(), 100);
  };

  if (isZendeskSnippetReady() && typeof (window as ZeWindow).zE === "function") {
    tryOpen();
    scheduleZendeskAutoOpen({ intervalMs: 100, maxAttempts: 40, force: true });
    return;
  }

  void loadZendeskScript()
    .then(() => {
      tryOpen();
      scheduleZendeskAutoOpen({ intervalMs: 80, maxAttempts: 100, force: true });
      const delays = [200, 500, 1000, 2000];
      for (const delay of delays) {
        window.setTimeout(tryOpen, delay);
      }
    })
    .catch(() => {
      if (!clickZendeskLauncher()) openZendeskFallback();
    });
}

export function syncZendeskPageContext(overrides?: { title?: string; url?: string }): void {
  if (!isZendeskSnippetReady()) return;
  const title = overrides?.title ?? document.title;
  const url = overrides?.url ?? window.location.href;
  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  runWhenZeReady((api) => {
    const attempts: Array<() => void> = [
      () => (api as ZeApi)("webWidget", "updatePath", { url, title }),
      () => (api as ZeApi)("webWidget", "updatePath", { path, title }),
      () => (api as ZeApi)("webWidget", "updatePath", { title, url }),
    ];
    for (const run of attempts) {
      try {
        run();
        return;
      } catch {
        /* try next signature */
      }
    }
  });
}

export function shouldAutoOpenZendeskWidget(pathname: string): boolean {
  return !pathname.startsWith("/inquiry-details");
}

let zendeskAutoOpenIntervalId: number | null = null;

/**
 * Force-opens Zendesk once the snippet is ready. Polls until open is attempted.
 */
export function scheduleZendeskAutoOpen(options?: {
  maxAttempts?: number;
  intervalMs?: number;
  force?: boolean;
}): void {
  const maxAttempts = options?.maxAttempts ?? 150;
  const intervalMs = options?.intervalMs ?? 80;

  attemptOpenZendeskWidget();

  if (zendeskAutoOpenIntervalId != null && !options?.force) return;

  if (zendeskAutoOpenIntervalId != null) {
    window.clearInterval(zendeskAutoOpenIntervalId);
    zendeskAutoOpenIntervalId = null;
  }

  let attempts = 0;
  zendeskAutoOpenIntervalId = window.setInterval(() => {
    attempts += 1;
    attemptOpenZendeskWidget();
    if (attempts >= maxAttempts) {
      if (zendeskAutoOpenIntervalId != null) window.clearInterval(zendeskAutoOpenIntervalId);
      zendeskAutoOpenIntervalId = null;
    }
  }, intervalMs);
}

/** Burst retries after load — covers slow messenger initialization. */
export function forceZendeskPopupBurst(): void {
  const delays = [0, 120, 300, 600, 1200, 2000, 3500];
  for (const delay of delays) {
    window.setTimeout(() => {
      scheduleZendeskAutoOpen({ intervalMs: 60, maxAttempts: 40, force: true });
    }, delay);
  }
}

function bindUnreadHandlers(api: ZeApi): boolean {
  const handlers: Array<() => void> = [
    () =>
      (api as ZeApi)("messenger:on", "unreadMessages", (count: unknown) => {
        if (typeof count === "number" && count > 0) tryOpenZendeskWidget(api);
      }),
    () =>
      (api as ZeApi)("webWidget:on", "chat:unreadMessages", (count: unknown) => {
        if (typeof count === "number" && count > 0) tryOpenZendeskWidget(api);
      }),
  ];
  for (const run of handlers) {
    try {
      run();
      return true;
    } catch {
      /* try next event API */
    }
  }
  return false;
}

/** Reopen when a new unread message arrives while minimized. */
export function enableZendeskUnreadAutoOpen(): void {
  const w = window as ZeWindow;
  if (w.__zendeskUnreadAutoOpenBound) return;
  if (!isZendeskSnippetReady()) return;
  runWhenZeReady((api) => {
    if (bindUnreadHandlers(api)) {
      w.__zendeskUnreadAutoOpenBound = true;
    }
  });
}

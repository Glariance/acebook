const AWSO_DESK_SRC = "https://awsodesk.com/widget.js?team=qtTwifpKqz";
const AWSO_DESK_TEAM = "qtTwifpKqz";
const AWSO_DESK_SCRIPT_ID = "lcp-snippet";
const AWSO_DESK_HOST_ID = "lcp-widget";

type LiveChatApi = {
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
};

type AwsodeskWindow = Window & {
  LiveChat?: LiveChatApi;
  __LCP_LOADED?: boolean;
};

let loadPromise: Promise<void> | null = null;
let scrollContainmentBound = false;

export function isAwsodeskSnippetReady(): boolean {
  if (typeof document === "undefined") return false;
  return (
    Boolean((window as AwsodeskWindow).__LCP_LOADED) ||
    Boolean(document.getElementById(AWSO_DESK_HOST_ID)) ||
    Boolean(document.getElementById(AWSO_DESK_SCRIPT_ID))
  );
}

/** Ensures the async head snippet is present (idempotent fallback). */
export function loadAwsodeskScript(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if ((window as AwsodeskWindow).__LCP_LOADED || document.getElementById(AWSO_DESK_HOST_ID)) {
    return Promise.resolve();
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(AWSO_DESK_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if ((window as AwsodeskWindow).__LCP_LOADED || document.getElementById(AWSO_DESK_HOST_ID)) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("AWSOdesk snippet failed to load")), {
        once: true,
      });
      window.setTimeout(() => {
        if ((window as AwsodeskWindow).__LCP_LOADED || document.getElementById(AWSO_DESK_HOST_ID)) {
          resolve();
        }
      }, 0);
      return;
    }

    const s = document.createElement("script");
    s.id = AWSO_DESK_SCRIPT_ID;
    s.async = true;
    s.src = AWSO_DESK_SRC;
    s.setAttribute("data-team", AWSO_DESK_TEAM);
    s.onload = () => resolve();
    s.onerror = () => {
      loadPromise = null;
      reject(new Error("AWSOdesk snippet failed to load"));
    };
    document.head.appendChild(s);
  });

  return loadPromise;
}

function getLiveChatApi(): LiveChatApi | null {
  const api = (window as AwsodeskWindow).LiveChat;
  return api && typeof api === "object" ? api : null;
}

function tryOpenViaApi(): boolean {
  const api = getLiveChatApi();
  if (!api) return false;
  if (typeof api.open === "function") {
    api.open();
    return true;
  }
  if (typeof api.toggle === "function") {
    api.toggle();
    return true;
  }
  return false;
}

/** Open chat via official `window.LiveChat` API (Chat With Us CTAs). */
export function openAwsodeskChat(): void {
  if (tryOpenViaApi()) return;

  void loadAwsodeskScript()
    .then(() => {
      if (tryOpenViaApi()) return;
      let tries = 0;
      const id = window.setInterval(() => {
        tries += 1;
        if (tryOpenViaApi() || tries >= 50) window.clearInterval(id);
      }, 100);
    })
    .catch(() => {
      /* Launcher still available if the script recovers */
    });
}

function isScrollableY(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el);
  const oy = style.overflowY;
  if (oy !== "auto" && oy !== "scroll" && oy !== "overlay") return false;
  return el.scrollHeight > el.clientHeight + 1;
}

function findScrollableInPath(path: EventTarget[], host: HTMLElement): HTMLElement | null {
  for (const node of path) {
    if (node === host) break;
    if (!(node instanceof HTMLElement)) continue;
    if (isScrollableY(node)) return node;
  }
  const body = host.shadowRoot?.querySelector(".body");
  return body instanceof HTMLElement && isScrollableY(body) ? body : null;
}

function syncChatOpenClass(host: HTMLElement) {
  const win = host.shadowRoot?.querySelector(".win");
  const open = Boolean(win && !(win as HTMLElement).hidden);
  document.documentElement.classList.toggle("lcp-chat-open", open);
}

/**
 * Keep wheel/touch scroll inside the AWSOdesk Shadow DOM panel so the page
 * behind does not scroll (common browser scroll-chaining issue).
 */
export function enableAwsodeskScrollContainment(): () => void {
  if (typeof window === "undefined" || scrollContainmentBound) {
    return () => {};
  }
  scrollContainmentBound = true;

  let host: HTMLElement | null = null;
  let touchStartY = 0;
  let observer: MutationObserver | null = null;
  let pollId = 0;
  let attached = false;

  const onWheel = (e: WheelEvent) => {
    if (!host || !e.composedPath().includes(host)) return;
    e.stopPropagation();

    const scrollable = findScrollableInPath(e.composedPath(), host);
    if (scrollable) {
      scrollable.scrollTop += e.deltaY;
    }
    // Always block page scroll while gesturing over the widget
    e.preventDefault();
  };

  const onTouchStart = (e: TouchEvent) => {
    if (!host || !e.composedPath().includes(host)) return;
    touchStartY = e.touches[0]?.clientY ?? 0;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!host || !e.composedPath().includes(host)) return;
    e.stopPropagation();

    const y = e.touches[0]?.clientY ?? touchStartY;
    const delta = touchStartY - y;
    touchStartY = y;

    const scrollable = findScrollableInPath(e.composedPath(), host);
    if (scrollable) {
      scrollable.scrollTop += delta;
    }
    e.preventDefault();
  };

  const attach = (el: HTMLElement) => {
    if (attached) return;
    attached = true;
    host = el;
    el.addEventListener("wheel", onWheel, { capture: true, passive: false });
    el.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    el.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });

    syncChatOpenClass(el);
    observer = new MutationObserver(() => syncChatOpenClass(el));
    const root = el.shadowRoot;
    if (root) {
      observer.observe(root, {
        attributes: true,
        subtree: true,
        attributeFilter: ["hidden", "class", "style"],
      });
    }
  };

  const tryAttach = () => {
    const el = document.getElementById(AWSO_DESK_HOST_ID);
    if (el) {
      attach(el);
      if (pollId) {
        window.clearInterval(pollId);
        pollId = 0;
      }
    }
  };

  tryAttach();
  if (!attached) {
    pollId = window.setInterval(tryAttach, 300);
    window.setTimeout(() => {
      if (pollId) {
        window.clearInterval(pollId);
        pollId = 0;
      }
    }, 30000);
  }

  return () => {
    scrollContainmentBound = false;
    if (pollId) window.clearInterval(pollId);
    observer?.disconnect();
    document.documentElement.classList.remove("lcp-chat-open");
    if (host) {
      host.removeEventListener("wheel", onWheel, true);
      host.removeEventListener("touchstart", onTouchStart, true);
      host.removeEventListener("touchmove", onTouchMove, true);
    }
  };
}

import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { loadZendeskScript } from "@/lib/loadZendeskScript";
import {
  enableZendeskUnreadAutoOpen,
  forceZendeskPopupBurst,
  syncZendeskPageContext,
} from "@/lib/zendesk";

/** Matches site --brand / --brand-deep in styles.css */
const BRAND = {
  primary: "#E8782A",
  deep: "#B85A1A",
  cream: "#FDEFE0",
  ink: "#2A2118",
  white: "#FFFFFF",
} as const;

const MESSENGER_THEME = {
  primary: BRAND.primary,
  onPrimary: BRAND.white,
  action: BRAND.primary,
  onAction: BRAND.white,
  message: BRAND.cream,
  onMessage: BRAND.ink,
  businessMessage: BRAND.white,
  onBusinessMessage: BRAND.ink,
  background: BRAND.white,
  onBackground: BRAND.ink,
};

const WEB_WIDGET_COLORS = {
  theme: BRAND.primary,
  launcher: BRAND.primary,
  launcherText: BRAND.white,
  button: BRAND.primary,
  header: BRAND.deep,
  articleLinks: BRAND.primary,
  resultLists: BRAND.deep,
};

type ZeWindow = Window & {
  zE?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  zESettings?: Record<string, unknown>;
  zEMessenger?: { autorender?: boolean };
};

function ensureZeStub() {
  const w = window as ZeWindow;
  if (typeof w.zE === "function") return;

  w.zE = ((...args: unknown[]) => {
    (w.zE!.q = w.zE!.q || []).push(args);
  }) as ZeWindow["zE"];
}

function configureBeforeSnippet() {
  const w = window as ZeWindow;

  w.zESettings = {
    webWidget: {
      color: WEB_WIDGET_COLORS,
    },
  };

  w.zEMessenger = { autorender: false };
}

function applyZendeskTheme() {
  const w = window as ZeWindow;
  if (typeof w.zE !== "function") return;

  w.zE(() => {
    w.zE?.("messenger:set", "customization", {
      theme: MESSENGER_THEME,
    });

    w.zE?.("webWidget", "updateSettings", {
      webWidget: {
        color: WEB_WIDGET_COLORS,
      },
    });
  });
}

function renderZendeskMessenger() {
  const w = window as ZeWindow;
  if (typeof w.zE !== "function") return;

  w.zE(() => {
    w.zE?.("messenger:set", "customization", {
      theme: MESSENGER_THEME,
    });
    w.zE?.("webWidget", "updateSettings", {
      webWidget: {
        color: WEB_WIDGET_COLORS,
      },
    });
    w.zE?.("messenger", "render");
  });
}

function registerZendeskListeners() {
  const w = window as ZeWindow;
  if (typeof w.zE !== "function") return;

  w.zE(() => {
    w.zE?.("messenger:on", "open", applyZendeskTheme);
    w.zE?.("messenger:on", "close", applyZendeskTheme);
  });
}

function afterZendeskReady() {
  applyZendeskTheme();
  registerZendeskListeners();
  renderZendeskMessenger();
  syncZendeskPageContext();
  enableZendeskUnreadAutoOpen();
  // Client wants chat open ASAP on site load
  forceZendeskPopupBurst();
}

/** Load Zendesk immediately and auto-open the messenger popup. */
function bootZendesk() {
  configureBeforeSnippet();
  ensureZeStub();

  void loadZendeskScript()
    .then(() => {
      afterZendeskReady();
    })
    .catch(() => {
      /* Chat With Us can still retry via openZendeskChat */
    });
}

export default function ZendeskWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideOnAdmin = pathname.startsWith("/inquiry-details");

  useEffect(() => {
    if (typeof window === "undefined" || hideOnAdmin) return;
    bootZendesk();
  }, [hideOnAdmin]);

  useEffect(() => {
    if (typeof window === "undefined" || hideOnAdmin) return;
    syncZendeskPageContext();
    forceZendeskPopupBurst();
  }, [pathname, hideOnAdmin]);

  return null;
}

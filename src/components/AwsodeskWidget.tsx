import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { enableAwsodeskScrollContainment, loadAwsodeskScript } from "@/lib/awsodesk";

/**
 * Ensures AWSOdesk is loaded and keeps chat-panel scroll from moving the page.
 * Primary inject is the async vendor script in __root head.
 */
export default function AwsodeskWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideOnAdmin = pathname.startsWith("/inquiry-details");

  useEffect(() => {
    if (typeof window === "undefined" || hideOnAdmin) return;

    // Clear a stuck "open" session that hides the launcher with no visible panel
    try {
      if (sessionStorage.getItem("lcp_open") === "1") {
        sessionStorage.setItem("lcp_open", "0");
      }
    } catch {
      /* private mode */
    }

    void loadAwsodeskScript().catch(() => {
      /* Chat With Us can still retry via openAwsodeskChat */
    });

    const stopContainment = enableAwsodeskScrollContainment();
    return () => stopContainment();
  }, [hideOnAdmin]);

  return null;
}

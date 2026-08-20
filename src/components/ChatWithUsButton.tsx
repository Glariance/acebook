import type { ReactNode } from "react";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { SITE_PHONE_DISPLAY } from "@/constants/contact";
import { openZendeskChat } from "@/lib/zendesk";
import { cn } from "@/lib/utils";

type ChatWithUsButtonProps = {
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  showArrow?: boolean;
  "aria-label"?: string;
};

export default function ChatWithUsButton({
  className = "btn-outline",
  children,
  showIcon = true,
  showArrow = true,
  "aria-label": ariaLabel,
}: ChatWithUsButtonProps) {
  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => openZendeskChat()}
      aria-label={ariaLabel ?? `Open live chat (${SITE_PHONE_DISPLAY} if chat is unavailable)`}
    >
      {showIcon ? <MessageSquare className="h-4 w-4" /> : null}
      {children ?? "Chat With Us"}
      {showArrow ? <ArrowUpRight className="h-4 w-4" /> : null}
    </button>
  );
}

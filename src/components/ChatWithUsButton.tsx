import type { MouseEvent, ReactNode } from "react";
import { MessageSquare, ArrowUpRight } from "lucide-react";
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
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openZendeskChat();
  };

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={handleClick}
      aria-label={ariaLabel ?? "Open live chat"}
    >
      {showIcon ? <MessageSquare className="h-4 w-4" /> : null}
      {children ?? "Chat With Us"}
      {showArrow ? <ArrowUpRight className="h-4 w-4" /> : null}
    </button>
  );
}

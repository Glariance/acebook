import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInquiryForm } from "@/context/InquiryFormContext";

type GetStartedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  showIcon?: boolean;
};

export default function GetStartedButton({
  className,
  label = "Get Started",
  showIcon = true,
  children,
  onClick,
  ...props
}: GetStartedButtonProps) {
  const { open } = useInquiryForm();

  return (
    <button
      type="button"
      className={cn("btn-primary", className)}
      onClick={(e) => {
        open();
        onClick?.(e);
      }}
      {...props}
    >
      {children ?? (
        <>
          {label}
          {showIcon && <ArrowUpRight className="h-4 w-4" />}
        </>
      )}
    </button>
  );
}

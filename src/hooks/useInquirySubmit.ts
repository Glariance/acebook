import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { submitInquiry, type InquiryPayload } from "@/lib/inquiry-api";
import { validateInquiryFields } from "@/lib/form-fields";
import { showFormErrorToast, showFormSuccessToast } from "@/lib/form-toast";

const RETURN_PATH_KEY = "inquiry_return_path";

export function getInquiryReturnPath() {
  if (typeof window === "undefined") return "/";
  const stored = sessionStorage.getItem(RETURN_PATH_KEY);
  if (stored && stored.startsWith("/") && !stored.startsWith("//")) {
    return stored;
  }
  return "/";
}

export function setInquiryReturnPath(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/") && !path.startsWith("//") && path !== "/thank-you") {
    sessionStorage.setItem(RETURN_PATH_KEY, path);
  }
}

type UseInquirySubmitOptions = {
  formSource: string;
  onSuccess?: () => void;
};

export function useInquirySubmit({ formSource, onSuccess }: UseInquirySubmitOptions) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(
    async (payload: Omit<InquiryPayload, "form_source">) => {
      if (isSubmitting) return false;

      const errors = validateInquiryFields(payload);
      if (errors.length) {
        await showFormErrorToast(errors);
        return false;
      }

      setIsSubmitting(true);
      try {
        const result = await submitInquiry({
          ...payload,
          form_source: formSource,
        });

        if (result.status === 1) {
          const returnPath = `${pathname}${searchStr}`;
          setInquiryReturnPath(returnPath);

          await showFormSuccessToast(result.message || "Thank you! We'll get back to you soon.");
          onSuccess?.();

          window.setTimeout(() => {
            navigate({
              to: "/thank-you",
              search: { from: returnPath },
            });
          }, 250);

          return true;
        }

        await showFormErrorToast(result.message || "Unable to send your message. Please try again.");
        return false;
      } catch {
        await showFormErrorToast(
          "Unable to reach the server. Please check your connection or contact us by phone.",
        );
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formSource, isSubmitting, navigate, onSuccess, pathname, searchStr],
  );

  return { submit, isSubmitting };
}

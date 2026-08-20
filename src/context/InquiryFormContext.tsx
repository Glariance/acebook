import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import InquiryFormDialog from "@/components/InquiryFormDialog";

type InquiryFormContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const InquiryFormContext = createContext<InquiryFormContextValue | null>(null);

export function InquiryFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <InquiryFormContext.Provider value={{ open, close, isOpen }}>
      {children}
      <InquiryFormDialog open={isOpen} onOpenChange={setIsOpen} />
    </InquiryFormContext.Provider>
  );
}

export function useInquiryForm() {
  const ctx = useContext(InquiryFormContext);
  if (!ctx) {
    throw new Error("useInquiryForm must be used within InquiryFormProvider");
  }
  return ctx;
}

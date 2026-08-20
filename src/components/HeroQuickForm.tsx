import { cn } from "@/lib/utils";
import { collectInquiryFormErrors, formDataFromEvent } from "@/lib/form-fields";
import { useInquirySubmit } from "@/hooks/useInquirySubmit";
import { showFormErrorToast } from "@/lib/form-toast";

const inputClass =
  "rounded-md bg-brand-soft px-4 py-3 text-sm text-white placeholder:text-white/80 outline-none transition focus:bg-white focus:text-ink focus:placeholder:text-muted-foreground";

type HeroQuickFormProps = {
  formSource: string;
  className?: string;
};

export default function HeroQuickForm({ formSource, className }: HeroQuickFormProps) {
  const { submit, isSubmitting } = useInquirySubmit({ formSource });

  return (
    <form
      data-inquiry-form
      method="post"
      noValidate
      className={cn(
        "grid grid-cols-1 gap-2 rounded-xl bg-brand p-2 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const errors = collectInquiryFormErrors(form);
        if (errors.length) {
          await showFormErrorToast(errors);
          return;
        }
        const data = formDataFromEvent(form);
        const ok = await submit(data);
        if (ok) form.reset();
      }}
    >
      <input
        name="name"
        className={inputClass}
        placeholder="Enter Your Name*"
        disabled={isSubmitting}
      />
      <input
        name="email"
        type="email"
        className={inputClass}
        placeholder="Enter Your Email*"
        disabled={isSubmitting}
      />
      <input
        name="phone"
        type="tel"
        className={inputClass}
        placeholder="Phone Number*"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Submit Now"}
      </button>
    </form>
  );
}

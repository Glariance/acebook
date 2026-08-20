export function readFormString(form: HTMLFormElement, name: string) {
  const el = form.elements.namedItem(name);
  if (!el || !("value" in el)) return "";
  return String(el.value).trim();
}

export function readFormCheckbox(form: HTMLFormElement, name: string) {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLInputElement && el.type === "checkbox") return el.checked;
  return false;
}

export function formDataFromEvent(form: HTMLFormElement) {
  const firstName = readFormString(form, "first_name");
  const lastName = readFormString(form, "last_name");
  const name =
    readFormString(form, "name") ||
    [firstName, lastName].filter(Boolean).join(" ").trim();

  return {
    name,
    email: readFormString(form, "email"),
    phone: readFormString(form, "phone") || readFormString(form, "phone_number"),
    message: readFormString(form, "message"),
    service: readFormString(form, "service"),
  };
}

export function collectInquiryFormErrors(form: HTMLFormElement): string[] {
  return validateInquiryFields(formDataFromEvent(form));
}

export function validateInquiryFields(data: {
  name?: string;
  email?: string;
  phone?: string;
}): string[] {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push("Please enter your name.");
  if (!data.email?.trim()) errors.push("Please enter your email.");
  if (!data.phone?.trim()) errors.push("Please enter your phone number.");

  return errors;
}

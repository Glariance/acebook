export type InquiryPayload = {
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  form_source?: string;
  service?: string;
  package_name?: string;
  landing_page?: string;
  referrer_url?: string;
};

export type InquiryResponse = {
  status: number;
  message: string;
  debug?: Record<string, unknown>;
};

const API_URL = import.meta.env.VITE_INQUIRY_API_URL ?? "/sendmail.php";

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const body: Record<string, string> = {
    name: payload.name?.trim() ?? "",
    email: payload.email.trim(),
    phone: payload.phone?.trim() ?? "",
    message: payload.message?.trim() ?? "",
    form_source: payload.form_source?.trim() ?? "website",
    landing_page: payload.landing_page ?? (typeof window !== "undefined" ? window.location.href : ""),
    referrer_url: payload.referrer_url ?? (typeof document !== "undefined" ? document.referrer : ""),
  };

  const service = payload.service?.trim() || payload.package_name?.trim();
  if (service) {
    body.service = service;
    body.package_name = service;
    if (!body.message) {
      body.message = `Service: ${service}`;
    }
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let data: InquiryResponse;
  try {
    data = (await res.json()) as InquiryResponse;
  } catch {
    throw new Error("Invalid response from server. Please try again.");
  }

  if (!res.ok && data.status !== 1) {
    return {
      status: 0,
      message: data.message || "Something went wrong. Please try again.",
      debug: data.debug,
    };
  }

  return data;
}

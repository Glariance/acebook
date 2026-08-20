export type InquiryListItem = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  form_source?: string | null;
  created_at?: string | null;
};

export type InquiryDetailRecord = Record<string, string | number | null>;

const ENDPOINT = import.meta.env.VITE_INQUIRY_DETAILS_API_URL ?? "/inquiry-details.php";

async function parseJsonSafe(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid server response");
  }
}

export async function checkInquirySession(): Promise<boolean> {
  const res = await fetch(`${ENDPOINT}?action=session`, { credentials: "same-origin" });
  const json = await parseJsonSafe(res);
  return json.status === 1;
}

export async function inquiryLogin(email: string, password: string): Promise<void> {
  const res = await fetch(`${ENDPOINT}?action=login`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok || json.status !== 1) {
    throw new Error(typeof json.message === "string" ? json.message : "Login failed");
  }
}

export async function inquiryLogout(): Promise<void> {
  await fetch(`${ENDPOINT}?action=logout`, {
    method: "POST",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });
}

export async function fetchInquiries(): Promise<InquiryListItem[]> {
  const res = await fetch(`${ENDPOINT}?action=list`, { credentials: "same-origin" });
  const json = await parseJsonSafe(res);
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok || json.status !== 1) {
    throw new Error(typeof json.message === "string" ? json.message : "Failed to load inquiries");
  }
  return Array.isArray(json.data) ? (json.data as InquiryListItem[]) : [];
}

export async function fetchInquiryDetail(id: number): Promise<InquiryDetailRecord> {
  const res = await fetch(`${ENDPOINT}?action=detail&id=${id}`, { credentials: "same-origin" });
  const json = await parseJsonSafe(res);
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok || json.status !== 1) {
    throw new Error(typeof json.message === "string" ? json.message : "Failed to load details");
  }
  return json.data as InquiryDetailRecord;
}

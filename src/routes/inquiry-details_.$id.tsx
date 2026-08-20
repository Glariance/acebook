import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import InquiryLoadingState from "@/components/InquiryLoadingState";
import {
  checkInquirySession,
  fetchInquiryDetail,
  inquiryLogout,
  type InquiryDetailRecord,
} from "@/lib/inquiry-details-api";

export const Route = createFileRoute("/inquiry-details_/$id")({
  head: () => ({
    meta: [
      { title: "Inquiry Record — Ace Book Publishers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InquiryRecordDetailsPage,
});

function InquiryRecordDetailsPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const inquiryId = Number(id);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<InquiryDetailRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!Number.isFinite(inquiryId) || inquiryId <= 0) {
        setError("Invalid inquiry id.");
        setLoading(false);
        return;
      }
      try {
        const authed = await checkInquirySession();
        if (!authed) {
          navigate({ to: "/inquiry-details", replace: true });
          return;
        }
        const payload = await fetchInquiryDetail(inquiryId);
        setDetails(payload);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load inquiry details.";
        if (msg === "Unauthorized") {
          navigate({ to: "/inquiry-details", replace: true });
          return;
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [inquiryId, navigate]);

  const rows = useMemo(() => (details ? Object.entries(details) : []), [details]);

  const onLogout = async () => {
    await inquiryLogout();
    navigate({ to: "/inquiry-details", replace: true });
  };

  const sanitizePhoneForTel = (value: string) => value.replace(/[^\d+]/g, "");

  const renderValueCell = (key: string, value: string | number | null) => {
    if (value === null || value === "") return "—";
    const raw = String(value);
    const normalized = key.toLowerCase();
    if (normalized.includes("email")) {
      return (
        <a className="text-brand hover:underline" href={`mailto:${raw}`}>
          {raw}
        </a>
      );
    }
    if (normalized.includes("phone")) {
      return (
        <a className="text-brand hover:underline" href={`tel:${sanitizePhoneForTel(raw)}`}>
          {raw}
        </a>
      );
    }
    return raw;
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-cream via-white to-cream py-8">
      <div className="mx-auto max-w-5xl space-y-5 px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="outline" className="gap-2" onClick={() => navigate({ to: "/inquiry-details" })}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button variant="secondary" onClick={() => void onLogout()}>
            Logout
          </Button>
        </div>

        <Card className="border-brand/20 shadow-md">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Inquiry Full Details</CardTitle>
              <CardDescription>Complete information for record #{Number.isFinite(inquiryId) ? inquiryId : "—"}</CardDescription>
            </div>
            <Badge>Detailed View</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <InquiryLoadingState title="Loading inquiry details" description="Please wait while we fetch this record for you." />
            ) : null}
            {!loading && error ? <p className="text-sm text-destructive">{error}</p> : null}
            {!loading && !error && details ? (
              <Table>
                <TableBody>
                  {rows.map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="w-64 font-medium capitalize">{key.replace(/_/g, " ")}</TableCell>
                      <TableCell>{renderValueCell(key, value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

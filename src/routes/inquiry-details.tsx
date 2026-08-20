import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InquiryLoadingState from "@/components/InquiryLoadingState";
import {
  checkInquirySession,
  fetchInquiries,
  inquiryLogin,
  inquiryLogout,
  type InquiryListItem,
} from "@/lib/inquiry-details-api";
import { showFormErrorToast, showFormSuccessToast } from "@/lib/form-toast";

const RECORDS_PER_PAGE = 50;

export const Route = createFileRoute("/inquiry-details")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = search.page;
    const page = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : 1;
    return { page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1 };
  },
  head: () => ({
    meta: [
      { title: "Inquiry Details — Ace Book Publishers" },
      { name: "description", content: "Admin dashboard for submitted inquiries." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InquiryDetailsPage,
});

function InquiryDetailsPage() {
  const navigate = useNavigate();
  const { page: currentPage } = Route.useSearch();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listError, setListError] = useState("");
  const [inquiries, setInquiries] = useState<InquiryListItem[]>([]);
  const [listLoaded, setListLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const ok = await checkInquirySession();
        setAuthed(ok);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  useEffect(() => {
    if (!authed) return;
    const loadList = async () => {
      setListLoaded(false);
      setListError("");
      try {
        const items = await fetchInquiries();
        setInquiries(items);
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Could not load inquiries";
        if (msg === "Unauthorized") {
          setAuthed(false);
          return;
        }
        setListError(msg);
      } finally {
        setListLoaded(true);
      }
    };
    void loadList();
  }, [authed]);

  const latestInquiry = useMemo(() => inquiries[0] ?? null, [inquiries]);
  const uniqueEmails = useMemo(() => new Set(inquiries.map((i) => (i.email || "").toLowerCase())).size, [inquiries]);
  const totalPages = Math.max(1, Math.ceil(inquiries.length / RECORDS_PER_PAGE));
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const paginatedInquiries = useMemo(
    () => inquiries.slice(startIndex, startIndex + RECORDS_PER_PAGE),
    [inquiries, startIndex],
  );

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);
    const adjustedStart = Math.max(1, end - maxButtons + 1);
    return Array.from({ length: end - adjustedStart + 1 }, (_, idx) => adjustedStart + idx);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!listLoaded) return;
    if (currentPage > totalPages) {
      navigate({ to: "/inquiry-details", search: { page: totalPages }, replace: true });
    }
  }, [currentPage, totalPages, listLoaded, navigate]);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();
    if (!normalizedEmail || !normalizedPassword) {
      await showFormErrorToast("Email and password are required.");
      return;
    }
    try {
      await inquiryLogin(normalizedEmail, normalizedPassword);
      setAuthed(true);
      setPassword("");
      await showFormSuccessToast("Welcome to the Inquiry Details Dashboard.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      await showFormErrorToast(message);
    }
  };

  const onLogout = async () => {
    await inquiryLogout();
    setAuthed(false);
    setInquiries([]);
  };

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    navigate({ to: "/inquiry-details", search: { page } });
  };

  const sanitizePhoneForTel = (value: string) => value.replace(/[^\d+]/g, "");

  const paginationControls =
    inquiries.length > RECORDS_PER_PAGE ? (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + RECORDS_PER_PAGE, inquiries.length)} of {inquiries.length}{" "}
          records
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Prev
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              size="sm"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    ) : null;

  if (loading) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-cream via-white to-cream py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <InquiryLoadingState title="Preparing inquiry dashboard" description="Checking session and loading your latest inquiry data..." />
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-cream via-white to-cream py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <Card className="border-brand/20 shadow-lg">
            <CardHeader>
              <CardTitle>Inquiry Dashboard Login</CardTitle>
              <CardDescription>Enter your authorized credentials to access inquiry details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="inquiry-email">
                    Email
                  </label>
                  <Input
                    id="inquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="inquiry-password">
                    Password
                  </label>
                  <Input
                    id="inquiry-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-cream via-white to-cream py-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-ink via-ink/95 to-brand-deep px-6 py-7 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Admin Panel</p>
              <h1 className="font-heading text-3xl font-bold">Inquiry Details Dashboard</h1>
              <p className="mt-1 text-sm text-white/80">Review submitted inquiries and open a dedicated details page per record.</p>
            </div>
            <Button variant="secondary" onClick={() => void onLogout()}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-brand/20">
            <CardHeader className="pb-2">
              <CardDescription>Total Inquiries</CardDescription>
              <CardTitle className="text-3xl">{inquiries.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-brand/20">
            <CardHeader className="pb-2">
              <CardDescription>Unique Emails</CardDescription>
              <CardTitle className="text-3xl">{uniqueEmails}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-brand/20">
            <CardHeader className="pb-2">
              <CardDescription>Latest Lead</CardDescription>
              <CardTitle className="truncate text-lg">{latestInquiry?.name || "—"}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="border-brand/15 shadow-sm">
          <CardHeader>
            <CardTitle>All Inquiries</CardTitle>
            <CardDescription className="flex items-center gap-2">
              Latest 200 records
              <Badge variant="secondary">Live</Badge>
            </CardDescription>
            <div className="pt-2">{paginationControls}</div>
          </CardHeader>
          <CardContent>
            {listError ? <p className="text-sm text-destructive">{listError}</p> : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInquiries.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name || "—"}</TableCell>
                    <TableCell>
                      {item.email ? (
                        <a className="text-brand hover:underline" href={`mailto:${item.email}`}>
                          {item.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {item.phone ? (
                        <a className="text-brand hover:underline" href={`tel:${sanitizePhoneForTel(item.phone)}`}>
                          {item.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{item.form_source || "—"}</TableCell>
                    <TableCell>{item.created_at || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate({
                            to: "/inquiry-details/$id",
                            params: { id: String(item.id) },
                          })
                        }
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!inquiries.length ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
            <div className="mt-5">{paginationControls}</div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          Need the public website?{" "}
          <Link to="/" className="font-semibold text-brand hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

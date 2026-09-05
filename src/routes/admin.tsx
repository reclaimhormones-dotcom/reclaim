import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Images,
  Mail,
  LayoutDashboard,
  LogOut,
  Loader2,
  MessageSquareQuote,
  Settings,
  ShieldAlert,
  Sprout,
  Wallet,
  ClipboardList,
  FileText,
  Menu,
  X,
  ExternalLink,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { IMG } from "@/lib/site-content";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ADMIN_EMAIL } from "@/lib/firebase";
import { Card, ErrorState, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Reclaim Hormones" },
      { name: "description", content: "Private content and assessment management dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Dashboard — Reclaim Hormones" },
      { property: "og:description", content: "Private clinic management dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLayout,
});

type AdminPath =
  | "/admin"
  | "/admin/content"
  | "/admin/programs"
  | "/admin/gallery"
  | "/admin/testimonials"
  | "/admin/assessments"
  | "/admin/patients"
  | "/admin/messages"
  | "/admin/payments"
  | "/admin/settings";

type NavLink = {
  to: AdminPath;
  label: string;
  hint: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  primary?: boolean;
};

const NAV_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Daily work",
    links: [
      {
        to: "/admin",
        label: "Home",
        hint: "Today at a glance",
        icon: LayoutDashboard,
        exact: true,
        primary: true,
      },
      {
        to: "/admin/messages",
        label: "Enquiries",
        hint: "People who contacted you",
        icon: Mail,
        primary: true,
      },
      {
        to: "/admin/assessments",
        label: "Clients",
        hint: "Profiles & assessments",
        icon: ClipboardList,
        primary: true,
      },
      {
        to: "/admin/patients",
        label: "Patients",
        hint: "Full patient profiles",
        icon: Users,
      },
      {
        to: "/admin/payments",
        label: "Payments",
        hint: "Approve or reject",
        icon: Wallet,
        primary: true,
      },
    ],
  },
  {
    title: "Website content",
    links: [
      {
        to: "/admin/content",
        label: "Pages & text",
        hint: "Every heading and paragraph",
        icon: FileText,
        primary: true,
      },
      { to: "/admin/programs", label: "Programs", hint: "Add, edit, price", icon: Sprout },
      { to: "/admin/gallery", label: "Gallery", hint: "Photos of the clinic", icon: Images },
      {
        to: "/admin/testimonials",
        label: "Reviews",
        hint: "Client testimonials",
        icon: MessageSquareQuote,
      },
    ],
  },
  {
    title: "Setup",
    links: [
      {
        to: "/admin/settings",
        label: "Contact & settings",
        hint: "Phone, address, socials",
        icon: Settings,
      },
    ],
  },
];

const ALL_LINKS = NAV_GROUPS.flatMap((g) => g.links);
const MOBILE_TABS = ALL_LINKS.filter((l) => l.primary).slice(0, 5);

function isActive(link: NavLink, pathname: string) {
  return link.exact ? pathname === link.to : pathname.startsWith(link.to);
}

function LoginScreen({
  onSignIn,
  onReset,
}: {
  onSignIn: (email: string, password: string) => Promise<void>;
  onReset: (email: string) => Promise<void>;
}) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setBusy(true);
    try {
      await onSignIn(email, password);
      toast.success("Welcome back");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-14">
      <div className="w-full max-w-sm">
        <img src={IMG.logo} alt="Reclaim Hormones" className="mx-auto h-12 w-auto" />
        <Card className="mt-6">
          <h1 className="font-serif text-2xl text-brand-deep">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Only the clinic administrator can access this dashboard.
          </p>
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Email
              </label>
              <input
                className={inputClass}
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Password
              </label>
              <input
                className={inputClass}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? <ErrorState message={error} /> : null}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : null}
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                void onReset(email)
                  .then(() => toast.success("Password reset email sent"))
                  .catch(() => toast.error("Could not send reset email"));
              }}
              className="w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
            >
              Forgot password?
            </button>
          </form>
        </Card>
        <Link
          to="/"
          className="mt-5 block text-center text-xs text-muted-foreground hover:text-brand"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="mt-2 space-y-1">
            {group.links.map((link) => {
              const active = isActive(link, pathname);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    preload="intent"
                    onClick={onNavigate}
                    className={`flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
                      active
                        ? "bg-brand text-primary-foreground"
                        : "text-foreground/85 hover:bg-brand/10"
                    }`}
                  >
                    <link.icon className="mt-0.5 size-[1.15rem] shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium leading-tight">{link.label}</span>
                      <span
                        className={`mt-0.5 block truncate text-[0.7rem] ${
                          active ? "text-primary-foreground/75" : "text-muted-foreground"
                        }`}
                      >
                        {link.hint}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AdminLayout() {
  const { user, isAdmin, loading, error, signIn, signOut, resetPassword } = useAdminAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [navOpen, setNavOpen] = useState(false);
  const current = ALL_LINKS.find((l) => isActive(l, pathname)) ?? ALL_LINKS[0]!;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <Card className="max-w-md">
          <ErrorState message={error} />
        </Card>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onSignIn={signIn} onReset={resetPassword} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <Card className="max-w-md text-center">
          <ShieldAlert className="mx-auto size-10 text-destructive" />
          <h1 className="mt-3 font-serif text-2xl text-brand-deep">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is not authorized to manage Reclaim Hormones.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Sign out
            </button>
            <Link
              to="/"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Go to website
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/60 lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border/70 bg-background/85 px-4 py-5 lg:flex">
        <Link to="/admin" className="flex items-center gap-2 px-2">
          <img src={IMG.logo} alt="Reclaim Hormones" className="h-9 w-auto" />
        </Link>
        <p className="mt-4 px-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          Clinic admin
        </p>
        <nav className="mt-3 flex-1 overflow-y-auto pb-4">
          <SidebarNav pathname={pathname} onNavigate={() => setNavOpen(false)} />
        </nav>
        <div className="space-y-2 border-t border-border/70 pt-3">
          <p className="truncate px-3 text-[0.7rem] text-muted-foreground">{user.email}</p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-brand/10"
          >
            <ExternalLink className="size-4" /> View website
          </a>
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile / tablet top bar */}
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              aria-label="Open admin menu"
              onClick={() => setNavOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-brand"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 text-center">
              <p className="truncate text-sm font-semibold text-brand-deep">{current.label}</p>
              <p className="truncate text-[0.7rem] text-muted-foreground">{current.hint}</p>
            </div>
            <button
              type="button"
              aria-label="Sign out"
              onClick={() => void signOut()}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-destructive"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        {navOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setNavOpen(false)}
              className="absolute inset-0 bg-brand-deep/45 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-background px-4 py-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <img src={IMG.logo} alt="Reclaim Hormones" className="h-8 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setNavOpen(false)}
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="mt-5 flex-1 overflow-y-auto">
                <SidebarNav pathname={pathname} onNavigate={() => setNavOpen(false)} />
              </nav>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm"
              >
                <ExternalLink className="size-4" /> View website
              </a>
            </div>
          </div>
        ) : null}

        <main className="mx-auto min-w-0 max-w-6xl px-4 pb-28 pt-5 lg:px-8 lg:pb-10 lg:pt-8">
          <Outlet />
        </main>

        {/* Mobile bottom tabs */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
          <ul className="flex">
            {MOBILE_TABS.map((link) => {
              const active = isActive(link, pathname);
              return (
                <li key={link.to} className="flex-1">
                  <Link
                    to={link.to}
                    preload="intent"
                    className={`flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors ${
                      active ? "text-brand" : "text-muted-foreground"
                    }`}
                  >
                    <link.icon className="size-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

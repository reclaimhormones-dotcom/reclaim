import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  PanelLeft,
  PanelLeftClose,
  Search,
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

/** Remembers the desktop rail width between visits. */
const COLLAPSE_KEY = "rh_admin_sidebar_collapsed";

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

/** Matches a page on its label, its hint or its path. */
function matches(link: NavLink, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    link.label.toLowerCase().includes(q) ||
    link.hint.toLowerCase().includes(q) ||
    link.to.toLowerCase().includes(q)
  );
}

/**
 * Navigation shared by the desktop rail and the mobile drawer.
 *
 * Rows are single-line by design: the old two-line label + hint made the list
 * taller than the viewport, which is what forced the cramped inner scrollbar.
 * The hint now rides along as the title attribute and, on mobile, as a second
 * line where there is room for it.
 */
function SidebarNav({
  pathname,
  onNavigate,
  collapsed = false,
  query = "",
  size = "compact",
}: {
  pathname: string;
  onNavigate: () => void;
  collapsed?: boolean;
  query?: string;
  /** "comfortable" gives the 56px touch rows used in the mobile drawer. */
  size?: "compact" | "comfortable";
}) {
  const groups = NAV_GROUPS.map((g) => ({
    ...g,
    links: g.links.filter((l) => matches(l, query)),
  })).filter((g) => g.links.length > 0);

  if (groups.length === 0) {
    return (
      <p className="px-3 py-6 text-center text-sm text-muted-foreground">
        No admin pages match “{query}”.
      </p>
    );
  }

  return (
    <div className={size === "comfortable" ? "space-y-6" : "space-y-4"}>
      {groups.map((group) => (
        <div key={group.title}>
          {!collapsed ? (
            <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {group.title}
            </p>
          ) : (
            <div className="mx-3 h-px bg-border/70" aria-hidden="true" />
          )}
          <ul className={size === "comfortable" ? "mt-3 space-y-1.5" : "mt-1.5 space-y-0.5"}>
            {group.links.map((link) => {
              const active = isActive(link, pathname);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    preload="intent"
                    onClick={onNavigate}
                    title={collapsed ? `${link.label} — ${link.hint}` : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-2xl transition-colors ${
                      collapsed ? "justify-center px-0 py-3" : "px-3"
                    } ${size === "comfortable" ? "min-h-14 py-2" : "py-2.5"} ${
                      active
                        ? "bg-brand text-primary-foreground shadow-[var(--shadow-e1)]"
                        : "text-foreground/85 hover:bg-brand/10"
                    }`}
                  >
                    <link.icon className="size-[1.15rem] shrink-0" />
                    {!collapsed ? (
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium leading-tight">
                          {link.label}
                        </span>
                        {size === "comfortable" ? (
                          <span
                            className={`mt-0.5 block truncate text-[0.72rem] ${
                              active ? "text-primary-foreground/75" : "text-muted-foreground"
                            }`}
                          >
                            {link.hint}
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      <span className="sr-only">{link.label}</span>
                    )}
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
  const [query, setQuery] = useState("");
  /* Collapsed state is a workspace preference, so it survives reloads. */
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const current = ALL_LINKS.find((l) => isActive(l, pathname)) ?? ALL_LINKS[0]!;

  useEffect(() => {
    try {
      window.localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
    } catch {
      /* Blocked storage just means the preference is per-session. */
    }
  }, [collapsed]);

  /* Close the drawer on navigation, and lock the page behind it while open. */
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [navOpen]);

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
      {/*
       * Desktop rail. `self-start` with a natural height is what removes the
       * old nested scrollbar: the rail sticks to the top and the page scrolls
       * behind it. `max-h-screen` is only a safety net for very short windows —
       * with single-line rows the list fits without ever engaging.
       */}
      <aside
        className={`sticky top-0 hidden max-h-screen shrink-0 flex-col self-start overflow-y-auto border-r border-border/70 bg-background/85 py-5 transition-[width] duration-300 ease-[var(--ease-premium)] lg:flex ${
          collapsed ? "w-20 px-2" : "w-72 px-4"
        }`}
      >
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}>
          {!collapsed ? (
            <Link to="/admin" className="min-w-0">
              <img src={IMG.logo} alt="Reclaim Hormones" className="h-9 w-auto" />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
          >
            {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>

        {!collapsed ? (
          <div className="relative mt-4">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages…"
              aria-label="Search admin pages"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        ) : null}

        <nav className="mt-4 flex-1 pb-4">
          <SidebarNav
            pathname={pathname}
            onNavigate={() => setNavOpen(false)}
            collapsed={collapsed}
            query={query}
          />
        </nav>

        <div className="space-y-1 border-t border-border/70 pt-3">
          {!collapsed ? (
            <p className="truncate px-3 text-[0.7rem] text-muted-foreground">{user.email}</p>
          ) : null}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            title="View website"
            className={`flex items-center gap-2 rounded-xl py-2 text-sm text-foreground/80 transition-colors hover:bg-brand/10 ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <ExternalLink className="size-4 shrink-0" />
            {!collapsed ? "View website" : <span className="sr-only">View website</span>}
          </a>
          <button
            type="button"
            onClick={() => void signOut()}
            title="Sign out"
            className={`flex w-full items-center gap-2 rounded-xl py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 ${
              collapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed ? "Sign out" : <span className="sr-only">Sign out</span>}
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

        {/* Full-screen navigation drawer for mobile and tablet. */}
        {navOpen ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-left-4 fade-in duration-300 lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border/70 px-4 py-3">
              <img src={IMG.logo} alt="Reclaim Hormones" className="h-8 w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setNavOpen(false)}
                className="tactile inline-flex size-11 items-center justify-center rounded-xl border border-border"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="shrink-0 px-4 pt-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages…"
                  aria-label="Search admin pages"
                  className="min-h-13 w-full rounded-2xl border border-border bg-background py-3 pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {/* The drawer is the only scroller here, and it is the full screen. */}
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <SidebarNav
                pathname={pathname}
                onNavigate={() => {
                  setNavOpen(false);
                  setQuery("");
                }}
                size="comfortable"
                query={query}
              />
            </nav>

            <div className="shrink-0 space-y-2 border-t border-border/70 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="truncate text-[0.72rem] text-muted-foreground">{user.email}</p>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="tactile flex min-h-14 items-center gap-2 rounded-2xl border border-border px-4 text-sm"
              >
                <ExternalLink className="size-4" /> View website
              </a>
              <button
                type="button"
                onClick={() => void signOut()}
                className="tactile flex min-h-14 w-full items-center gap-2 rounded-2xl px-4 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" /> Sign out
              </button>
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

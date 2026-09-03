import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import "../_libs/firebase.mjs";
import { a as signOut, i as signInWithEmailAndPassword, n as onAuthStateChanged, r as sendPasswordResetEmail } from "../_libs/firebase__auth.mjs";
import { r as getFbAuth, t as ADMIN_EMAIL } from "./firebase-DSE5QkO6.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as Mail, I as LogOut, N as Menu, R as LoaderCircle, V as LayoutDashboard, W as Images, Z as FileText, h as Sprout, j as MessageSquareQuote, lt as ClipboardList, n as X, nt as ExternalLink, o as Users, r as Wallet, v as ShieldAlert, y as Settings } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as ErrorState, n as Card, p as inputClass } from "./AdminUI-DcDvqkFm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DbYgPYXd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var reclaim_logo_png_asset_default = {
	version: 1,
	asset_id: "69e09198-5db9-46b1-9958-1cc88251626d",
	project_id: "c391eaec-ece3-49be-95bc-fc5b71aed0a6",
	url: "/__l5e/assets-v1/69e09198-5db9-46b1-9958-1cc88251626d/reclaim-hormones-logo.png",
	r2_key: "a/v1/c391eaec-ece3-49be-95bc-fc5b71aed0a6/69e09198-5db9-46b1-9958-1cc88251626d/reclaim-hormones-logo.png",
	original_filename: "reclaim-hormones-logo.png",
	size: 429689,
	content_type: "image/png",
	created_at: "2026-09-03T07:18:06Z"
};
function friendly(code) {
	switch (code) {
		case "auth/invalid-credential":
		case "auth/wrong-password":
		case "auth/user-not-found": return "Incorrect email or password.";
		case "auth/too-many-requests": return "Too many attempts. Please wait a moment and try again.";
		case "auth/network-request-failed": return "Network error. Check your connection and try again.";
		case "auth/invalid-email": return "That email address looks invalid.";
		default: return "Sign in failed. Please try again.";
	}
}
function useAdminAuth() {
	const [state, setState] = (0, import_react.useState)({
		user: null,
		isAdmin: false,
		loading: true,
		error: null
	});
	(0, import_react.useEffect)(() => {
		let unsub;
		let cancelled = false;
		(async () => {
			try {
				const auth = await getFbAuth();
				if (cancelled) return;
				unsub = onAuthStateChanged(auth, (user) => {
					setState({
						user,
						isAdmin: (user?.email ?? "").toLowerCase() === ADMIN_EMAIL,
						loading: false,
						error: null
					});
				});
			} catch (err) {
				if (!cancelled) setState({
					user: null,
					isAdmin: false,
					loading: false,
					error: err instanceof Error ? err.message : "Authentication unavailable"
				});
			}
		})();
		return () => {
			cancelled = true;
			unsub?.();
		};
	}, []);
	const signIn = (0, import_react.useCallback)(async (email, password) => {
		const auth = await getFbAuth();
		try {
			await signInWithEmailAndPassword(auth, email.trim(), password);
		} catch (err) {
			const code = err.code ?? "";
			throw new Error(friendly(code));
		}
	}, []);
	const signOut$1 = (0, import_react.useCallback)(async () => {
		const auth = await getFbAuth();
		await signOut(auth);
	}, []);
	const resetPassword = (0, import_react.useCallback)(async (email) => {
		const auth = await getFbAuth();
		await sendPasswordResetEmail(auth, email.trim());
	}, []);
	return {
		...state,
		signIn,
		signOut: signOut$1,
		resetPassword
	};
}
var NAV_GROUPS = [
	{
		title: "Daily work",
		links: [
			{
				to: "/admin",
				label: "Home",
				hint: "Today at a glance",
				icon: LayoutDashboard,
				exact: true,
				primary: true
			},
			{
				to: "/admin/messages",
				label: "Enquiries",
				hint: "People who contacted you",
				icon: Mail,
				primary: true
			},
			{
				to: "/admin/assessments",
				label: "Clients",
				hint: "Profiles & assessments",
				icon: ClipboardList,
				primary: true
			},
			{
				to: "/admin/patients",
				label: "Patients",
				hint: "Full patient profiles",
				icon: Users
			},
			{
				to: "/admin/payments",
				label: "Payments",
				hint: "Approve or reject",
				icon: Wallet,
				primary: true
			}
		]
	},
	{
		title: "Website content",
		links: [
			{
				to: "/admin/content",
				label: "Pages & text",
				hint: "Every heading and paragraph",
				icon: FileText,
				primary: true
			},
			{
				to: "/admin/programs",
				label: "Programs",
				hint: "Add, edit, price",
				icon: Sprout
			},
			{
				to: "/admin/gallery",
				label: "Gallery",
				hint: "Photos of the clinic",
				icon: Images
			},
			{
				to: "/admin/testimonials",
				label: "Reviews",
				hint: "Client testimonials",
				icon: MessageSquareQuote
			}
		]
	},
	{
		title: "Setup",
		links: [{
			to: "/admin/settings",
			label: "Contact & settings",
			hint: "Phone, address, socials",
			icon: Settings
		}]
	}
];
var ALL_LINKS = NAV_GROUPS.flatMap((g) => g.links);
var MOBILE_TABS = ALL_LINKS.filter((l) => l.primary).slice(0, 5);
function isActive(link, pathname) {
	return link.exact ? pathname === link.to : pathname.startsWith(link.to);
}
function LoginScreen({ onSignIn, onReset }) {
	const [email, setEmail] = (0, import_react.useState)(ADMIN_EMAIL);
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream px-4 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: reclaim_logo_png_asset_default.url,
					alt: "Reclaim Hormones",
					className: "mx-auto h-12 w-auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-2xl text-brand-deep",
							children: "Admin Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Only the clinic administrator can access this dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-5 space-y-4",
							onSubmit: (e) => {
								e.preventDefault();
								submit();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									type: "email",
									autoComplete: "username",
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									type: "password",
									autoComplete: "current-password",
									value: password,
									onChange: (e) => setPassword(e.target.value)
								})] }),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: busy,
									className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Sign in"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										onReset(email).then(() => toast.success("Password reset email sent")).catch(() => toast.error("Could not send reset email"));
									},
									className: "w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline",
									children: "Forgot password?"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-5 block text-center text-xs text-muted-foreground hover:text-brand",
					children: "← Back to website"
				})
			]
		})
	});
}
function SidebarNav({ pathname, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: NAV_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
			children: group.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1",
			children: group.links.map((link) => {
				const active = isActive(link, pathname);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: link.to,
					preload: "intent",
					onClick: onNavigate,
					className: `flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors ${active ? "bg-brand text-primary-foreground" : "text-foreground/85 hover:bg-brand/10"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(link.icon, { className: "mt-0.5 size-[1.15rem] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium leading-tight",
							children: link.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `mt-0.5 block truncate text-[0.7rem] ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`,
							children: link.hint
						})]
					})]
				}) }, link.to);
			})
		})] }, group.title))
	});
}
function AdminLayout() {
	const { user, isAdmin, loading, error, signIn, signOut, resetPassword } = useAdminAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [navOpen, setNavOpen] = (0, import_react.useState)(false);
	const current = ALL_LINKS.find((l) => isActive(l, pathname)) ?? ALL_LINKS[0];
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-brand" })
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error })
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {
		onSignIn: signIn,
		onReset: resetPassword
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto size-10 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-serif text-2xl text-brand-deep",
					children: "Access denied"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This account is not authorized to manage Reclaim Hormones."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void signOut(),
						className: "rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
						children: "Sign out"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent",
						children: "Go to website"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream/60 lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border/70 bg-background/85 px-4 py-5 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "flex items-center gap-2 px-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: reclaim_logo_png_asset_default.url,
						alt: "Reclaim Hormones",
						className: "h-9 w-auto"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 px-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Clinic admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-3 flex-1 overflow-y-auto pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
						pathname,
						onNavigate: () => setNavOpen(false)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 border-t border-border/70 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate px-3 text-[0.7rem] text-muted-foreground",
							children: user.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-brand/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " View website"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signOut(),
							className: "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Open admin menu",
								onClick: () => setNavOpen(true),
								className: "inline-flex size-10 items-center justify-center rounded-xl border border-border text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold text-brand-deep",
									children: current.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[0.7rem] text-muted-foreground",
									children: current.hint
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Sign out",
								onClick: () => void signOut(),
								className: "inline-flex size-10 items-center justify-center rounded-xl border border-border text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							})
						]
					})
				}),
				navOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close menu",
						onClick: () => setNavOpen(false),
						className: "absolute inset-0 bg-brand-deep/45 backdrop-blur-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-background px-4 py-5 shadow-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: reclaim_logo_png_asset_default.url,
									alt: "Reclaim Hormones",
									className: "h-8 w-auto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Close menu",
									onClick: () => setNavOpen(false),
									className: "inline-flex size-9 items-center justify-center rounded-xl border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "mt-5 flex-1 overflow-y-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
									pathname,
									onNavigate: () => setNavOpen(false)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/",
								target: "_blank",
								rel: "noreferrer",
								className: "mt-3 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " View website"]
							})
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto min-w-0 max-w-6xl px-4 pb-28 pt-5 lg:px-8 lg:pb-10 lg:pt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex",
						children: MOBILE_TABS.map((link) => {
							const active = isActive(link, pathname);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: link.to,
									preload: "intent",
									className: `flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors ${active ? "text-brand" : "text-muted-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(link.icon, { className: "size-5" }), link.label]
								})
							}, link.to);
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { AdminLayout as component };

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Link wrapper for admin-managed destinations. Internal paths use the client
 * router; anything external (http, tel, mailto, #hash) renders a plain anchor.
 */
export function SiteLink({
  to,
  hash,
  className,
  ariaLabel,
  onClick,
  children,
}: {
  to: string;
  hash?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const isInternal = to.startsWith("/");
  if (isInternal) {
    return (
      <Link
        to={to as "/"}
        {...(hash ? { hash } : {})}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  const external = to.startsWith("http");
  return (
    <a
      href={to}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

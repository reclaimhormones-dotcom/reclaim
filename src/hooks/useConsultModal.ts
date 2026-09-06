import { createContext, useContext } from "react";

export type ConsultModalApi = {
  /** Opens the booking modal. `program` pre-fills the interest line. */
  open: (program?: string) => void;
};

export const ConsultModalContext = createContext<ConsultModalApi | null>(null);

/**
 * Every "Book Consultation" CTA on the site opens one shared modal, so a
 * visitor is never navigated away from what they were reading to fill in five
 * fields. Lives apart from the modal component so importing the hook does not
 * pull the whole dialog into a route's bundle.
 */
export function useConsultModal(): ConsultModalApi {
  const ctx = useContext(ConsultModalContext);
  /* A no-op keeps CTAs safe if one ever renders outside the provider. */
  return ctx ?? { open: () => undefined };
}

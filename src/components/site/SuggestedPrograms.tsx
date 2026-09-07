import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { usePrograms } from "@/hooks/useSiteContent";
import {
  categoryLabel,
  programSlug,
  publicPrograms,
  showsPrice,
  type ProgramDoc,
} from "@/lib/content-types";
import { icon } from "@/lib/site-content";

/**
 * The other programs, shown after a program's own content.
 *
 * Built from whatever the clinic has published minus the one being read, so it
 * adapts to any catalogue size and renders nothing at all when this is the only
 * program. Same-audience programs come first, since a reader on a women's page
 * is far more likely to want the other women's programs.
 */
export function SuggestedPrograms({ current }: { current: ProgramDoc }) {
  const { data } = usePrograms();

  const others = publicPrograms(data).filter((p) => p.id !== current.id);
  if (others.length === 0) return null;

  const sameAudience = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  const suggestions = [...sameAudience, ...rest].slice(0, 6);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <h2 className="text-center text-[1.6rem] text-foreground lg:text-[2rem]">
          Explore other <span className="text-brand">programs</span>
        </h2>

        {/*
         * Snap-scrolling rail on touch, grid on desktop. The negative margin
         * lets the rail bleed to the screen edge so a card peeks in from the
         * right, which is what tells a reader it scrolls.
         */}
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {suggestions.map((p, i) => (
            <Reveal
              key={p.id}
              delay={Math.min(i * 80, 320)}
              className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
            >
              <Link
                to="/programs/$slug"
                params={{ slug: programSlug(p) }}
                className="group surface lift flex h-full flex-col overflow-hidden rounded-[1.5rem] hover:border-brand/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    width={700}
                    sizes="(min-width: 1024px) 22rem, 78vw"
                    className="size-full"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                  />
                  <span className="icon-pod absolute left-3 top-3 size-9 bg-background/90 backdrop-blur">
                    {(() => {
                      const Icon = icon(p.icon ?? "Leaf");
                      return <Icon className="size-4" />;
                    })()}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
                    {categoryLabel(p.category)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-[1.05rem] leading-snug text-brand-deep">
                    {p.title}
                  </h3>
                  {p.description ? (
                    <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  ) : null}

                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      {p.duration ? (
                        <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand-deep">
                          <Clock className="size-3.5 text-gold" aria-hidden="true" />
                          {p.duration}
                        </span>
                      ) : null}
                      {showsPrice(p) ? (
                        <span className="font-serif text-base text-brand-deep">
                          ₹{p.price?.toLocaleString("en-IN")}
                        </span>
                      ) : null}
                    </div>
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

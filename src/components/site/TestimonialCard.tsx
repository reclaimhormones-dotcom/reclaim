import { useState } from "react";
import { Play, Quote } from "lucide-react";

import { Rating } from "@/components/site/Rating";
import { SmartImage } from "@/components/site/SmartImage";
import { embedUrl, storyLayout, type TestimonialDoc } from "@/lib/content-types";

/**
 * YouTube/Vimeo iframes arrive covered in titles, logos, share buttons and a
 * timestamp. Nothing suppresses those reliably before playback, so the card
 * shows its own clean poster and only mounts the iframe once the viewer asks
 * for it — at which point autoplay starts it immediately.
 */
function VideoStory({ url, name }: { url: string; name: string }) {
  const [playing, setPlaying] = useState(false);
  const src = embedUrl(url);
  const poster = youTubePoster(url);

  if (playing) {
    return (
      <div className="overflow-hidden rounded-2xl bg-brand-deep">
        <iframe
          src={src.includes("?") ? `${src}&autoplay=1` : `${src}?autoplay=1`}
          title={`${name} — video story`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${name}'s video story`}
      className="group/video relative block aspect-video w-full overflow-hidden rounded-2xl bg-brand-deep"
    >
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover/video:scale-[1.04] motion-reduce:group-hover/video:scale-100"
        />
      ) : null}
      {/* A calm scrim so the play control reads on any thumbnail. */}
      <span className="absolute inset-0 bg-brand-deep/25 transition-colors duration-300 group-hover/video:bg-brand-deep/15" />
      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-[var(--shadow-e2)] transition-transform duration-300 group-hover/video:scale-110 motion-reduce:group-hover/video:scale-100">
        <Play className="ml-0.5 size-6 fill-primary text-primary" />
      </span>
    </button>
  );
}

/** youtu.be/ID and /embed/ID both yield a poster; other hosts have none. */
function youTubePoster(raw: string): string | null {
  const url = (raw || "").trim();
  if (!/youtu/.test(url)) return null;
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
  return m?.[1] ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

/**
 * One premium review card.
 *
 * Every card is the same height: the review sits in a fixed-height scroll area
 * so a long story scrolls inside the card instead of stretching it past its
 * neighbours. The identity block is at the top only — name, program, rating and
 * a compact avatar — so there is no second portrait at the bottom.
 */
export function TestimonialCard({ testimonial }: { testimonial: TestimonialDoc }) {
  const layout = storyLayout(testimonial);
  const name = testimonial.name.replace(/^—\s*/, "");
  const initial = name.trim().charAt(0).toUpperCase() || "R";

  return (
    <figure className="surface-glass lift flex h-full flex-col rounded-[1.5rem] p-5 sm:p-6">
      {/* Identity — the only place a face appears. */}
      <figcaption className="flex items-center gap-3.5">
        {testimonial.photo?.trim() ? (
          <SmartImage
            src={testimonial.photo}
            alt={`${name}, Reclaim Hormones client`}
            width={200}
            className="size-20 shrink-0 rounded-full ring-2 ring-white/70 sm:size-24"
          />
        ) : (
          <span className="icon-pod size-20 shrink-0 rounded-full font-serif text-2xl text-brand-deep sm:size-24">
            {initial}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] font-semibold text-foreground">{name}</p>
          {testimonial.program ? (
            <p className="mt-0.5 truncate text-[0.7rem] font-medium uppercase tracking-wide text-primary/80">
              {testimonial.program}
            </p>
          ) : null}
          <Rating value={testimonial.rating || 5} className="mt-1.5" />
        </div>
      </figcaption>

      {layout === "video" && testimonial.videoUrl ? (
        <div className="mt-5">
          <VideoStory url={testimonial.videoUrl} name={name} />
        </div>
      ) : null}

      {/*
       * Height-capped review area. `max-h` is what stops a long story from
       * stretching the card past its neighbours — it scrolls instead — while
       * `flex-1` lets it absorb slack when a taller sibling (a video story)
       * sets the row height, so no card ends with dead space.
       *
       * `overscroll-contain` keeps a flick inside the quote from carrying on
       * and scrolling the page once it reaches the end.
       */}
      <div className="relative mt-5 flex min-h-0 flex-1 flex-col">
        <Quote className="size-4 shrink-0 fill-sage text-sage" aria-hidden="true" />
        <blockquote className="review-scroll mt-2 min-h-0 max-h-56 flex-1 basis-32 overflow-y-auto overscroll-contain pr-2 text-pretty-body text-[0.9rem] leading-relaxed text-foreground/85">
          {testimonial.review}
        </blockquote>
      </div>
    </figure>
  );
}

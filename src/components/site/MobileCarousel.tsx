import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, type ReactNode } from "react";

export function MobileCarousel({
  children,
  containerClassName = "",
  slideClassName = "",
  autoPlayDelay = 4000,
}: {
  children: ReactNode[];
  containerClassName?: string;
  slideClassName?: string;
  autoPlayDelay?: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: false,
      breakpoints: {
        "(min-width: 1024px)": { active: false },
      },
    },
    [Autoplay({ delay: autoPlayDelay, stopOnInteraction: true })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative group/carousel -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* On desktop, containerClassName usually sets grid columns. On mobile, we force flex row for Embla */}
        <div className={`flex lg:grid ${containerClassName}`}>
          {children.map((child, index) => (
            <div
              key={index}
              className={`flex-[0_0_85%] min-w-0 pl-4 first:pl-0 lg:flex-none lg:pl-0 lg:w-full ${slideClassName}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Dot Indicators */}
      {scrollSnaps.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

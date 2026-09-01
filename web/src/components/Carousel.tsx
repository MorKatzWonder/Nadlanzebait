import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps children (cards/quotes) in a horizontally-scrollable, snap-to-item
 * track. On mobile this shows one item at a time (native swipe already
 * works; dot indicators below just make it discoverable and clickable). At
 * the site's tablet/desktop breakpoint the track reverts to the wrapped
 * class's normal grid layout and the dots hide themselves via CSS.
 *
 * Dots (rather than prev/next arrows) sidestep RTL: an arrow's glyph has to
 * point the right way for the reading direction, but a dot is symmetric —
 * there's no direction to get backwards in Hebrew.
 */
export function Carousel({ children, className }: { children: ReactNode; className: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = Array.isArray(children) ? children.length : 1;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateActive() {
      const items = Array.from(track!.children) as HTMLElement[];
      if (items.length === 0) return;
      const trackStart = track!.getBoundingClientRect().left;
      let current = 0;
      let closest = Infinity;
      items.forEach((item, i) => {
        const diff = Math.abs(item.getBoundingClientRect().left - trackStart);
        if (diff < closest) {
          closest = diff;
          current = i;
        }
      });
      setActive(current);
    }

    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    return () => track.removeEventListener("scroll", updateActive);
  }, [count]);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    items[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="carousel">
      <div className={`carousel__track ${className}`} ref={trackRef}>
        {children}
      </div>
      {count > 1 ? (
        <div className="carousel__dots" role="tablist">
          {Array.from({ length: count }).map((_, i) => (
            <button
              type="button"
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`${i + 1} / ${count}`}
              className={`carousel__dot${i === active ? " carousel__dot--active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

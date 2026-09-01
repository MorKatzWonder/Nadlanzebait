import { useRef, type ReactNode } from "react";

/**
 * Wraps children (cards/quotes) in a horizontally-scrollable, snap-to-item
 * track with prev/next arrows. On mobile this shows one item at a time
 * (native swipe already works; the arrows just make it discoverable). At
 * the site's tablet/desktop breakpoint the track reverts to the wrapped
 * class's normal grid layout and the arrows hide themselves via CSS.
 *
 * Finds the current item from actual scroll position rather than tracking
 * an index, so it stays correct after a manual swipe.
 */
export function Carousel({ children, className }: { children: ReactNode; className: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function go(delta: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;

    // Compare rendered edges (not offsetLeft/scrollLeft) so this works in
    // RTL too: browsers disagree on whether scrollLeft counts up or down
    // in RTL, but getBoundingClientRect always reflects the real on-screen
    // position after scrolling, in either direction.
    const trackStart = track.getBoundingClientRect().left;
    let current = 0;
    let closest = Infinity;
    items.forEach((item, i) => {
      const diff = Math.abs(item.getBoundingClientRect().left - trackStart);
      if (diff < closest) {
        closest = diff;
        current = i;
      }
    });

    const next = Math.min(Math.max(current + delta, 0), items.length - 1);
    items[next].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="carousel">
      <div className={`carousel__track ${className}`} ref={trackRef}>
        {children}
      </div>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => go(-1)}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => go(1)}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

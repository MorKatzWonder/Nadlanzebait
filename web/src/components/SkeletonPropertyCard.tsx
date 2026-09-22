/** Placeholder shown in place of a real PropertyCard while the Google Sheet fetch is in flight. */
export function SkeletonPropertyCard() {
  return (
    <article className="card" aria-hidden="true">
      <div className="ph skeleton-bar" style={{ borderRadius: 0 }} />
      <div className="card-body">
        <div className="skeleton-bar" style={{ height: 11, width: "35%" }} />
        <div className="skeleton-bar" style={{ height: 19, width: "70%" }} />
        <div className="skeleton-bar" style={{ height: 25, width: "45%" }} />
        <div className="skeleton-bar" style={{ height: 14, width: "90%" }} />
        <div className="skeleton-bar" style={{ height: 14, width: "60%" }} />
      </div>
    </article>
  );
}

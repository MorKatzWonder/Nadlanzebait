export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M32 60C32 60 54 42 54 26A22 22 0 0 0 10 26C10 42 32 60 32 60Z" />
      <path d="M20 30 32 19 44 30v12h-8V32h-8v10h-8z" />
    </svg>
  );
}

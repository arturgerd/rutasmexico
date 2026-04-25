interface FlagMXProps {
  className?: string;
  title?: string;
}

export default function FlagMX({ className = "w-5 h-3.5", title = "México" }: FlagMXProps) {
  return (
    <svg
      viewBox="0 0 12 8"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block rounded-sm shadow-sm ${className}`}
      aria-label={title}
      role="img"
    >
      <rect width="4" height="8" x="0" fill="#006847" />
      <rect width="4" height="8" x="4" fill="#FFFFFF" />
      <rect width="4" height="8" x="8" fill="#CE1126" />
    </svg>
  );
}

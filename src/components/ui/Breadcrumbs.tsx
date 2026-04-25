import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-arena-700">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-terracotta-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-medium text-arena-900" : ""}>
                  {item.name}
                </span>
              )}
              {!isLast && (
                <svg className="w-3.5 h-3.5 text-arena-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z" clipRule="evenodd" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

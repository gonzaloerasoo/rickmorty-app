export default function PaginationBar({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const pages: (number | string)[] = [];
  const max = totalPages;

  const add = (p: number | string) => pages.push(p);

  add(1);

  if (page > 3) add("...");

  for (let p = Math.max(2, page - 1); p <= Math.min(max - 1, page + 1); p++) {
    if (p !== 1 && p !== max) add(p);
  }

  if (page < max - 2) add("...");

  if (max > 1) add(max);

  return (
    <div className="flex justify-center gap-2 mt-10 text-sm">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 rounded-full border border-accent text-accent disabled:opacity-40"
      >
        Anterior
      </button>

      {pages.map((p, i) =>
        typeof p === "string" ? (
          <span key={i} className="px-2 text-gray-500">
            {p}
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-full border ${
              p === page
                ? "bg-accent text-white border-accent"
                : "border-accent text-accent"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 rounded-full border border-accent text-accent disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  );
}

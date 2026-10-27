// A simple data table: a real <table> from 768px (rows highlight on hover),
// stacked label/value cards below that, so nothing scrolls sideways on phones.
// Both versions are in the HTML; CSS shows one, and display:none hides the other
// from screen readers too, so nothing is read twice.
export function ResponsiveTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return (
    <>
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-ink">
            {columns.map((c) => (
              <th key={c} scope="col" className="pb-4 pr-6 text-[0.875rem] font-semibold text-ink">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="group border-b border-line transition-colors hover:bg-sunken">
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-6 pr-6 pl-3 text-[1.125rem] font-semibold tracking-[-0.015em] text-ink transition-[padding] duration-300 group-hover:pl-5">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="py-6 pr-6 text-ink-soft">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden" aria-label={caption}>
        {rows.map((r) => (
          <li key={r[0]} className="rounded-[1rem] bg-sunken p-5">
            <p className="text-[1.0625rem] font-semibold text-ink">{r[0]}</p>
            <dl className="mt-3 space-y-2">
              {columns.slice(1).map((c, i) => (
                <div key={c} className="grid grid-cols-[7rem_1fr] gap-3 text-[0.9375rem]">
                  <dt className="text-ink-muted">{c}</dt>
                  <dd className="text-ink-soft">{r[i + 1]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

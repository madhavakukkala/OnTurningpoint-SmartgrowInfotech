import type { FeeRow } from '@/content/countries';

/**
 * Cost breakdown table. A real <table> with a caption and scope'd headers so it
 * is navigable in screen-reader table mode; wrapped in an overflow container so
 * it scrolls independently on narrow screens rather than breaking the layout.
 */
export function FeesTable({
  rows,
  caption,
  note,
  columnLabel = 'Approximate cost',
}: {
  rows: readonly FeeRow[];
  caption: string;
  note?: string;
  columnLabel?: string;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-card bg-surface p-2">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-6 py-5 text-eyebrow font-semibold uppercase text-ink-muted">
                Item
              </th>
              <th
                scope="col"
                className="px-6 py-5 text-right text-eyebrow font-semibold uppercase text-ink-muted"
              >
                {columnLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-0">
                <th
                  scope="row"
                  className={`px-6 py-5 text-base font-medium ${
                    row.emphasis ? 'font-bold text-ink' : 'text-ink-muted'
                  }`}
                >
                  {row.label}
                </th>
                <td
                  className={`px-6 py-5 text-right text-base tabular-nums ${
                    row.emphasis ? 'font-bold text-ink' : 'text-ink-muted'
                  }`}
                >
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <figcaption className="mt-4 text-sm text-ink-subtle">{note}</figcaption>}
    </figure>
  );
}

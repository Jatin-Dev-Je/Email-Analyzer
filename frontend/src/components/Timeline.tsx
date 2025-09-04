export type TimelineItem = {
  name: string
  ip?: string
  timestamp?: string
  details?: string
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items?.length) {
    return <div className="text-sm text-gray-600">No receiving chain available yet.</div>
  }

  return (
    <div className="overflow-x-auto">
      <ol className="relative border-s border-gray-200 pl-3 sm:pl-6">
        {items.map((it, idx) => (
          <li key={idx} className="mb-8 ms-6">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold leading-none text-gray-900">{it.name}</h3>
              {it.ip && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium">{it.ip}</span>}
            </div>
            <time className="mb-2 block text-xs font-normal leading-none text-gray-500">{it.timestamp || '—'}</time>
            {it.details && <p className="text-sm text-gray-700">{it.details}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

"use client"
import { useState } from 'react'

export function Tabs({ tabs, initial = 0 }: { tabs: { label: string; content: React.ReactNode }[]; initial?: number }) {
  const [idx, setIdx] = useState(initial)
  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((t, i) => (
          <button key={t.label} onClick={() => setIdx(i)} className={`rounded-t-md px-4 py-2 text-sm ${i===idx?'bg-white text-primary-700 border-x border-t border-gray-200 shadow-sm':'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>{t.label}</button>
        ))}
      </div>
      <div className="rounded-b-md border border-gray-200 bg-white p-4">{tabs[idx]?.content}</div>
    </div>
  )
}

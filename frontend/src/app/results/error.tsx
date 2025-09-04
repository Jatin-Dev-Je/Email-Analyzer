"use client"
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-red-200 bg-red-50 p-6">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 rounded-md bg-red-700 px-3 py-2 text-white hover:bg-red-800">Try again</button>
    </div>
  )
}

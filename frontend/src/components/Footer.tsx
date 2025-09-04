export function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl p-4 text-center text-xs text-gray-500 sm:p-6">
        © {new Date().getFullYear()} MailTrace • Built for email header analysis
      </div>
    </footer>
  )
}

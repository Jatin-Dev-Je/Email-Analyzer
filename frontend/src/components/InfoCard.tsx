type Props = {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export function InfoCard({ title, subtitle, icon, children }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover dark:bg-secondary-800">
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="h-2 w-2 rounded-full bg-primary-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

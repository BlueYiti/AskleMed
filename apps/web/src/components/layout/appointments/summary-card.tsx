interface Props {
  label: string
  count: number
  icon: React.ReactNode
}

export function SummaryCard({ label, count, icon }: Props) {
  return (
    <div className="flex items-center justify-between border rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <p className="text-sm font-medium">{label}</p>
      </div>
      <span className="font-semibold text-lg">{count}</span>
    </div>
  )
}
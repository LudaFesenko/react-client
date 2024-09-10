import React from "react"

type Props = {
  count: number
  title: string
}

export const CountInfo: React.FC<Props> = ({ title, count }) => {
  return (
    <div className="flex flex-col items-center  space-x-2 p-2">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  )
}

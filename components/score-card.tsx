"use client"

import { Card } from "@/components/ui/card"

interface ScoreCardProps {
  label: string
  score: number
  description: string
}

export function ScoreCard({ label, score, description }: ScoreCardProps) {
  const roundedScore = Math.round(Math.min(Math.max(score, 0), 100))

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 dark:text-green-400"
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/50"
    if (score >= 50) return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800/50"
    return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50"
  }

  return (
    <Card className={`p-4 border ${getScoreBgColor(roundedScore)} transition-all duration-300 hover:shadow-md`}>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <div className={`text-3xl font-bold ${getScoreColor(roundedScore)} transition-base`}>{roundedScore}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

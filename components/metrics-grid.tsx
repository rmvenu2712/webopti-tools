"use client"

import { Card } from "@/components/ui/card"
import { Zap, Activity, Scaling, Clock } from "lucide-react"

interface MetricsGridProps {
  metrics: {
    fcp: string
    lcp: string
    cls: string
    tbt: string
  }
}

const metricDefinitions = [
  {
    icon: Zap,
    key: "fcp",
    label: "First Contentful Paint",
    description: "Time to first visible content",
  },
  {
    icon: Activity,
    key: "lcp",
    label: "Largest Contentful Paint",
    description: "Time to largest content visible",
  },
  {
    icon: Scaling,
    key: "cls",
    label: "Cumulative Layout Shift",
    description: "Visual stability score",
  },
  {
    icon: Clock,
    key: "tbt",
    label: "Total Blocking Time",
    description: "Main thread blocking duration",
  },
]

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricDefinitions.map((def, index) => {
        const Icon = def.icon
        const metricKey = def.key as keyof typeof metrics
        const value = metrics[metricKey]

        return (
          <Card
            key={def.key}
            className="p-4 border border-border hover:border-primary/50 transition-all hover:shadow-md"
            style={{
              /* Staggered animation for metric cards */
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="flex flex-col gap-3">
              <Icon className="h-5 w-5 text-foreground dark:text-white" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm text-foreground dark:text-white">{def.label}</p>
                <p className="text-xs text-muted-foreground dark:text-white/60 mt-0.5">{def.description}</p>
              </div>
              <div className="text-2xl font-bold text-foreground dark:text-white mt-2">{value}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

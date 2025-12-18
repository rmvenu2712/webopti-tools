"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { performanceReportType } from "@/lib/types"

interface OpportunitiesSectionProps {
  opportunities: performanceReportType["opportunities"]
}

export function OpportunitiesSection({ opportunities }: OpportunitiesSectionProps) {
  return (
    <Card className="bg-card border-border p-8">
      <h3 className="text-xl font-bold mb-6">Opportunities for Improvement</h3>
      <div className="space-y-4">
        {opportunities.map((opp, idx) => (
          <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{opp.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Potential savings: {opp.savings}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

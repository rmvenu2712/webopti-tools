"use client"

import { Card } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <Card className="h-32 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-24 bg-muted" />
        ))}
      </div>
      <Card className="h-40 bg-muted" />
    </div>
  )
}

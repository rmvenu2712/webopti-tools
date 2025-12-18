"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"

export const DynamicFeaturesSection = dynamic(
  () => import("@/components/features-section").then((mod) => ({ default: mod.FeaturesSection })),
  {
    loading: () => (
      <Suspense fallback={<LoadingCard />}>
        <div />
      </Suspense>
    ),
  },
)

export const DynamicBenefitsSection = dynamic(
  () => import("@/components/benefits-section").then((mod) => ({ default: mod.BenefitsSection })),
  {
    loading: () => (
      <Suspense fallback={<LoadingCard />}>
        <div />
      </Suspense>
    ),
  },
)

function LoadingCard() {
  return <Card className="h-32 bg-muted animate-pulse" />
}

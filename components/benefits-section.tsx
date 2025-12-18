"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Clock } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Boost Rankings",
    metric: "Up to 300%",
    description: "SEO improvements from better Core Web Vitals and performance optimization.",
  },
  {
    icon: Users,
    title: "Better UX",
    metric: "98%",
    description: "Users complete more actions on faster, more accessible websites.",
  },
  {
    icon: Zap,
    title: "Faster Load",
    metric: "70%",
    description: "Average load time reduction following our actionable recommendations.",
  },
  {
    icon: Clock,
    title: "Save Time",
    metric: "Hours",
    description: "Automated testing saves manual audit and optimization work.",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why PerfScore Lab?</h2>
          <p className="text-muted-foreground max-w-2xl text-balance">Proven results from thousands of audits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card
                key={benefit.title}
                className="p-6 border border-border hover:shadow-lg transition-fast hover:border-primary/50"
              >
                <Icon className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
                <div className="text-3xl font-bold text-accent mb-2">{benefit.metric}</div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

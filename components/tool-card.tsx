"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type React from "react"

// interface ToolCardProps {
//   icon: React.ReactNode
//   title: string
//   description: string
//   href: string
//   delay: number
//   features: string[]
//   color?: "purple" | "green"
// }

export function ToolCard({ icon, title, description, href, delay, features, color = "purple" }: any) {
  const colorClasses =
    color === "purple"
      ? "from-purple-600 to-purple-700 group-hover:from-purple-700 group-hover:to-purple-800"
      : "from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700"

  return (
    <Link href={href}>
      <Card
        className="h-full p-8 bg-white border-2 border-purple-100 hover:border-purple-300 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 rounded-3xl"
        style={{
          animation: `slideInUp 0.6s ease-out ${delay}s backwards`,
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses} shadow-lg`}>
            <div className="w-6 h-6 text-white">{icon}</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>

        <div className="space-y-2">
          {features.map((feature:any, idx:any) => (
            <div key={idx} className="flex items-center gap-3 text-xs text-gray-600">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${colorClasses}`} />
              {feature}
            </div>
          ))}
        </div>
      </Card>
    </Link>
  )
}

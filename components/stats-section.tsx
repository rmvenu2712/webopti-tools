"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Activity, Users, Globe, Zap } from "lucide-react"

const stats = [
  { icon: Users, label: "Active Users", value: 50000, suffix: "+", prefix: "" },
  { icon: Activity, label: "Tests Per Day", value: 1200, suffix: "+", prefix: "" },
  { icon: Globe, label: "Countries", value: 120, suffix: "+", prefix: "" },
  { icon: Zap, label: "Avg Speed", value: 98, suffix: "%", prefix: "" },
]

export function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!inView) return

    stats.forEach((stat, index) => {
      let start = 0
      const end = stat.value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = end
            return newCounts
          })
          clearInterval(timer)
        } else {
          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(start)
            return newCounts
          })
        }
      }, 16)

      return () => clearInterval(timer)
    })
  }, [inView])

  return (
    <section ref={ref} className="w-full py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient-x" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.prefix}
                  {counts[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

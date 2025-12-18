"use client"

import { Card } from "@/components/ui/card"
import { Gauge, Shield, Zap, BarChart3, Lock, Smartphone } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const features = [
  {
    icon: Gauge,
    title: "Real-time Performance",
    description: "Get instant performance metrics and Core Web Vitals analysis with live data updates.",
    number: "01",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Accessibility Audit",
    description: "Comprehensive WCAG compliance checks with detailed accessibility recommendations.",
    number: "02",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Best Practices",
    description: "Security audits, performance tips, and modern web standards recommendations.",
    number: "03",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Visual Reports",
    description: "Beautiful, shareable reports with PDF export and trend analysis.",
    number: "04",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Lock,
    title: "SEO Optimization",
    description: "Structured data validation, meta tags analysis, and SEO recommendations.",
    number: "05",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Multi-device Testing",
    description: "Test across mobile, tablet, and desktop with realistic network throttling.",
    number: "06",
    color: "from-pink-500 to-purple-500",
  },
]

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="features"
      ref={ref}
      className="w-full py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FEATURES
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
            Complete performance testing and optimization toolkit with advanced analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group p-8 h-full hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border-purple-100 hover:border-purple-300 bg-white/50 backdrop-blur-sm relative overflow-hidden cursor-pointer hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                          <Icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-purple-300 group-hover:text-purple-500 transition-colors px-3 py-1 rounded-full bg-purple-50">
                        {feature.number}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent flex items-center gap-1`}>
                        Learn more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

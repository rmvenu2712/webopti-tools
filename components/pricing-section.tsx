"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out",
    features: [
      "10 tests per day",
      "Basic performance metrics",
      "Core Web Vitals",
      "Mobile & Desktop testing",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    description: "For professional developers",
    features: [
      "Unlimited tests",
      "Advanced analytics",
      "Historical data tracking",
      "API access",
      "Priority support",
      "Custom reports",
      "Team collaboration",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" ref={ref} className="w-full py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-white to-purple-50/50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PRICING
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl text-lg">
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={plan.popular ? "md:-mt-4" : ""}
            >
              <Card className={`p-8 h-full relative overflow-hidden ${
                plan.popular 
                  ? "border-2 border-purple-500 shadow-2xl shadow-purple-500/20 bg-gradient-to-b from-white to-purple-50/50" 
                  : "border-purple-100 bg-white/50 backdrop-blur-sm hover:border-purple-300"
              } transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Custom" && <span className="text-4xl font-bold text-gray-900">$</span>}
                    <span className={`text-5xl font-bold ${
                      plan.popular 
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" 
                        : "text-gray-900"
                    }`}>
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                  }`}
                  size="lg"
                >
                  <Link href={plan.price === "Custom" ? "/contact" : "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

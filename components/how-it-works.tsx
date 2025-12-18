"use client"

import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "1",
    title: "Enter URL",
    description: "Paste any web URL to get started with your comprehensive audit.",
  },
  {
    number: "2",
    title: "Run Analysis",
    description: "Our Lighthouse engine analyzes performance, accessibility, best practices, and SEO.",
  },
  {
    number: "3",
    title: "Get Report",
    description: "Receive comprehensive results with scores, metrics, and prioritized suggestions.",
  },
  {
    number: "4",
    title: "Improve & Share",
    description: "Export reports, share results with your team, and track improvements over time.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl  font-bold text-purple-900">How It Works</h2>
          <p className="text-gray-600 max-w-2xl text-balance text-lg">Four simple steps to perfect web performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="p-8 relative border-2 border-purple-100 hover:border-purple-300 transition-all group bg-white hover:shadow-xl rounded-3xl hover:-translate-y-2"
            >
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl flex items-center justify-center  font-bold text-xl shadow-lg">
                {step.number}
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <h3 className="font-semibold text-lg text-purple-900">{step.title}</h3>
                <p className="text-sm text-gray-600 text-balance leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-300 to-transparent" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

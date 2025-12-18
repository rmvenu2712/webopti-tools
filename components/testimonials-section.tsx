"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Lead at TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "This tool transformed how we approach performance testing. The real-time insights are invaluable for our development workflow.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO at StartupXYZ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "The best Lighthouse tool I've used. Clean interface, detailed reports, and incredibly fast. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Performance Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "Game-changer for our SEO efforts. The comprehensive audits helped us improve our Core Web Vitals by 40%.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TESTIMONIALS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              Loved by Developers
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl text-lg">
            See what teams around the world are saying about us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-white/50 backdrop-blur-sm border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative group">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-purple-100 group-hover:text-purple-200 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-purple-500 text-purple-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-purple-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

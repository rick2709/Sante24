"use client"

import { motion } from 'framer-motion'
import { HeartHandshake, Apple, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const tips = [
  {
    icon: HeartHandshake,
    title: 'Get Care',
    description: 'Find the right care option for your needs, from urgent care to routine check-ups.',
    href: '/services',
  },
  {
    icon: Apple,
    title: 'Healthy Living',
    description: 'Tips and resources for maintaining a healthy lifestyle for you and your family.',
    href: '/blog',
  },
  {
    icon: BookOpen,
    title: 'Patient Resources',
    description: 'Access helpful information about our services, billing, and patient rights.',
    href: '/contact',
  },
]

export function HealthTips() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366]">
            Live Healthier
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Resources and guidance to help you take control of your health journey.
          </p>
        </motion.div>

        {/* Tips Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={tip.href}>
                  <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border h-full flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00B4A6] transition-colors">
                      <Icon className="w-6 h-6 text-[#00B4A6] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#003366] mb-1">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{tip.description}</p>
                      <span className="inline-flex items-center gap-2 text-[#00B4A6] font-medium text-sm group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

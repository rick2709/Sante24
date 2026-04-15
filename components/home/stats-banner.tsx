"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, UserCheck, Clock, Star } from 'lucide-react'

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Patients Served' },
  { icon: UserCheck, value: 15, suffix: '+', label: 'Specialist Doctors' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Emergency Care' },
  { icon: Star, value: 5, suffix: '-Star', label: 'Rated Clinic' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 1500
      const steps = 60
      const increment = value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsBanner() {
  return (
    <section className="bg-[#003366] py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#00B4A6]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#00B4A6]" />
                </div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

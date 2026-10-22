"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, CalendarCheck, ShieldCheck, Heart } from 'lucide-react'

const stats = [
  { icon: Clock, label: '24/7 Emergency Care', sub: 'Open every hour, every day' },
  { icon: CalendarCheck, label: 'Since 2016', sub: 'Opened 19 October 2016' },
  { icon: ShieldCheck, label: 'Licensed by HPA & MDPCZ', sub: 'Fully accredited in Zimbabwe' },
  { icon: Heart, label: 'Maternity & General Care', sub: 'Two centres under one roof' },
]

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden bg-[#003366] py-16 mt-20">
      {/* Blurred, darkened onsite photo for a clinical, high-tech feel */}
      <Image
        src="/images/sante/sante24-medical-gas-alarm-panel-oxygen-monitor.jpg"
        alt=""
        aria-hidden="true"
        fill
        quality={85}
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center blur-sm scale-110"
      />
      <div className="absolute inset-0 bg-[#003366]/85" />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
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
                <p className="text-base md:text-lg font-heading font-bold text-white mb-1 leading-tight">
                  {stat.label}
                </p>
                <p className="text-white/60 text-xs">{stat.sub}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

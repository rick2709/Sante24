"use client"

import { motion } from 'framer-motion'
import { UserSearch, Stethoscope, CalendarCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useBooking } from '@/components/booking-context'

const cards = [
  {
    icon: UserSearch,
    title: 'Find a Doctor',
    description: 'Search our team of specialist doctors by name or specialty.',
    href: '/doctors',
  },
  {
    icon: Stethoscope,
    title: 'Our Services',
    description: 'From emergency care to dental services, we cover all your needs.',
    href: '/services',
  },
  {
    icon: CalendarCheck,
    title: 'Book Appointment',
    description: 'Schedule your visit online in just a few clicks.',
    href: null, // Opens booking modal
  },
]

export function QuickAccessCards() {
  const { openBooking } = useBooking()

  return (
    <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          const isBooking = card.href === null
          
          const CardContent = (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-border cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B4A6] transition-colors">
                <Icon className="w-7 h-7 text-[#00B4A6] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#003366] mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{card.description}</p>
              <div className="flex items-center gap-2 text-[#00B4A6] font-medium text-sm group-hover:gap-3 transition-all">
                <span>{isBooking ? 'Book Now' : 'Learn More'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          )

          if (isBooking) {
            return (
              <button key={card.title} onClick={() => openBooking()} className="text-left">
                {CardContent}
              </button>
            )
          }

          return (
            <Link key={card.title} href={card.href}>
              {CardContent}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Stethoscope, Newspaper, UserRound, Phone, Calendar } from 'lucide-react'
import { useBooking } from './booking-context'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/services', icon: Stethoscope, label: 'Services' },
  { href: '/blog', icon: Newspaper, label: 'Blog' },
  { href: '/doctors', icon: UserRound, label: 'Doctors' },
  { href: '/contact', icon: Phone, label: 'Contact' },
]

export function MobileNav() {
  const pathname = usePathname()
  const { openBooking } = useBooking()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        onClick={() => openBooking()}
        className="absolute -top-16 right-4 w-14 h-14 bg-[#00B4A6] rounded-full shadow-lg flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Calendar className="w-6 h-6 text-white" />
        </motion.div>
        <span className="sr-only">Book Now</span>
      </motion.button>

      {/* Bottom Navigation Bar */}
      <nav className="glass border-t border-white/20 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1 px-3 min-w-[60px]"
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isActive ? 'bg-[#00B4A6]/10' : ''
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#00B4A6]' : 'text-gray-500'
                    }`} 
                  />
                </motion.div>
                <span 
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-[#00B4A6]' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

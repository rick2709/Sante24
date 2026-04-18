"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from './booking-context'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { openBooking } = useBooking()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-border shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-[#00B4A6]' : 'bg-[#00B4A6]'}`}>
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className={`text-xl font-bold font-heading ${isScrolled ? 'text-[#003366]' : 'text-white'}`}>
                Sante 24
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative ${
                    isScrolled 
                      ? pathname === link.href 
                        ? 'text-[#00B4A6]' 
                        : 'text-[#003366] hover:text-[#00B4A6]'
                      : pathname === link.href 
                        ? 'text-[#00B4A6]' 
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00B4A6] rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+263789158334"
                className={`flex items-center gap-2 text-sm font-medium ${
                  isScrolled ? 'text-[#003366]' : 'text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+263 78 915 8334</span>
              </a>
              <Button 
                onClick={() => openBooking()}
                className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-6"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header - Hidden on desktop, shown above mobile nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-border shadow-lg' 
            : 'bg-[#003366]'
        }`}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00B4A6] flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className={`text-lg font-bold font-heading ${isScrolled ? 'text-[#003366]' : 'text-white'}`}>
              Sante 24
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg ${isScrolled ? 'text-[#003366]' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl"
            >
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                        pathname === link.href 
                          ? 'bg-[#00B4A6]/10 text-[#00B4A6]' 
                          : 'text-[#003366] hover:bg-gray-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 pt-8 border-t border-border">
                  <a
                    href="tel:+263789158334"
                    className="flex items-center gap-2 text-[#003366] mb-4"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+263 78 915 8334</span>
                  </a>
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      openBooking()
                    }}
                    className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

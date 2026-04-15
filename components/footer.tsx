"use client"

import Link from 'next/link'
import { Plus, Facebook, Instagram, Twitter, Phone } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/doctors', label: 'Our Doctors' },
  { href: '/blog', label: 'Health Blog' },
  { href: '/contact', label: 'Contact' },
]

const services = [
  { href: '/services', label: 'General Medicine' },
  { href: '/services', label: 'Emergency Care' },
  { href: '/services', label: 'Maternal Health' },
  { href: '/services', label: 'Paediatrics' },
  { href: '/services', label: 'Dental Care' },
]

export function Footer() {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden md:block bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-4 gap-12">
            {/* Logo & Tagline */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#00B4A6] flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <span className="text-2xl font-bold font-heading">Sante 24</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Comprehensive medical care for every Harare family, every hour of the day. Your health is our priority.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/26378XXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-[#00B4A6] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={service.href}
                      className="text-white/70 hover:text-[#00B4A6] transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <span className="text-white font-medium block">Address</span>
                  12 Remembrance Drive, Southerton, Harare, Zimbabwe
                </li>
                <li>
                  <span className="text-white font-medium block">Phone</span>
                  <a href="tel:+26378XXXXXXX" className="hover:text-[#00B4A6] transition-colors">
                    +263 78 XXX XXXX
                  </a>
                </li>
                <li>
                  <span className="text-white font-medium block">Email</span>
                  <a href="mailto:info@sante24.co.zw" className="hover:text-[#00B4A6] transition-colors">
                    info@sante24.co.zw
                  </a>
                </li>
                <li>
                  <span className="text-white font-medium block">Hours</span>
                  Open 24 hours, 7 days a week
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-white/50">
            <p>&copy; 2025 Sante 24 Medical Center. All rights reserved.</p>
            <p>Southerton, Harare, Zimbabwe</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - Minimal */}
      <footer className="md:hidden bg-[#003366] text-white py-6 px-4 text-center">
        <p className="text-sm text-white/70">
          &copy; 2025 Sante 24 Medical Center
        </p>
        <p className="text-xs text-white/50 mt-1">
          Southerton, Harare, Zimbabwe
        </p>
      </footer>
    </>
  )
}

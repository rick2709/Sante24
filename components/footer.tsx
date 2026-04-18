"use client"

import Link from 'next/link'
import { Plus, Facebook, Instagram, Twitter } from 'lucide-react'

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

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

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
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sante 24 on Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sante 24 on Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sante 24 on Twitter"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00B4A6] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/263789158334"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Sante 24 on WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                >
                  <WhatsAppIcon />
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
                  <a href="tel:+263789158334" className="hover:text-[#00B4A6] transition-colors">
                    +263 78 915 8334
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
                  Open 24 Hours · 7 Days a Week
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-white/50">
            <p>&copy; 2025 Sante 24 Medical Center. All rights reserved.</p>
            <p>Southerton, Harare, Zimbabwe</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer — Minimal */}
      <footer className="md:hidden bg-[#003366] text-white py-6 px-4 text-center">
        <p className="text-sm text-white/70">&copy; 2025 Sante 24 Medical Center</p>
        <p className="text-xs text-white/50 mt-1">Southerton, Harare, Zimbabwe</p>
        <a
          href="tel:+263789158334"
          className="block text-[#00B4A6] text-sm font-medium mt-2 hover:underline"
        >
          +263 78 915 8334
        </a>
      </footer>
    </>
  )
}

"use client"

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'

export function ContactStrip() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-[#F7F9FC] h-[300px] flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#003366]/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#003366]" />
              </div>
              <p className="text-[#003366] font-heading font-bold">Southerton, Harare</p>
              <p className="text-muted-foreground text-sm">Interactive map coming soon</p>
            </div>
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003366" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366]">
              Visit Us Today
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#00B4A6]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[#003366]">Address</p>
                  <p className="text-muted-foreground">12 Remembrance Drive, Southerton, Harare, Zimbabwe</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#00B4A6]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[#003366]">Phone</p>
                  <a href="tel:+26378XXXXXXX" className="text-muted-foreground hover:text-[#00B4A6] transition-colors">
                    +263 78 XXX XXXX
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#00B4A6]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[#003366]">Hours</p>
                  <p className="text-muted-foreground">Open 24 hours, 7 days a week</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Stethoscope, Baby, ArrowRight } from 'lucide-react'

export function TwoCentres() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366]">
            Two Centres Under One Roof
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Santé 24 houses both a fully equipped general medical centre and a dedicated maternity hospital — comprehensive care for every stage of life, in one location.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Medical Centre Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-border"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#003366]/10 flex items-center justify-center mb-6">
              <Stethoscope className="w-8 h-8 text-[#003366]" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-[#003366] mb-3">
              Santé 24 Medical Centre
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A fully equipped 24-hour general medical facility featuring consultation rooms, procedure rooms, an operating theatre, diagnostic laboratory, and observation wards. Walk in any time — we are always open.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                '24/7 Emergency & General Care',
                'Diagnostic & Laboratory Services',
                'Operating Theatre & Surgery',
                'Specialist Consultations',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00B4A6] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#003366] font-medium hover:text-[#00B4A6] transition-colors"
            >
              Explore Medical Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Maternity Hospital Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-[#7F77DD]/30"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#7F77DD]/10 flex items-center justify-center mb-6">
              <Baby className="w-8 h-8 text-[#7F77DD]" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-[#7F77DD] mb-3">
              Santé 24 Maternity Hospital
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A dedicated maternity unit providing expert care for mothers through every stage of pregnancy, labour, delivery, and recovery — with 24-hour midwifery and obstetric support.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Antenatal & Postnatal Care',
                'Normal Delivery & C-Section',
                'Gynaecology & Obstetrics',
                'Ultrasound Scanning with Doppler',
                'Family Planning Services',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7F77DD] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#7F77DD] font-medium hover:text-[#6660cc] transition-colors"
            >
              Explore Maternity Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

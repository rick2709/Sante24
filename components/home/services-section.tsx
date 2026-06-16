"use client"

import { motion } from 'framer-motion'
import {
  Siren,
  FlaskConical,
  Scissors,
  UserCheck,
  Baby,
  HeartPulse,
  Stethoscope,
  ScanLine,
  Users,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Siren,
    name: '24-Hour Emergency & General Care',
    description: 'Walk-in emergency care, observation wards, and general consultations — open every hour of every day.',
    maternity: false,
  },
  {
    icon: FlaskConical,
    name: 'Diagnostic & Laboratory Services',
    description: 'On-site blood tests, X-ray, ultrasound with Doppler, rapid results, and pre-employment medicals.',
    maternity: false,
  },
  {
    icon: Scissors,
    name: 'Operating Theatre & Surgical Procedures',
    description: 'Fully equipped theatre for minor and major surgery, sterile procedure rooms, anaesthesia, and recovery care.',
    maternity: false,
  },
  {
    icon: UserCheck,
    name: 'Specialist Consultations',
    description: 'Multi-discipline specialists, referrals, follow-ups, and second opinions across a range of medical fields.',
    maternity: false,
  },
  {
    icon: Baby,
    name: 'Antenatal & Postnatal Care',
    description: 'Comprehensive monitoring and support for mothers throughout pregnancy and after delivery.',
    maternity: true,
  },
  {
    icon: HeartPulse,
    name: 'Labour & Delivery',
    description: 'Normal delivery and C-section services in a dedicated maternity theatre with 24-hour care and recovery rooms.',
    maternity: true,
  },
  {
    icon: Stethoscope,
    name: 'Gynaecology & Obstetrics',
    description: 'Specialist care for women at every stage of reproductive health, from routine checks to complex conditions.',
    maternity: true,
  },
  {
    icon: ScanLine,
    name: 'Ultrasound Scanning with Doppler',
    description: 'Advanced obstetric and diagnostic ultrasound including Doppler studies for accurate, timely results.',
    maternity: true,
  },
  {
    icon: Users,
    name: 'Family Planning Services',
    description: 'Confidential family planning counselling, contraception, and reproductive health support for couples and individuals.',
    maternity: true,
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline">
            What We Treat
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            From emergency walk-ins to specialist maternity care, Santé 24 covers all your healthcare needs around the clock.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            const accent = service.maternity ? '#7F77DD' : '#00B4A6'
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                style={{ borderTopColor: service.maternity ? '#7F77DD20' : undefined }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: `${accent}1A` }}
                >
                  <Icon className="w-7 h-7 transition-colors" style={{ color: accent }} />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#003366] mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-medium text-sm hover:gap-3 transition-all"
                  style={{ color: accent }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

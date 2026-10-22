"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/components/booking-context'
import Link from 'next/link'
import Image from 'next/image'

// One ECG cycle is 34px wide. Generate n repetitions starting at xOffset.
function buildPolylinePoints(cycles: number, cy: number, amplitude: number): string {
  // Pattern per cycle: flat, spike up, spike down, flat, small bump, flat
  // Translated from M0,cy L8,cy L10,(cy-amp) L12,(cy+amp) L14,cy L22,cy L24,(cy-amp*0.3) L26,cy L34,cy
  const pts: string[] = []
  for (let i = 0; i < cycles; i++) {
    const x = i * 34
    pts.push(
      `${x},${cy}`,
      `${x + 8},${cy}`,
      `${x + 10},${cy - amplitude}`,
      `${x + 12},${cy + amplitude}`,
      `${x + 14},${cy}`,
      `${x + 22},${cy}`,
      `${x + 24},${cy - amplitude * 0.3}`,
      `${x + 26},${cy}`,
    )
  }
  pts.push(`${cycles * 34},${cy}`)
  return pts.join(' ')
}

// Tiny transparent ECG placed bottom-right of hero
function MiniECG() {
  // 10 cycles = 340px of path so there's always content in the 220px window
  const trace1 = buildPolylinePoints(10, 14, 12)
  const trace2 = buildPolylinePoints(10, 48, 10)

  return (
    <div
      className="absolute bottom-6 right-6 md:right-8 pointer-events-none"
      style={{
        width: 180,
        height: 60,
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'block' }}
        aria-hidden="true"
      >
        {/* Clipping mask so lines stay inside the 180px viewport */}
        <defs>
          <clipPath id="ecg-clip">
            <rect x="0" y="0" width="180" height="60" />
          </clipPath>
        </defs>
        <g clipPath="url(#ecg-clip)">
          {/* Trace 1 */}
          <polyline
            points={trace1}
            fill="none"
            stroke="rgba(0,180,166,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'ecg-scroll 2.5s linear infinite' }}
          />
          {/* Trace 2 */}
          <polyline
            points={trace2}
            fill="none"
            stroke="rgba(0,180,166,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'ecg-scroll 2.5s linear infinite 0.8s' }}
          />
        </g>
      </svg>
    </div>
  )
}

export function HeroSection() {
  const { openBooking } = useBooking()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-cover Background Image — real onsite photos (exterior on desktop, entrance sign on mobile) */}
      <div className="absolute inset-0">
        <Image
          src="/images/sante/sante24-exterior-building-signage-blue-sky.jpg"
          alt="Santé 24hr Medical Centre & Maternity Hospital exterior, Southerton, Harare"
          fill
          priority
          quality={85}
          sizes="(min-width: 768px) 100vw, 1px"
          className="hidden md:block object-cover object-top"
        />
        <Image
          src="/images/sante/sante24-entrance-signboard-24hr-medical-centre.jpg"
          alt="Santé 24 Medical Centre entrance sign with 24hr badge, Harare"
          fill
          priority
          quality={85}
          sizes="(max-width: 767px) 100vw, 1px"
          className="md:hidden object-cover object-center"
        />
        {/* Desktop: left 40% stays bright (billboard), right 60% darkened for the headline */}
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.45)_100%)]" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-l from-[#003366]/70 via-[#003366]/30 to-transparent" />
        {/* Mobile: text sits over the whole image */}
        <div className="absolute inset-0 md:hidden bg-[#003366]/75" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00B4A6]/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-20">
        <div className="flex items-center md:justify-end min-h-[70vh]">
          {/* Content — right side on desktop so the billboard stays visible */}
          <div className="max-w-2xl md:max-w-xl lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00B4A6] animate-pulse" />
              Open 24/7 for Your Care
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight text-balance"
            >
              Your Health, Our Priority —{' '}
              <span className="text-[#00B4A6]">24 Hours a Day</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-xl"
            >
              Licensed 24-hour medical centre in Southerton, Harare, providing emergency care, diagnostics, surgery, and maternity services since 2016.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                onClick={() => openBooking()}
                size="lg"
                className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-[#00B4A6]/30"
              >
                Book an Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#003366] rounded-full px-8 py-6 text-base font-medium"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF6B6B] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Emergency Hotline — Open 24/7</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  <a href="tel:+263242620588" className="text-white font-heading font-bold text-lg hover:text-[#00B4A6] transition-colors">
                    0242 620588
                  </a>
                  <span className="text-white/50 font-heading font-bold text-lg">·</span>
                  <a href="tel:+263867715077" className="text-white font-heading font-bold text-lg hover:text-[#00B4A6] transition-colors">
                    0867 715 077
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transparent ECG — bottom-right corner */}
      <MiniECG />
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/components/booking-context'
import Link from 'next/link'

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
      {/* Full-cover Background Image - African doctor with patient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 via-[#003366]/85 to-[#003366]/70" />
        <div className="absolute inset-0 bg-black/20" />
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
        <div className="flex items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="max-w-2xl">
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
              Comprehensive medical care for every Harare family, every hour of the day.
              Modern facilities, expert doctors, compassionate service.
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
              <div className="w-12 h-12 rounded-full bg-[#FF6B6B] flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Emergency Hotline</p>
                <a href="tel:+263789158334" className="text-white font-heading font-bold text-lg hover:text-[#00B4A6] transition-colors">
                  +263 78 915 8334
                </a>
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

"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/components/booking-context'
import Link from 'next/link'

// ECG Wave Component
function ECGWave({ delay = 0, yPosition = 0, color = "#00B4A6" }: { delay?: number; yPosition?: number; color?: string }) {
  // Realistic ECG waveform path - P wave, QRS complex, T wave pattern
  const ecgPath = "M0,50 L30,50 L35,50 L40,45 L45,50 L50,50 L55,50 L60,50 L65,48 L70,52 L75,50 L80,50 L85,50 L90,60 L95,20 L100,80 L105,40 L110,50 L115,50 L120,50 L125,50 L130,45 L140,55 L150,50 L160,50 L180,50 L200,50"
  
  return (
    <div 
      className="absolute left-0 right-0 h-24 overflow-hidden"
      style={{ top: yPosition }}
    >
      {/* Gradient fade mask */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, transparent 0%, transparent 70%, rgba(0, 51, 102, 0.8) 85%, rgba(0, 51, 102, 1) 100%)`
        }}
      />
      
      <svg
        className="absolute h-full"
        style={{ width: '300%' }}
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`ecgGradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="50%" stopColor={color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          {/* Glow filter */}
          <filter id={`glow-${delay}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* ECG Line with animation */}
        <motion.g
          initial={{ x: -200 }}
          animate={{ x: [-200, -600] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: delay,
          }}
        >
          {/* Main ECG path - repeated 3 times for continuous effect */}
          <path
            d={ecgPath}
            fill="none"
            stroke={`url(#ecgGradient-${delay})`}
            strokeWidth="2.5"
            filter={`url(#glow-${delay})`}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={ecgPath}
            fill="none"
            stroke={`url(#ecgGradient-${delay})`}
            strokeWidth="2.5"
            filter={`url(#glow-${delay})`}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(200, 0)"
          />
          <path
            d={ecgPath}
            fill="none"
            stroke={`url(#ecgGradient-${delay})`}
            strokeWidth="2.5"
            filter={`url(#glow-${delay})`}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(400, 0)"
          />
        </motion.g>
      </svg>
      
      {/* Moving dot at the drawing point */}
      <motion.div
        className="absolute w-3 h-3 rounded-full z-20"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
          top: '50%',
          transform: 'translateY(-50%)',
          left: '65%'
        }}
        animate={{
          opacity: [1, 0.7, 1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export function HeroSection() {
  const { openBooking } = useBooking()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-cover Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85')`,
        }}
      >
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 via-[#003366]/85 to-[#003366]/70" />
        {/* Additional dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00B4A6]/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <div>
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
              Your Health, Our Priority — <span className="text-[#00B4A6]">24 Hours a Day</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-xl"
            >
              Comprehensive medical care for every Harare family, every hour of the day. Modern facilities, expert doctors, compassionate service.
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
                <p className="text-white font-heading font-bold text-lg">+263 242 XXX XXX</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated ECG Traces */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex flex-col justify-center h-[400px]"
          >
            {/* ECG Monitor Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#001a33]/50 backdrop-blur-sm">
              {/* Monitor scan line effect */}
              <motion.div
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 180, 166, 0.03) 50%, transparent 100%)',
                  height: '30%',
                }}
                animate={{ y: ['0%', '350%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Grid lines for monitor effect */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 180, 166, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 180, 166, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              
              {/* ECG Traces */}
              <ECGWave delay={0} yPosition={80} color="#00B4A6" />
              <ECGWave delay={2} yPosition={220} color="#00D4C4" />
              
              {/* Monitor Labels */}
              <div className="absolute top-4 left-4 text-[#00B4A6] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00B4A6] animate-pulse" />
                  <span>LEAD II</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-[#00B4A6] text-xs font-mono text-right">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  72 BPM
                </motion.span>
              </div>
              
              <div className="absolute bottom-20 left-4 text-[#00D4C4] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D4C4] animate-pulse" />
                  <span>LEAD V1</span>
                </div>
              </div>
              <div className="absolute bottom-20 right-4 text-[#00D4C4] text-xs font-mono text-right">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  SpO2 98%
                </motion.span>
              </div>
              
              {/* Bottom status bar */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#001a33]/80 border-t border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">NORMAL SINUS</span>
                  </div>
                </div>
                <div className="text-white/50 text-xs font-mono">
                  SANTE 24 MONITORING
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

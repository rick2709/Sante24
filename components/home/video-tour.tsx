"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export function VideoTour() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
    videoRef.current?.play()
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366]">
            Take a Tour of Santé24
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            See our facilities and the services we offer, right from where you are.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-border bg-[#003366]"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/videos/sante24-tour-poster.jpg"
            controls={isPlaying}
            playsInline
            preload="none"
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/sante24-tour.mp4" type="video/mp4" />
          </video>

          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play Santé24 tour video"
              className="group absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            >
              <span className="flex items-center justify-center w-20 h-20 rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-[#00B4A6] ml-1" fill="currentColor" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

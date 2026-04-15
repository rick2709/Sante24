"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Chiedza Mutambo',
    role: 'Patient',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    rating: 5,
    quote: 'Sante 24 provided exceptional care when my son needed emergency treatment. The doctors were professional and compassionate.',
  },
  {
    id: 2,
    name: 'Tatenda Zvimba',
    role: 'Patient',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    quote: 'The best medical center in Southerton. I appreciate the 24-hour service and the friendly staff who always make me feel welcome.',
  },
  {
    id: 3,
    name: 'Rumbidzai Nhemachena',
    role: 'Patient',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    quote: 'Dr. Chikwanda took excellent care of my children. I highly recommend Sante 24 for all families in Harare.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366]">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Hear from the families we&apos;ve had the privilege to serve.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-border relative"
            >
              <div className="absolute -top-4 left-6">
                <div className="w-10 h-10 rounded-full bg-[#00B4A6] flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading font-bold text-[#003366]">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const doctors = [
  {
    id: 'dr-moyo',
    name: 'Dr. Tendai Moyo',
    specialty: 'General Practitioner',
    experience: '12 years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    id: 'dr-chikwanda',
    name: 'Dr. Rudo Chikwanda',
    specialty: 'Paediatrician',
    experience: '8 years',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80',
  },
  {
    id: 'dr-mutasa',
    name: 'Dr. Farai Mutasa',
    specialty: 'Emergency Medicine',
    experience: '15 years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
  },
]

export function DoctorsPreview() {
  return (
    <section className="py-20 md:py-28">
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
            Meet Our Specialists
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Our team of experienced doctors is dedicated to providing you with the best possible care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={400}
                  height={450}
                  className="w-full h-[300px] md:h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#003366]">{doctor.name}</h3>
              <p className="text-[#00B4A6] font-medium text-sm">{doctor.specialty}</p>
              <p className="text-muted-foreground text-sm mt-1">{doctor.experience} of experience</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button 
            asChild
            size="lg"
            className="bg-[#003366] hover:bg-[#004d80] text-white rounded-full px-8"
          >
            <Link href="/doctors">
              View All Doctors
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'
import { 
  Stethoscope, 
  Siren, 
  Baby, 
  HeartPulse,
  Brain,
  Smile,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Stethoscope,
    name: 'General Medicine',
    description: 'Comprehensive primary care for adults including routine check-ups, diagnostics, and treatment.',
  },
  {
    icon: Siren,
    name: 'Emergency Care',
    description: '24/7 emergency services for urgent medical conditions. Our team is always ready.',
  },
  {
    icon: Baby,
    name: 'Maternal Health',
    description: 'Complete prenatal and postnatal care for mothers and newborns in a comfortable environment.',
  },
  {
    icon: HeartPulse,
    name: 'Paediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents with compassionate care.',
  },
  {
    icon: Brain,
    name: 'Mental Wellness',
    description: 'Professional mental health support including counseling and therapy services.',
  },
  {
    icon: Smile,
    name: 'Dental Care',
    description: 'Full range of dental services from routine cleaning to advanced procedures.',
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
            From routine check-ups to emergency care, our comprehensive medical services cover all your healthcare needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B4A6] transition-colors">
                  <Icon className="w-7 h-7 text-[#00B4A6] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#003366] mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-[#00B4A6] font-medium text-sm hover:gap-3 transition-all"
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

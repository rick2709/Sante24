"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Shield, Heart, Award, Target, Briefcase, Home, Users,
  ThumbsUp, Clock, TrendingUp, CheckCircle2
} from 'lucide-react'

const values = [
  { icon: Shield, title: 'Integrity', description: 'We uphold the highest ethical standards in all our medical practice and patient interactions.' },
  { icon: Heart, title: 'Respect', description: 'Every patient and staff member is treated with dignity and compassion, regardless of circumstances.' },
  { icon: Award, title: 'Excellence', description: 'We continuously strive to improve the quality of care we deliver to every patient.' },
  { icon: Target, title: 'Commitment', description: 'Dedicated to our patients\' wellbeing, we go above and beyond to deliver the care they need.' },
  { icon: Briefcase, title: 'Professionalism', description: 'Our medical team maintains the highest professional standards at all times.' },
  { icon: Home, title: 'Homeliness', description: 'We create a welcoming, warm environment where patients feel safe and cared for.' },
  { icon: Users, title: 'Team Work', description: 'Our multidisciplinary team collaborates to deliver the best possible patient outcomes.' },
  { icon: ThumbsUp, title: 'Good Customer Care', description: 'We prioritise patient satisfaction, ensuring every visit is a positive experience.' },
  { icon: Clock, title: 'Time Consciousness', description: 'We respect your time with efficient service and minimal unnecessary waiting.' },
  { icon: TrendingUp, title: 'Continuous Improvement', description: 'We invest in training, technology, and processes to keep raising the standard of care.' },
]

const whyChooseUs = [
  {
    title: 'Open 24 Hours, 365 Days a Year',
    description: 'Our doors never close. Whether it is a weekday morning or a public holiday midnight, our team is on duty and ready to help.',
  },
  {
    title: 'Licensed & Fully Accredited',
    description: 'We are licensed by the Health Professions Authority of Zimbabwe and registered with the Medical and Dental Practitioners\' Council of Zimbabwe.',
  },
  {
    title: 'Two Specialised Centres',
    description: 'Santé 24 houses both a general medical centre and a dedicated maternity hospital under one roof — covering every stage of life.',
  },
  {
    title: 'Modern, Fully Equipped Facility',
    description: 'From our operating theatre and procedure rooms to our in-house laboratory and ultrasound suite, we are equipped to handle a wide range of medical needs.',
  },
]

const facilityImages = [
  {
    src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80',
    alt: 'Reception area of Santé 24hr Medical Centre, Southerton, Harare',
    label: 'Reception',
  },
  {
    src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80',
    alt: 'Observation and procedure room at Santé 24hr Medical Centre',
    label: 'Procedure & Observation Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
    alt: 'Operating theatre at Santé 24hr Medical Centre, Harare',
    label: 'Operating Theatre',
  },
  {
    src: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80',
    alt: 'Ultrasound scanning room at Santé 24 Maternity Hospital',
    label: 'Ultrasound Suite',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#005599] pt-32 pb-20 grain-overlay">
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              About Santé 24
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Licensed, accredited, and proudly serving the Harare community since 19 October 2016.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome / About */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline mb-6">
                Who We Are
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Santé 24hr Medical Centre is licensed by the Health Professions Authority and the Medical and Dental Practitioners&apos; Council of Zimbabwe. Located at Shop 5, Southerton Shopping Centre on St Johns Way, Southerton, we have proudly served the Harare community since opening on 19 October 2016.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sante 24 is a fully kitted 24-hour medical centre featuring doctor consultation rooms, procedure rooms, and observation wards — providing round-the-clock care when you need it most. Under the same roof sits our dedicated Santé 24 Maternity Hospital, offering complete maternity services from antenatal care through to postnatal recovery.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80"
                  alt="Medical team at Santé 24hr Medical Centre, Southerton, Harare"
                  width={900}
                  height={600}
                  className="w-full h-[350px] md:h-[400px] object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-[#003366]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: 'Licensed by HPA Zimbabwe', sub: 'Health Professions Authority' },
              { label: 'Registered with MDPCZ', sub: 'Medical & Dental Practitioners\' Council' },
              { label: 'Operating Since 2016', sub: 'Opened 19 October 2016' },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="py-4"
              >
                <p className="font-heading font-bold text-white text-lg">{badge.label}</p>
                <p className="text-white/60 text-sm mt-1">{badge.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#00B4A6]/10 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#00B4A6]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#003366] mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed italic">
                &ldquo;To provide quality healthcare for the care, preservation and improvement of human life.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#003366]/10 flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-[#003366]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#003366] mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed italic">
                &ldquo;To provide comprehensive and friendly quality healthcare.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values — 10 items */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline">
              Our Core Values
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl">
              These ten principles guide every interaction and every decision at Santé 24.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="text-center p-5 bg-[#F7F9FC] rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#00B4A6]" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#003366] mb-1">{value.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline">
              Take a Look Inside Our Facility
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl">
              Our fully equipped facility at Southerton Shopping Centre is designed to deliver comprehensive care in a clean, modern, welcoming environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilityImages.map((img, index) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-2xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-[200px] md:h-[240px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/70 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-medium text-sm">{img.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline">
              Why Choose Santé 24
            </h2>
          </motion.div>

          <div className="space-y-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-[#F7F9FC] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-[#00B4A6] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#003366] mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

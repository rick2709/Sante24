"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Award, Users, Shield, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We treat every patient with empathy and understanding, recognizing that healthcare is deeply personal.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest standards in medical care, continuously improving our services and expertise.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description: 'Quality healthcare should be available to all. We provide 24/7 service to ensure care when you need it.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We maintain the highest ethical standards, ensuring transparency and trust in all our interactions.',
  },
]

const whyChooseUs = [
  {
    title: '24/7 Emergency Care',
    description: 'Our emergency department never closes. Whatever the hour, our dedicated team is ready to provide immediate care.',
  },
  {
    title: 'Experienced Specialists',
    description: 'Our team of doctors brings decades of combined experience across various medical specialties.',
  },
  {
    title: 'Modern Facilities',
    description: 'We invest in the latest medical technology and maintain a clean, comfortable environment for all patients.',
  },
  {
    title: 'Patient-Centered Care',
    description: 'Every treatment plan is tailored to your unique needs, ensuring personalized attention and better outcomes.',
  },
]

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
              About Sante 24
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Dedicated to providing exceptional healthcare to the Harare community, around the clock.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Sante 24, our mission is to provide accessible, high-quality healthcare to every family in Harare. 
                We believe that excellent medical care should be available whenever you need it, which is why we operate 
                24 hours a day, 7 days a week.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded with a vision to serve the Southerton community and surrounding areas, we have grown to become 
                a trusted healthcare partner for thousands of families. Our commitment to compassionate care and medical 
                excellence drives everything we do.
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
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=600&q=80"
                  alt="African medical team providing care"
                  width={600}
                  height={450}
                  className="w-full h-[350px] md:h-[400px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] mb-6">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Sante 24 was established in 2015 by a group of dedicated healthcare professionals who recognized 
              the need for reliable, round-the-clock medical services in Southerton and the greater Harare area. 
              What started as a small clinic has grown into a comprehensive medical center, serving over 10,000 
              patients annually.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our name, &quot;Sante,&quot; means &quot;health&quot; in French, reflecting our core commitment to the well-being 
              of our community. The &quot;24&quot; represents our promise to be there for you every hour of every day. 
              Today, we continue to expand our services and facilities to better serve the healthcare needs of 
              Zimbabwean families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
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
              These principles guide every interaction and decision at Sante 24.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00B4A6]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#00B4A6]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#003366] mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Medical Team
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl">
              Meet some of the dedicated professionals who make Sante 24 a trusted healthcare provider.
            </p>
          </motion.div>

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
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#003366]">{doctor.name}</h3>
                <p className="text-[#00B4A6] font-medium text-sm">{doctor.specialty}</p>
                <p className="text-muted-foreground text-sm mt-1">{doctor.experience} of experience</p>
              </motion.div>
            ))}
          </div>

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
              Why Choose Sante 24
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

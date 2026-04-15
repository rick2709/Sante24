"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Stethoscope, 
  Siren, 
  Baby, 
  HeartPulse,
  Brain,
  Smile,
  FlaskConical,
  Pill
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/components/booking-context'

const services = [
  {
    id: 'general',
    icon: Stethoscope,
    name: 'General Medicine',
    shortDesc: 'Comprehensive primary care for adults',
    description: 'Our general medicine department provides comprehensive primary healthcare services for adults. From routine check-ups and preventive care to diagnosing and treating common illnesses, our experienced general practitioners are here to address all your healthcare needs. We focus on building long-term relationships with our patients to better understand and manage their overall health.',
    features: [
      'Annual health check-ups',
      'Chronic disease management',
      'Preventive care and vaccinations',
      'Health screenings',
      'Minor illness treatment',
      'Referrals to specialists',
    ],
  },
  {
    id: 'emergency',
    icon: Siren,
    name: 'Emergency & Urgent Care',
    shortDesc: '24/7 emergency medical services',
    description: 'Our emergency department operates 24 hours a day, 7 days a week, providing immediate care for urgent medical conditions. Our team of emergency medicine specialists is equipped to handle everything from minor injuries to life-threatening emergencies. We understand that medical emergencies don\'t follow a schedule, which is why we\'re always ready to help.',
    features: [
      '24/7 availability',
      'Trauma care',
      'Cardiac emergencies',
      'Respiratory emergencies',
      'Accident & injury treatment',
      'Critical care monitoring',
    ],
  },
  {
    id: 'maternal',
    icon: Baby,
    name: 'Maternal & Child Health',
    shortDesc: 'Complete care for mothers and babies',
    description: 'We provide comprehensive prenatal, delivery, and postnatal care for expecting mothers. Our maternal health services are designed to ensure the well-being of both mother and baby throughout the pregnancy journey and beyond. Our experienced obstetricians and midwives offer personalized care in a comfortable, supportive environment.',
    features: [
      'Prenatal consultations',
      'Ultrasound services',
      'High-risk pregnancy management',
      'Labour and delivery support',
      'Postnatal care',
      'Newborn health assessments',
    ],
  },
  {
    id: 'paediatrics',
    icon: HeartPulse,
    name: 'Paediatrics',
    shortDesc: 'Specialized care for children',
    description: 'Our paediatric department specializes in the healthcare needs of infants, children, and adolescents. We create a child-friendly environment where young patients feel safe and comfortable. From routine check-ups and vaccinations to treating childhood illnesses, our paediatricians are dedicated to helping your children grow healthy and strong.',
    features: [
      'Well-child visits',
      'Childhood immunizations',
      'Growth monitoring',
      'Common childhood illness treatment',
      'Developmental assessments',
      'Nutrition counseling',
    ],
  },
  {
    id: 'mental',
    icon: Brain,
    name: 'Mental Wellness',
    shortDesc: 'Professional mental health support',
    description: 'Mental health is an essential part of overall well-being. Our mental wellness services provide professional support for a range of psychological concerns. We offer confidential counseling and therapy services in a safe, judgment-free environment. Our mental health professionals are committed to helping you navigate life\'s challenges.',
    features: [
      'Individual counseling',
      'Stress management',
      'Anxiety & depression treatment',
      'Grief counseling',
      'Family therapy',
      'Mental health assessments',
    ],
  },
  {
    id: 'dental',
    icon: Smile,
    name: 'Dental Care',
    shortDesc: 'Full range of dental services',
    description: 'Our dental department offers comprehensive oral health services for patients of all ages. From routine cleanings and check-ups to more advanced procedures, our qualified dentists ensure your smile stays healthy and bright. We use modern equipment and techniques to provide comfortable, effective dental care.',
    features: [
      'Dental check-ups',
      'Professional cleaning',
      'Fillings & restorations',
      'Tooth extractions',
      'Root canal treatment',
      'Dental X-rays',
    ],
  },
  {
    id: 'lab',
    icon: FlaskConical,
    name: 'Laboratory Services',
    shortDesc: 'Accurate diagnostic testing',
    description: 'Our on-site laboratory provides accurate, timely diagnostic testing to support your healthcare. From routine blood tests to specialized diagnostics, our certified laboratory technicians ensure reliable results. Quick turnaround times mean faster diagnoses and treatment decisions for you.',
    features: [
      'Blood tests',
      'Urine analysis',
      'Cholesterol screening',
      'Diabetes testing',
      'Infectious disease testing',
      'Pregnancy tests',
    ],
  },
  {
    id: 'pharmacy',
    icon: Pill,
    name: 'Pharmacy',
    shortDesc: 'Convenient on-site pharmacy',
    description: 'Our fully-stocked pharmacy is conveniently located within the medical center, making it easy to fill your prescriptions immediately after your consultation. Our pharmacists are available to answer your questions about medications and provide guidance on proper usage.',
    features: [
      'Prescription filling',
      'Over-the-counter medications',
      'Medication counseling',
      'Drug interaction checks',
      'Refill reminders',
      'Health supplements',
    ],
  },
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('general')
  const { openBooking } = useBooking()
  
  const currentService = services.find(s => s.id === activeService) || services[0]
  const Icon = currentService.icon

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
              Our Services
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare services tailored to meet all your medical needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 bg-[#F7F9FC] rounded-2xl p-4">
                <h3 className="font-heading font-bold text-lg text-[#003366] mb-4 px-2">Services</h3>
                <nav className="space-y-1">
                  {services.map((service) => {
                    const ServiceIcon = service.icon
                    return (
                      <button
                        key={service.id}
                        onClick={() => setActiveService(service.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          activeService === service.id
                            ? 'bg-[#00B4A6] text-white'
                            : 'text-[#003366] hover:bg-white'
                        }`}
                      >
                        <ServiceIcon className="w-5 h-5" />
                        <span className="font-medium text-sm">{service.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Mobile Service Selector */}
            <div className="lg:hidden">
              <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 no-scrollbar">
                {services.map((service) => {
                  const ServiceIcon = service.icon
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        activeService === service.id
                          ? 'bg-[#00B4A6] text-white'
                          : 'bg-[#F7F9FC] text-[#003366]'
                      }`}
                    >
                      <ServiceIcon className="w-4 h-4" />
                      <span className="font-medium text-sm whitespace-nowrap">{service.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Main Content */}
            <motion.main
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-[#00B4A6]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366]">
                      {currentService.name}
                    </h2>
                    <p className="text-muted-foreground mt-1">{currentService.shortDesc}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {currentService.description}
                </p>

                <h3 className="font-heading font-bold text-lg text-[#003366] mb-4">
                  What We Offer
                </h3>
                <ul className="grid md:grid-cols-2 gap-3 mb-8">
                  {currentService.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00B4A6]/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#00B4A6]" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => openBooking(undefined, currentService.id)}
                  size="lg"
                  className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-8"
                >
                  Book for {currentService.name}
                </Button>
              </div>
            </motion.main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#003366]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Not sure which service you need? Our team is here to help guide you to the right care.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-8"
            >
              <a href="tel:+26378XXXXXXX">Call Us: +263 78 XXX XXXX</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

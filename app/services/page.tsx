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
  Pill,
  Activity,
  Salad,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBooking } from '@/components/booking-context'

const services = [
  {
    id: 'general',
    icon: Stethoscope,
    name: 'General Medicine',
    shortDesc: 'Comprehensive primary care for all ages',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
    imageAlt: 'African doctor consulting a patient in general medicine',
    description:
      'Our general medicine department provides comprehensive primary care for patients of all ages. From routine check-ups and chronic disease management to acute illness treatment, our experienced GPs are your first point of contact for all health concerns. We believe in treating the whole person, not just the symptom. Our team works closely with patients to build long-term care plans that support lasting well-being.',
    features: [
      'Routine health check-ups',
      'Chronic disease management (hypertension, diabetes)',
      'Acute illness consultation',
      'Prescription & medication management',
      'Referrals to specialists',
      'Health screening programs',
    ],
  },
  {
    id: 'emergency',
    icon: Siren,
    name: 'Emergency & Urgent Care (24/7)',
    shortDesc: '24/7 emergency medical services',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80',
    imageAlt: 'Emergency medical team at Sante 24 hospital',
    description:
      'Our emergency unit is open 24 hours a day, 7 days a week, 365 days a year. Staffed by trained emergency physicians and nurses, we handle everything from minor injuries to life-threatening emergencies with speed, skill, and compassion. No appointment needed — walk in any time. Our rapid triage system ensures you receive care based on severity without unnecessary delay.',
    features: [
      'Trauma & injury treatment',
      'Cardiac emergencies',
      'Respiratory distress',
      'Stroke management',
      'Severe allergic reactions',
      'Paediatric emergencies',
    ],
  },
  {
    id: 'maternal',
    icon: Baby,
    name: 'Maternal & Child Health',
    shortDesc: 'Complete care for mothers and babies',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    imageAlt: 'African mother and newborn receiving maternal care',
    description:
      'We offer complete maternal health services from preconception counselling through postnatal care. Our dedicated maternal health team supports mothers through every stage of pregnancy with compassion and clinical excellence. We provide a safe, nurturing environment where both mother and child receive personalised attention from our experienced midwives and obstetricians.',
    features: [
      'Antenatal care & monitoring',
      'Labour & delivery support',
      'Postnatal mother & baby check-ups',
      'Family planning counselling',
      'High-risk pregnancy management',
      'Breastfeeding support',
    ],
  },
  {
    id: 'paediatrics',
    icon: HeartPulse,
    name: 'Paediatrics',
    shortDesc: 'Specialized care for children',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80',
    imageAlt: 'African paediatrician examining a child',
    description:
      'Our paediatric department specialises in the health and wellbeing of children from newborns to adolescents. Our friendly, child-centred approach puts both children and parents at ease while delivering the highest standard of medical care. We track each child\'s growth and development milestones to catch any issues early, and parents are welcomed as active partners throughout.',
    features: [
      'Newborn screening & care',
      'Immunisation & vaccinations',
      'Growth & development monitoring',
      'Childhood illness treatment',
      'Nutritional assessments',
      'School health certificates',
    ],
  },
  {
    id: 'mental',
    icon: Brain,
    name: 'Mental Wellness',
    shortDesc: 'Professional mental health support',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    imageAlt: 'African mental health counsellor in a session',
    description:
      'Mental health is health. Our mental wellness clinic provides confidential, judgment-free support for adults and adolescents. We understand the cultural context of mental health in Zimbabwe and offer care sensitive to our community\'s unique needs. Our counsellors help patients build resilience, process trauma, and develop healthy coping strategies.',
    features: [
      'Depression & anxiety counselling',
      'Stress management therapy',
      'Trauma & grief support',
      'Substance use counselling',
      'Adolescent mental health',
      'Referral to psychiatric specialists',
    ],
  },
  {
    id: 'dental',
    icon: Smile,
    name: 'Dental Care',
    shortDesc: 'Full range of dental services',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    imageAlt: 'African dentist examining a patient',
    description:
      'Our dental clinic offers a full range of general and cosmetic dentistry services in a comfortable, modern environment. Our dentists use the latest techniques to ensure your dental visits are as pain-free and efficient as possible. We treat patients of all ages and provide both preventive and restorative dental care for a lifetime of healthy smiles.',
    features: [
      'Routine dental check-ups & cleaning',
      'Tooth extractions',
      'Fillings & restorations',
      'Root canal treatment',
      'Teeth whitening',
      'Dental X-rays',
    ],
  },
  {
    id: 'lab',
    icon: FlaskConical,
    name: 'Laboratory Services',
    shortDesc: 'Accurate same-day diagnostic testing',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    imageAlt: 'Laboratory technician processing samples at Sante 24',
    description:
      'Our in-house laboratory provides fast, accurate diagnostic testing, with most results available same-day. Our state-of-the-art equipment and qualified laboratory scientists ensure reliable results without the long wait. Accurate diagnostics are the foundation of effective treatment, and our lab supports every department with rapid turnaround on all key tests.',
    features: [
      'Full blood count (FBC)',
      'HIV & STI testing',
      'Malaria rapid diagnostic test',
      'Blood glucose & HbA1c',
      'Liver & kidney function panels',
      'Urinalysis & pregnancy tests',
    ],
  },
  {
    id: 'pharmacy',
    icon: Pill,
    name: 'Pharmacy',
    shortDesc: 'Convenient on-site pharmacy',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    imageAlt: 'African pharmacist dispensing medication',
    description:
      'Our on-site pharmacy is stocked with a comprehensive range of prescription and over-the-counter medications. Our qualified pharmacists provide expert medication counselling and ensure you leave with the right medicine at the right dose. Located within the clinic, the pharmacy allows patients to fill prescriptions immediately after consultation.',
    features: [
      'Prescription dispensing',
      'Over-the-counter medicines',
      'Chronic medication management',
      'Medication counselling & education',
      'Vaccine storage & administration',
      'Medical supply & equipment',
    ],
  },
  {
    id: 'physio',
    icon: Activity,
    name: 'Physiotherapy & Rehabilitation',
    shortDesc: 'Recovery and mobility restoration',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    imageAlt: 'African physiotherapist working with a patient',
    description:
      'Our physiotherapy department helps patients recover from injuries, surgeries, and chronic pain conditions. Our qualified physiotherapists create personalised treatment plans to restore strength, mobility, and quality of life. Whether recovering from a sports injury, surgery, or neurological event, our rehabilitation specialists guide every step of your recovery.',
    features: [
      'Post-surgical rehabilitation',
      'Sports injury treatment',
      'Back & neck pain management',
      'Stroke rehabilitation',
      'Paediatric physiotherapy',
      'Electrotherapy & ultrasound therapy',
    ],
  },
  {
    id: 'nutrition',
    icon: Salad,
    name: 'Nutrition & Dietetics',
    shortDesc: 'Personalised nutrition and diet plans',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    imageAlt: 'African dietitian advising on healthy nutrition',
    description:
      'Good nutrition is the foundation of good health. Our registered dietitian provides personalised nutrition plans for individuals managing chronic diseases, weight challenges, or seeking to optimise their overall health through diet. We take a practical, culturally aware approach — working with the foods you love and the lifestyle you live.',
    features: [
      'Diabetes meal planning',
      'Weight management programmes',
      'Malnutrition assessment & support',
      'Maternal & infant nutrition',
      'Sports nutrition',
      'Cholesterol & heart health diets',
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
              Comprehensive healthcare services tailored to meet all your medical needs — 24 hours a day, 7 days a week.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Mobile Service Selector — full-width strip above the grid */}
          <div className="lg:hidden mb-6">
            <div className="flex overflow-x-auto gap-2 pb-3 no-scrollbar">
              {services.map((service) => {
                const ServiceIcon = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                      activeService === service.id
                        ? 'bg-[#00B4A6] text-white border-[#00B4A6]'
                        : 'bg-white text-[#003366] border-border hover:border-[#00B4A6]'
                    }`}
                  >
                    <ServiceIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-sm whitespace-nowrap">{service.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">

            {/* Sidebar — Desktop only */}
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
                        <ServiceIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{service.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <motion.main
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                {/* Service Image */}
                <div className="w-full h-56 md:h-72 overflow-hidden">
                  <img
                    src={currentService.image}
                    alt={currentService.imageAlt}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80'
                    }}
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#00B4A6]" />
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
                    What&apos;s Included
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3 mb-8">
                    {currentService.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00B4A6]/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#00B4A6]" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => openBooking(undefined, currentService.id)}
                    size="lg"
                    className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-8"
                  >
                    Book this Service
                  </Button>
                </div>
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
              <a href="tel:+263789158334">Call Us: +263 78 915 8334</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

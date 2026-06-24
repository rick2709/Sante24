"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Siren,
  FlaskConical,
  Scissors,
  UserCheck,
  Baby,
  HeartPulse,
  Stethoscope,
  ScanLine,
  Users,
} from 'lucide-react'

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const medicalServices = [
  {
    id: 'emergency-general',
    icon: Siren,
    name: '24-Hour Emergency & General Care',
    shortDesc: 'Walk-in emergency and general consultation — always open',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80',
    imageAlt: 'Emergency care team at Santé 24hr Medical Centre, Harare',
    description:
      'Our emergency and general care unit operates 24 hours a day, 7 days a week, 365 days a year. Staffed by experienced doctors and nurses, we handle everything from walk-in consultations and minor ailments to life-threatening emergencies with speed and skill. Our rapid triage system ensures patients receive care based on clinical priority, with no unnecessary delay. No appointment is ever needed — simply walk in.',
    features: [
      'Walk-in consultations at any hour',
      'Emergency response and stabilisation',
      'Fully equipped consultation rooms',
      'Observation wards with nursing care',
      'Minor procedures and wound care',
      'Pre-employment medicals',
    ],
    maternity: false,
  },
  {
    id: 'diagnostics',
    icon: FlaskConical,
    name: 'Diagnostic & Laboratory Services',
    shortDesc: 'On-site lab, X-ray, ultrasound — fast, accurate results',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    imageAlt: 'Laboratory technician processing samples at Santé 24hr Medical Centre',
    description:
      'Our in-house diagnostic centre provides comprehensive testing services, with most results available the same day. We operate a modern laboratory alongside X-ray and ultrasound facilities — including Doppler studies — to support accurate, timely diagnosis. Our qualified laboratory scientists ensure reliable results, and our team works efficiently to minimise the time between your consultation and your diagnosis.',
    features: [
      'Full blood count and blood panels',
      'HIV, STI, and malaria rapid testing',
      'Blood glucose, HbA1c, and diabetes panels',
      'Digital X-ray imaging',
      'Ultrasound including Doppler studies',
      'Pre-employment medicals and certificates',
    ],
    maternity: false,
  },
  {
    id: 'theatre',
    icon: Scissors,
    name: 'Operating Theatre & Surgical Procedures',
    shortDesc: 'Fully equipped theatre for minor and major surgery',
    image: 'https://imgs.search.brave.com/L8i7T5M6wKALNlDUA8GDF-6WsuAeSYY1Rcqjq-ECUUk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzliL1Ro/YWlsYW5kX05vbnRo/YWJ1cmlfJUUwJUI4/JUE4JUUwJUI4JUI5/JUUwJUI4JTk5JUUw/JUI4JUEyJUUwJUI5/JThDJUUwJUI4JTgx/JUUwJUI4JUIyJUUw/JUI4JUEzJUUwJUI5/JTgxJUUwJUI4JTlF/JUUwJUI4JTk3JUUw/JUI4JUEyJUUwJUI5/JThDJUUwJUI4JTlC/JUUwJUI4JUIxJUUw/JUI4JThEJUUwJUI4/JThEJUUwJUI4JUIy/JUUwJUI4JTk5JUUw/JUI4JUIxJUUwJUI4/JTk5JUUwJUI4JTk3/JUUwJUI4JUEwJUUw/JUI4JUI0JUUwJUI4/JTgxJUUwJUI4JTgy/JUUwJUI4JUI4XyVF/MCVCOCU4QSVFMCVC/OCVBNSVFMCVCOCU5/QiVFMCVCOCVBMyVF/MCVCOCVCMCVFMCVC/OCU5NyVFMCVCOCVC/MiVFMCVCOCU5OV8l/MjglRTAlQjglOTgl/RTAlQjglQjElRTAl/QjglOTklRTAlQjgl/QTclRTAlQjglQjIl/RTAlQjglODQlRTAl/QjglQTFfMjAyMiUy/OV9vcGVyYXRpbmdf/cm9vbS5qcGcvMTI4/MHB4LXRodW1ibmFp/bC5qcGc',
    imageAlt: 'Surgical team in the operating theatre at Santé 24hr Medical Centre',
    description:
      'Santé 24 houses a fully equipped operating theatre capable of handling both minor and major surgical procedures. Our sterile procedure rooms, professional anaesthesia support, and dedicated recovery care ensure patient safety and comfort throughout. Whether your procedure is planned or urgent, our surgical team is on hand to deliver expert care in a properly equipped environment.',
    features: [
      'Fully equipped operating theatre',
      'Minor and major surgical procedures',
      'Sterile procedure rooms',
      'Professional anaesthesia support',
      'Post-surgical recovery care',
      'Wound management and follow-up',
    ],
    maternity: false,
  },
  {
    id: 'specialist',
    icon: UserCheck,
    name: 'Specialist Consultations',
    shortDesc: 'Multi-discipline specialist access and referrals',
    image: 'https://imgs.search.brave.com/qfJWffup35ABFZmvhcQqdY_ZgQM2yMfusXOCQJn5OgE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc2/NjYwMzI5Ni9waG90/by9ibGFjay13b21h/bi1wYXRpZW50LWFu/ZC1kb2N0b3Itd2l0/aC1zbWlsZS1jb25z/dWx0YXRpb24tYW5k/LWhlYXJ0LWVtb2pp/LWZvci1jYXJkaW8t/aGVhbHRoLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1ndTVx/Yy1FeTVsRDNSQkpI/dU5hZnRGYXliZDcz/OFc5QlFZejNNT1NK/SlVRPQ',
    imageAlt: 'Specialist physician consulting a patient at Santé 24hr Medical Centre',
    description:
      'We provide access to a range of specialist consultations across multiple medical disciplines, either directly at our facility or through our referral network. Whether you need a second opinion, specialist follow-up, or a formal referral, our team coordinates your care to ensure continuity and the best clinical outcome.',
    features: [
      'Multi-discipline specialist access',
      'Formal referral letters and coordination',
      'Follow-up consultation management',
      'Second opinions',
      'Chronic disease specialist support',
      'Results interpretation and care planning',
    ],
    maternity: false,
  },
]

const maternityServices = [
  {
    id: 'antenatal',
    icon: Baby,
    name: 'Antenatal & Postnatal Care',
    shortDesc: 'Complete care for mothers throughout pregnancy and after delivery',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOA1RsOkri5FQSyG4VYCaED2bD7baj2C6RF-7fGzItQA&s=10',
    imageAlt: 'African mother receiving antenatal care at Santé 24 Maternity Hospital',
    description:
      'Our maternity team provides comprehensive antenatal monitoring and postnatal support for every mother. From your first trimester through to your postnatal recovery, we offer scheduled check-ups, nutritional guidance, high-risk pregnancy management, and responsive care whenever concerns arise. Our postnatal programme ensures both mother and newborn are thriving before, during, and after discharge.',
    features: [
      'Scheduled antenatal check-ups',
      'Foetal monitoring and growth scans',
      'High-risk pregnancy management',
      'Nutritional and lifestyle guidance',
      'Postnatal mother and baby assessments',
      'Breastfeeding support and advice',
    ],
    maternity: true,
  },
  {
    id: 'labour',
    icon: HeartPulse,
    name: 'Labour & Delivery',
    shortDesc: 'Normal delivery and C-section in a dedicated maternity theatre',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    imageAlt: 'Maternity theatre at Santé 24 Maternity Hospital, Southerton, Harare',
    description:
      'Santé 24 Maternity Hospital provides 24-hour labour and delivery services, with a dedicated maternity theatre for both normal deliveries and C-sections. Our experienced midwives and obstetricians support every mother through labour, ensuring a safe, monitored, and compassionate delivery experience. Recovery rooms are available for mothers and newborns to rest and bond in comfort following delivery.',
    features: [
      '24-hour midwifery support during labour',
      'Natural and assisted normal deliveries',
      'Elective and emergency C-section capability',
      'Dedicated maternity theatre',
      'Foetal monitoring during labour',
      'Comfortable recovery rooms',
    ],
    maternity: true,
  },
  {
    id: 'gynae',
    icon: Stethoscope,
    name: 'Gynaecology & Obstetrics',
    shortDesc: 'Specialist care for women\'s reproductive health',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGKVUWXXAxD8JbIu3MmBzRQAgxvzdZzTr8dsiZhhOESw&s=10',
    imageAlt: 'Gynaecologist consulting a patient at Santé 24 Maternity Hospital',
    description:
      'Our gynaecology and obstetrics service offers specialist care for women at every stage of reproductive health. From routine gynaecological examinations and contraception management to complex obstetric conditions and surgical gynaecological procedures, our specialists provide evidence-based, compassionate care. We treat a wide range of conditions including PCOS, fibroids, endometriosis, and menstrual disorders.',
    features: [
      'Routine gynaecological examinations',
      'Obstetric specialist assessments',
      'Management of PCOS, fibroids, and endometriosis',
      'Menstrual health and hormonal management',
      'Cervical screening (Pap smear)',
      'Gynaecological surgical procedures',
    ],
    maternity: true,
  },
  {
    id: 'ultrasound',
    icon: ScanLine,
    name: 'Ultrasound Scanning with Doppler Studies',
    shortDesc: 'Advanced obstetric and diagnostic ultrasound with Doppler',
    image: 'https://cdn11.bigcommerce.com/s-j7315y43lw/product_images/uploaded_images/a1ybtzqyg1w84vy20vykd7zazrtllr1g1662488600.jpg',
    imageAlt: 'Ultrasound scan being performed at Santé 24 Maternity Hospital',
    description:
      'Our ultrasound suite offers advanced scanning services for both obstetric and general diagnostic purposes. We use modern equipment to provide detailed foetal assessments, Doppler blood flow studies, abdominal scans, and soft tissue imaging. Results are interpreted by experienced clinicians and reported promptly to ensure timely clinical decision-making.',
    features: [
      'First, second, and third trimester foetal scans',
      'Anomaly and growth scans',
      'Doppler blood flow studies',
      'Abdominal and pelvic ultrasound',
      'Soft tissue and musculoskeletal imaging',
      'Prompt written reports',
    ],
    maternity: true,
  },
  {
    id: 'family-planning',
    icon: Users,
    name: 'Family Planning Services',
    shortDesc: 'Confidential counselling and contraception support',
    image: 'https://aar-healthcare.ug/wp-content/uploads/2025/04/Family-Planning-Services.jpg',
    imageAlt: 'Family planning consultation at Santé 24 Maternity Hospital, Harare',
    description:
      'Our family planning service provides confidential, non-judgmental counselling and contraception management for couples and individuals. We offer a full range of modern contraceptive options and guidance to help patients make informed, empowered decisions about their reproductive health. Our team takes a culturally sensitive and practical approach tailored to each patient\'s circumstances.',
    features: [
      'Confidential family planning counselling',
      'Short and long-term contraception options',
      'Implant and IUD insertion and removal',
      'Injectable contraception',
      'Oral contraceptive prescriptions',
      'Reproductive health education',
    ],
    maternity: true,
  },
]

const allServices = [...medicalServices, ...maternityServices]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('emergency-general')

  const currentService = allServices.find(s => s.id === activeService) || allServices[0]
  const Icon = currentService.icon
  const accent = currentService.maternity ? '#7F77DD' : '#00B4A6'

  const waMessage = encodeURIComponent(
    `Hello Santé 24hr Medical Centre! I would like to enquire about / book an appointment for: ${currentService.name}.`
  )

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
              General medical care and dedicated maternity services — 24 hours a day, every day of the year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Mobile Service Selector */}
          <div className="lg:hidden mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#003366] mb-2 px-1">Medical Centre</p>
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
              {medicalServices.map((service) => {
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
            <p className="text-xs font-bold uppercase tracking-wider text-[#7F77DD] mb-2 mt-4 px-1">Maternity Hospital</p>
            <div className="flex overflow-x-auto gap-2 pb-3 no-scrollbar">
              {maternityServices.map((service) => {
                const ServiceIcon = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                      activeService === service.id
                        ? 'text-white border-[#7F77DD]'
                        : 'bg-white text-[#7F77DD] border-border hover:border-[#7F77DD]'
                    }`}
                    style={activeService === service.id ? { backgroundColor: '#7F77DD' } : {}}
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
            <aside className="hidden lg:block" id="medical-centre">
              <div className="sticky top-28 bg-[#F7F9FC] rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#003366] mb-3 px-2">Medical Centre</p>
                <nav className="space-y-1 mb-4">
                  {medicalServices.map((service) => {
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

                <div className="border-t border-border pt-4" id="maternity">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7F77DD] mb-3 px-2">Santé 24 Maternity Hospital</p>
                  <nav className="space-y-1">
                    {maternityServices.map((service) => {
                      const ServiceIcon = service.icon
                      return (
                        <button
                          key={service.id}
                          onClick={() => setActiveService(service.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                            activeService === service.id
                              ? 'text-white'
                              : 'text-[#7F77DD] hover:bg-white'
                          }`}
                          style={activeService === service.id ? { backgroundColor: '#7F77DD' } : {}}
                        >
                          <ServiceIcon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm">{service.name}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>
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
                  {currentService.maternity && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                      style={{ backgroundColor: '#7F77DD20', color: '#7F77DD' }}
                    >
                      Santé 24 Maternity Hospital
                    </div>
                  )}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${accent}1A` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: accent }} />
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
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${accent}20` }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/263780642725?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white font-medium text-base px-8 py-4 rounded-full transition-colors"
                    style={{ backgroundColor: accent }}
                  >
                    <WhatsAppIcon />
                    Enquire / Book via WhatsApp
                  </a>
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
              Need Help or Have a Question?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Call us any time — our team is available 24 hours a day, 7 days a week, 365 days a year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+263242620588"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#003366] font-medium px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                Call 0242 620588
              </a>
              <a
                href="tel:+263867715077"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-colors border border-white/20"
              >
                Call 0867 715 077
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

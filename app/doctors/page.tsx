"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, X, Calendar, GraduationCap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBooking } from '@/components/booking-context'

const doctors = [
  {
    id: 'dr-moyo',
    name: 'Dr. Tendai Moyo',
    specialty: 'General Practitioner',
    experience: '12 years',
    qualifications: 'MBChB (UZ), MPH',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    bio: 'Dr. Tendai Moyo is a highly experienced general practitioner with over 12 years of experience in primary healthcare. She completed her medical degree at the University of Zimbabwe and holds a Master\'s in Public Health. Dr. Moyo is known for her compassionate approach and commitment to preventive care.',
    specializations: ['Chronic Disease Management', 'Preventive Care', 'Health Screenings'],
    languages: ['English', 'Shona'],
  },
  {
    id: 'dr-chikwanda',
    name: 'Dr. Rudo Chikwanda',
    specialty: 'Paediatrician',
    experience: '8 years',
    qualifications: 'MBChB (UZ), DCH',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80',
    bio: 'Dr. Rudo Chikwanda specializes in paediatric care, with a focus on child development and childhood illnesses. She has dedicated her career to ensuring children in Harare receive the best possible healthcare. Her gentle demeanor makes her a favorite among young patients.',
    specializations: ['Child Development', 'Vaccination Programs', 'Childhood Illnesses'],
    languages: ['English', 'Shona', 'Ndebele'],
  },
  {
    id: 'dr-mutasa',
    name: 'Dr. Farai Mutasa',
    specialty: 'Emergency Medicine',
    experience: '15 years',
    qualifications: 'MBChB (UZ), FCEM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    bio: 'Dr. Farai Mutasa leads our emergency department with 15 years of experience in acute care and trauma medicine. He has trained in emergency medicine both locally and internationally, bringing world-class expertise to Sante 24. His quick decision-making has saved countless lives.',
    specializations: ['Trauma Care', 'Cardiac Emergencies', 'Critical Care'],
    languages: ['English', 'Shona'],
  },
  {
    id: 'dr-ncube',
    name: 'Dr. Simba Ncube',
    specialty: 'Cardiologist',
    experience: '10 years',
    qualifications: 'MBChB (UZ), MMed (Cardiology)',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    bio: 'Dr. Simba Ncube is our specialist in cardiovascular health. With advanced training in cardiology, he provides comprehensive care for heart conditions, from prevention to treatment. He is passionate about educating patients on heart-healthy lifestyles.',
    specializations: ['Heart Disease Prevention', 'ECG & Stress Testing', 'Hypertension Management'],
    languages: ['English', 'Ndebele', 'Shona'],
  },
  {
    id: 'dr-dziva',
    name: 'Dr. Nyasha Dziva',
    specialty: 'Obstetrician & Gynaecologist',
    experience: '9 years',
    qualifications: 'MBChB (UZ), MMed (O&G)',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    bio: 'Dr. Nyasha Dziva provides expert care in women\'s health and maternal care. She is passionate about supporting women through every stage of life, from adolescence through pregnancy to menopause. Her caring approach has helped hundreds of mothers deliver safely.',
    specializations: ['Prenatal Care', 'High-Risk Pregnancies', 'Women\'s Health'],
    languages: ['English', 'Shona'],
  },
  {
    id: 'dr-mapfumo',
    name: 'Dr. Tafadzwa Mapfumo',
    specialty: 'Dentist',
    experience: '7 years',
    qualifications: 'BDS (UZ)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    bio: 'Dr. Tafadzwa Mapfumo heads our dental department, providing comprehensive oral health services. He believes that a healthy smile contributes to overall well-being and works to make dental visits a positive experience for all patients, especially those with dental anxiety.',
    specializations: ['General Dentistry', 'Restorative Procedures', 'Oral Health Education'],
    languages: ['English', 'Shona'],
  },
]

const specialties = [
  'All Specialties',
  'General Practitioner',
  'Paediatrician',
  'Emergency Medicine',
  'Cardiologist',
  'Obstetrician & Gynaecologist',
  'Dentist',
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  const { openBooking } = useBooking()

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

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
              Our Doctors
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Meet our team of experienced healthcare professionals dedicated to your well-being.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-border sticky top-14 md:top-[72px] bg-white z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full border-border"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full sm:w-[220px] rounded-full">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="relative h-[280px]">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-bold text-xl text-[#003366] mb-1">{doctor.name}</h3>
                      <p className="text-[#00B4A6] font-medium text-sm mb-2">{doctor.specialty}</p>
                      <p className="text-muted-foreground text-sm mb-3">{doctor.qualifications}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">{doctor.experience} experience</span>
                        <Button 
                          size="sm"
                          className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full text-xs px-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            openBooking(doctor.id)
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Doctor Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="relative h-[250px] md:h-[300px]">
                <Image
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366] to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">{selectedDoctor.name}</h2>
                  <p className="text-[#00B4A6] font-medium">{selectedDoctor.specialty}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-[#00B4A6]" />
                    {selectedDoctor.experience} experience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-[#00B4A6]" />
                    {selectedDoctor.qualifications}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedDoctor.bio}
                </p>

                <div className="mb-6">
                  <h3 className="font-heading font-bold text-[#003366] mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.specializations.map((spec) => (
                      <span 
                        key={spec}
                        className="px-3 py-1 bg-[#00B4A6]/10 text-[#00B4A6] rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-heading font-bold text-[#003366] mb-3">Languages</h3>
                  <p className="text-muted-foreground">{selectedDoctor.languages.join(', ')}</p>
                </div>

                <Button 
                  onClick={() => {
                    setSelectedDoctor(null)
                    openBooking(selectedDoctor.id)
                  }}
                  className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full py-6"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book with {selectedDoctor.name.split(' ')[0]}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

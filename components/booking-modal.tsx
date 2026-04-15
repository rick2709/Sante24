"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBooking } from './booking-context'

const doctors = [
  { id: 'dr-moyo', name: 'Dr. Tendai Moyo', specialty: 'General Practitioner' },
  { id: 'dr-chikwanda', name: 'Dr. Rudo Chikwanda', specialty: 'Paediatrician' },
  { id: 'dr-mutasa', name: 'Dr. Farai Mutasa', specialty: 'Emergency Medicine' },
  { id: 'dr-ncube', name: 'Dr. Simba Ncube', specialty: 'Cardiologist' },
  { id: 'dr-dziva', name: 'Dr. Nyasha Dziva', specialty: 'Obstetrician & Gynaecologist' },
  { id: 'dr-mapfumo', name: 'Dr. Tafadzwa Mapfumo', specialty: 'Dentist' },
]

const services = [
  { id: 'general', name: 'General Medicine' },
  { id: 'emergency', name: 'Emergency Care' },
  { id: 'maternal', name: 'Maternal & Child Health' },
  { id: 'paediatrics', name: 'Paediatrics' },
  { id: 'mental', name: 'Mental Wellness' },
  { id: 'dental', name: 'Dental Care' },
  { id: 'lab', name: 'Laboratory Services' },
  { id: 'pharmacy', name: 'Pharmacy' },
]

export function BookingModal() {
  const { isOpen, closeBooking, preselectedDoctor, preselectedService } = useBooking()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    doctor: preselectedDoctor || '',
    service: preselectedService || '',
    date: '',
    time: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      closeBooking()
      setFormData({
        fullName: '',
        phone: '',
        doctor: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      })
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003366] to-[#005599] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00B4A6] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white">Book Appointment</h2>
                    <p className="text-white/70 text-sm">Schedule your visit to Sante 24</p>
                  </div>
                </div>
                <button
                  onClick={closeBooking}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#003366] mb-2">
                      Appointment Requested!
                    </h3>
                    <p className="text-muted-foreground">
                      We&apos;ll contact you shortly to confirm your booking.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="fullName" className="text-[#003366]">Full Name</Label>
                        <Input
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="mt-1.5 rounded-xl border-border focus:ring-[#00B4A6] focus:border-[#00B4A6]"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="phone" className="text-[#003366]">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+263 7X XXX XXXX"
                          className="mt-1.5 rounded-xl border-border focus:ring-[#00B4A6] focus:border-[#00B4A6]"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <Label className="text-[#003366]">Select Doctor</Label>
                        <Select 
                          value={formData.doctor || preselectedDoctor || ''} 
                          onValueChange={(value) => setFormData({ ...formData, doctor: value })}
                        >
                          <SelectTrigger className="mt-1.5 rounded-xl">
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <Label className="text-[#003366]">Select Service</Label>
                        <Select 
                          value={formData.service || preselectedService || ''} 
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger className="mt-1.5 rounded-xl">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="date" className="text-[#003366]">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="mt-1.5 rounded-xl border-border focus:ring-[#00B4A6] focus:border-[#00B4A6]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="time" className="text-[#003366]">Preferred Time</Label>
                        <Input
                          id="time"
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="mt-1.5 rounded-xl border-border focus:ring-[#00B4A6] focus:border-[#00B4A6]"
                        />
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="notes" className="text-[#003366]">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any symptoms or information you'd like to share..."
                          className="mt-1.5 rounded-xl border-border focus:ring-[#00B4A6] focus:border-[#00B4A6] min-h-[80px]"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full py-6 text-base font-medium"
                    >
                      Request Appointment
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

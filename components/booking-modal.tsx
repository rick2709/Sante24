"use client"

import { useState, useEffect } from 'react'
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

const departments = [
  { id: 'emergency-general', name: '24-Hour Emergency & General Care' },
  { id: 'diagnostics', name: 'Diagnostic & Laboratory Services' },
  { id: 'theatre', name: 'Operating Theatre & Surgical Procedures' },
  { id: 'specialist', name: 'Specialist Consultations' },
  { id: 'antenatal', name: 'Antenatal & Postnatal Care' },
  { id: 'labour', name: 'Labour & Delivery' },
  { id: 'gynae', name: 'Gynaecology & Obstetrics' },
  { id: 'ultrasound', name: 'Ultrasound Scanning with Doppler' },
  { id: 'family-planning', name: 'Family Planning Services' },
]

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '20:00', '22:00',
]

const todayDate = () => new Date().toISOString().split('T')[0]

export function BookingModal() {
  const { isOpen, closeBooking, preselectedService } = useBooking()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    department: '',
    date: '',
    time: '',
    notes: '',
  })

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false)
      setErrors({})
      setFormData(prev => ({
        ...prev,
        department: preselectedService || prev.department,
      }))
    }
  }, [isOpen, preselectedService])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.department) newErrors.department = 'Please select a department or service'
    if (!formData.date) newErrors.date = 'Please select a date'
    if (!formData.time) newErrors.time = 'Please select a time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const deptName = departments.find(d => d.id === formData.department)?.name || formData.department

    const message =
      `Hello Santé 24hr Medical Centre!\n\nI would like to book an appointment with the following details:\n\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `🏥 Department / Service: ${deptName}\n` +
      `📅 Date: ${formData.date}\n` +
      `⏰ Time: ${formData.time}\n` +
      `📝 Notes: ${formData.notes || 'None'}\n\n` +
      `Please confirm my appointment. Thank you!`

    window.open(`https://wa.me/263780642725?text=${encodeURIComponent(message)}`, '_blank')
    setIsSubmitted(true)
  }

  const handleClose = () => {
    closeBooking()
    setTimeout(() => {
      setIsSubmitted(false)
      setErrors({})
      setFormData({ fullName: '', phone: '', department: '', date: '', time: '', notes: '' })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003366] to-[#005599] px-6 py-5 rounded-t-2xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00B4A6] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white">Book Appointment</h2>
                    <p className="text-white/70 text-sm">Schedule your visit to Santé 24</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto rounded-b-2xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00B4A6]/10 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-[#00B4A6]" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-[#003366] mb-2">
                      Booking Sent to WhatsApp!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your booking request has been sent. Our team will confirm shortly.
                    </p>
                    <Button
                      onClick={handleClose}
                      className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-8"
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="fullName" className="text-[#003366]">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className={`mt-1.5 rounded-xl ${errors.fullName ? 'border-red-500 ring-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="phone" className="text-[#003366]">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+263 7X XXX XXXX"
                          className={`mt-1.5 rounded-xl ${errors.phone ? 'border-red-500 ring-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div className="col-span-2">
                        <Label className="text-[#003366]">Select Department / Service *</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
                          <SelectTrigger className={`mt-1.5 rounded-xl ${errors.department ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Choose a department or service" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                      </div>

                      <div>
                        <Label htmlFor="date" className="text-[#003366]">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          min={todayDate()}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`mt-1.5 rounded-xl ${errors.date ? 'border-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <Label className="text-[#003366]">Preferred Time *</Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => setFormData({ ...formData, time: value })}
                        >
                          <SelectTrigger className={`mt-1.5 rounded-xl ${errors.time ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="notes" className="text-[#003366]">Reason / Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any symptoms or information you'd like to share..."
                          className="mt-1.5 rounded-xl border-border focus:border-[#00B4A6] min-h-[80px]"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full py-6 text-base font-medium"
                    >
                      Confirm Booking via WhatsApp
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

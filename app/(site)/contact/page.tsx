"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertTriangle,
} from 'lucide-react'
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

const contactReasons = [
  'General Inquiry',
  'Book Appointment',
  'Medical Question',
  'Feedback',
  'Billing Question',
  'Other',
]

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const message =
      `Hello Santé 24hr Medical Centre!\n\nNew contact form submission:\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email || 'Not provided'}\n` +
      `📋 Reason: ${formData.reason || 'Not specified'}\n` +
      `💬 Message: ${formData.message}\n\n` +
      `Please get back to me. Thank you!`

    window.open(`https://wa.me/263780642725?text=${encodeURIComponent(message)}`, '_blank')
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setErrors({})
      setFormData({ name: '', phone: '', email: '', reason: '', message: '' })
    }, 4000)
  }

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
              Contact Us
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              We&apos;re here 24 hours a day, 7 days a week, 365 days a year. Reach out any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-[#FF6B6B]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left flex-wrap">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white" />
              <span className="font-heading font-bold text-white">Medical Emergency?</span>
            </div>
            <span className="text-white/90">Call us now:</span>
            <a href="tel:+263242620588" className="font-bold text-white hover:underline">0242 620588</a>
            <span className="text-white/70 hidden sm:inline">or</span>
            <a href="tel:+263867715077" className="font-bold text-white hover:underline">0867 715 077</a>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366] mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-green-800 mb-2">
                    Message Sent to WhatsApp!
                  </h3>
                  <p className="text-green-700">
                    Thank you for contacting Santé 24. We&apos;ll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <Label htmlFor="name" className="text-[#003366]">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className={`mt-1.5 rounded-xl ${errors.name ? 'border-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone" className="text-[#003366]">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+263 7X XXX XXXX"
                        className={`mt-1.5 rounded-xl ${errors.phone ? 'border-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#003366]">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="mt-1.5 rounded-xl border-border focus:border-[#00B4A6]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#003366]">Reason for Contact</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => setFormData({ ...formData, reason: value })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#003366]">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className={`mt-1.5 rounded-xl min-h-[120px] ${errors.message ? 'border-red-500' : 'border-border focus:border-[#00B4A6]'}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message via WhatsApp
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366] mb-6">
                Get in Touch
              </h2>

              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#00B4A6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#003366]">Address</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Shop 5, Southerton Shopping Centre<br />
                      St Johns Way, Southerton<br />
                      Harare, Zimbabwe
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#00B4A6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#003366]">Phone</h3>
                    <a href="tel:+263242620588" className="block text-muted-foreground hover:text-[#00B4A6] transition-colors mt-1">
                      0242 620588
                    </a>
                    <a href="tel:+263867715077" className="block text-muted-foreground hover:text-[#00B4A6] transition-colors">
                      0867 715 077
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00B4A6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#003366]">Email</h3>
                    <a href="mailto:info@santemedical.co.zw" className="text-muted-foreground hover:text-[#00B4A6] transition-colors mt-1 block">
                      info@santemedical.co.zw
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#00B4A6]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#003366]">Hours</h3>
                    <p className="text-muted-foreground mt-1 font-medium">Open 24 Hours · 7 Days a Week · 365 Days a Year</p>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="p-5 bg-[#F7F9FC] rounded-2xl border-2 border-[#25D366]/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white">
                      <WhatsAppIcon />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-[#003366]">Chat on WhatsApp</h3>
                      <p className="text-muted-foreground text-sm mt-0.5 mb-3">
                        Fastest response — usually within minutes
                      </p>
                      <div className="flex flex-col gap-2">
                        <a
                          href="https://wa.me/263780642725"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
                        >
                          <WhatsAppIcon />
                          +263 78 064 2725 · Medical Centre
                        </a>
                        <a
                          href="https://wa.me/263785947839"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
                        >
                          <WhatsAppIcon />
                          +263 78 594 7839 · Maternity
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative rounded-2xl overflow-hidden h-[260px] shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?q=Southerton+Shopping+Centre,St+Johns+Way,Southerton,Harare,Zimbabwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Santé 24hr Medical Centre — Southerton Shopping Centre, Harare, Zimbabwe"
                />
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Shop 5, Southerton Shopping Centre, St Johns Way, Southerton, Harare
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Have questions? Here are some common inquiries we receive.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">What are your operating hours?</h3>
                <p className="text-muted-foreground text-sm">
                  We are open 24 hours a day, 7 days a week, 365 days a year — including public holidays. Our emergency department is always available, no appointment needed.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">Do I need an appointment?</h3>
                <p className="text-muted-foreground text-sm">
                  Walk-ins are welcome at any time. Appointments are recommended for non-emergency specialist consultations. Emergency cases are seen immediately on arrival.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept cash (USD and ZWG), EcoCash, bank transfers, and most medical aid schemes operating in Zimbabwe.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">Where are you located?</h3>
                <p className="text-muted-foreground text-sm">
                  We are at Shop 5, Southerton Shopping Centre, St Johns Way, Southerton, Harare. Call us on <a href="tel:+263242620588" className="text-[#00B4A6] hover:underline">0242 620588</a> or <a href="tel:+263867715077" className="text-[#00B4A6] hover:underline">0867 715 077</a> for directions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

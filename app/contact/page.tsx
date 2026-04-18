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

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['12 Remembrance Drive', 'Southerton, Harare', 'Zimbabwe'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+263 78 915 8334'],
    isLink: true,
    linkPrefix: 'tel:+263789158334',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@sante24.co.zw'],
    isLink: true,
    linkPrefix: 'mailto:info@sante24.co.zw',
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Open 24 Hours', '7 Days a Week'],
  },
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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message =
      `Hello Sante 24 Medical Center!\n\nNew contact form submission:\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email}\n` +
      `📋 Reason: ${formData.reason || 'Not specified'}\n` +
      `💬 Message: ${formData.message}\n\n` +
      `Please get back to me. Thank you!`

    window.open(`https://wa.me/263789158334?text=${encodeURIComponent(message)}`, '_blank')
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
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
              We&apos;re here to help. Reach out to us for any questions or to schedule an appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-[#FF6B6B]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white" />
              <span className="font-heading font-bold text-white">Medical Emergency?</span>
            </div>
            <span className="text-white/90">Call us now:</span>
            <a href="tel:+263789158334" className="font-bold text-white hover:underline">
              +263 78 915 8334
            </a>
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
                    Thank you for contacting Sante 24. We&apos;ll get back to you shortly.
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
                      className="mt-1.5 rounded-xl border-border focus:border-[#00B4A6]"
                    />
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
                        className="mt-1.5 rounded-xl border-border focus:border-[#00B4A6]"
                      />
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
                      className="mt-1.5 rounded-xl border-border focus:border-[#00B4A6] min-h-[120px]"
                    />
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
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#00B4A6]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-[#003366]">{info.title}</h3>
                        <div className="space-y-0.5 mt-1">
                          {info.details.map((detail, index) => (
                            info.isLink ? (
                              <a
                                key={index}
                                href={info.linkPrefix}
                                className="block text-muted-foreground hover:text-[#00B4A6] transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              <p key={index} className="text-muted-foreground">{detail}</p>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}

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
                      <a
                        href="https://wa.me/263789158334"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-colors"
                      >
                        <WhatsAppIcon />
                        Chat Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative rounded-2xl overflow-hidden bg-[#F7F9FC] h-[240px] flex items-center justify-center">
                <div className="text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-[#003366]/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#003366]" />
                  </div>
                  <p className="text-[#003366] font-heading font-bold">12 Remembrance Drive</p>
                  <p className="text-muted-foreground">Southerton, Harare, Zimbabwe</p>
                  <a
                    href="https://maps.google.com/?q=Southerton+Harare+Zimbabwe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[#00B4A6] text-sm font-medium hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003366" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-grid)" />
                  </svg>
                </div>
              </div>
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
                  We are open 24 hours a day, 7 days a week. Our emergency department is always available — no appointment needed.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">Do I need an appointment?</h3>
                <p className="text-muted-foreground text-sm">
                  While appointments are recommended for non-emergency visits, we also accept walk-ins. Emergency cases are seen immediately.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept cash, EcoCash, bank transfers, and most medical aid schemes operating in Zimbabwe.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-[#003366] mb-2">Where are you located?</h3>
                <p className="text-muted-foreground text-sm">
                  We are located at 12 Remembrance Drive, Southerton, Harare. Call us on +263 78 915 8334 for directions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

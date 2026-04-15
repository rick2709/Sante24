"use client"

import { HeroSection } from '@/components/home/hero-section'
import { QuickAccessCards } from '@/components/home/quick-access-cards'
import { StatsBanner } from '@/components/home/stats-banner'
import { ServicesSection } from '@/components/home/services-section'
import { DoctorsPreview } from '@/components/home/doctors-preview'
import { HealthTips } from '@/components/home/health-tips'
import { BlogPreview } from '@/components/home/blog-preview'
import { Testimonials } from '@/components/home/testimonials'
import { ContactStrip } from '@/components/home/contact-strip'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessCards />
      <StatsBanner />
      <ServicesSection />
      <DoctorsPreview />
      <HealthTips />
      <BlogPreview />
      <Testimonials />
      <ContactStrip />
    </>
  )
}

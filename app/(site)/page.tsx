"use client"

import { HeroSection } from '@/components/home/hero-section'
import { QuickAccessCards } from '@/components/home/quick-access-cards'
import { StatsBanner } from '@/components/home/stats-banner'
import { ServicesSection } from '@/components/home/services-section'
import { TwoCentres } from '@/components/home/two-centres'
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
      <TwoCentres />
      <HealthTips />
      <BlogPreview />
      <Testimonials />
      <ContactStrip />
    </>
  )
}

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MobileNav } from '@/components/mobile-nav'
import { CookieBanner } from '@/components/cookie-banner'
import { BookingModal } from '@/components/booking-modal'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { Analytics } from '@vercel/analytics/next'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <BookingModal />
      <WhatsAppFloat />
      <CookieBanner />
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Santé 24hr Medical Centre at Shop 5, Southerton Shopping Centre, St Johns Way, Harare. Call 04 620588 or 0864 415 077. Open 24 hours, 7 days a week, 365 days a year.',
  openGraph: {
    title: 'Contact Santé 24hr Medical Centre',
    description: 'Shop 5, Southerton Shopping Centre, St Johns Way, Harare. Phone: 04 620588 / 0864 415 077. WhatsApp: +263 78 915 8334. Open 24/7/365.',
  },
  alternates: {
    canonical: 'https://santemedical.co.zw/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

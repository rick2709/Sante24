import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Santé 24hr Medical Centre is licensed by the Health Professions Authority of Zimbabwe and registered with the Medical and Dental Practitioners\' Council. Proudly serving Southerton, Harare since 19 October 2016.',
  openGraph: {
    title: 'About Santé 24hr Medical Centre',
    description: 'Licensed by the HPA of Zimbabwe, Santé 24 has served the Harare community since 2016 with 24-hour medical care, diagnostics, surgery, and maternity services.',
  },
  alternates: {
    canonical: 'https://santemedical.co.zw/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

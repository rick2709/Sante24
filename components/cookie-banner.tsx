"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[420px] z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-border p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00B4A6]/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#00B4A6]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-[#003366]">Cookie Notice</h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  We use cookies to improve your experience on our site. By continuing, you agree to our privacy policy.
                </p>
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={acceptCookies}
                    className="bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full px-5 py-2 h-auto text-sm"
                  >
                    Accept All
                  </Button>
                  <Button 
                    onClick={declineCookies}
                    variant="outline"
                    className="rounded-full px-5 py-2 h-auto text-sm border-border text-[#003366]"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

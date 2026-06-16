"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingContextType {
  isOpen: boolean
  openBooking: (service?: string) => void
  closeBooking: () => void
  preselectedService: string | null
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState<string | null>(null)

  const openBooking = (service?: string) => {
    setPreselectedService(service || null)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setPreselectedService(null)
  }

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, preselectedService }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

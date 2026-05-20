import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookingStore = create(
  persist(
    (set, get) => ({
      // Search params
      searchParams: {
        from: 'Manchester',
        fromCode: 'MAN',
        to: 'New York (JFK)',
        toCode: 'JFK',
        departure: '2026-05-24',
        returnDate: '2026-05-31',
        travellers: 1,
        cabinClass: 'Economy',
        tripType: 'Round Trip',
      },

      // Selected flight
      selectedFlight: null,

      // Booking details
      bookingDetails: {
        gender: 'Mr',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
      },

      // Extras
      selectedSeat: null,
      selectedBaggage: null, // '20' | '32' | null

      // Confirmed booking
      confirmedBooking: null,

      // Actions
      setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),

      setSelectedFlight: (flight) => set({ selectedFlight: flight }),

      setBookingDetails: (details) =>
        set((state) => ({ bookingDetails: { ...state.bookingDetails, ...details } })),

      setSelectedSeat: (seat) => set({ selectedSeat: seat }),

      setSelectedBaggage: (baggage) => set({ selectedBaggage: baggage }),

      confirmBooking: () => {
        const state = get()
        const bookingId = 'FTE-' + Math.floor(100000 + Math.random() * 900000)
        const confirmed = {
          bookingId,
          flight: state.selectedFlight,
          passenger: state.bookingDetails,
          seat: state.selectedSeat,
          baggage: state.selectedBaggage,
          searchParams: state.searchParams,
          bookedAt: new Date().toISOString(),
          totalPrice: (state.selectedFlight?.price || 389) + 87 +
            (state.selectedBaggage === '20' ? 35 : state.selectedBaggage === '32' ? 55 : 0),
        }
        set({ confirmedBooking: confirmed })
        return confirmed
      },

      reset: () => set({
        selectedFlight: null,
        selectedSeat: null,
        selectedBaggage: null,
        confirmedBooking: null,
        bookingDetails: {
          gender: 'Mr', firstName: '', lastName: '', email: '',
          phone: '', dob: '', nationality: '', passportNumber: '', passportExpiry: '',
        },
      }),
    }),
    {
      name: 'flights-travel-booking',
      partialize: (state) => ({
        searchParams: state.searchParams,
        selectedFlight: state.selectedFlight,
        bookingDetails: state.bookingDetails,
        selectedSeat: state.selectedSeat,
        selectedBaggage: state.selectedBaggage,
        confirmedBooking: state.confirmedBooking,
      }),
    }
  )
)

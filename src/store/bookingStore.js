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

      // Array of passengers to allow multiple ticket bookings simultaneously
      passengers: [
        { id: 1, gender: 'Mr', firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNumber: '', passportExpiry: '' }
      ],

      // Extras — mapped object by passenger ID to support multiple unique selections
      selectedSeats: {}, // Format: { [passengerId]: seatObject }
      selectedBaggage: {}, // Format: { [passengerId]: '20' | '32' | null }

      // Confirmed booking
      confirmedBooking: null,

      // Actions
      setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),

      setSelectedFlight: (flight) => set({ selectedFlight: flight }),

      // Multiple passenger dynamic array mutations
      addPassenger: () => set((state) => ({
        passengers: [
          ...state.passengers, 
          { id: Date.now(), gender: 'Mr', firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNumber: '', passportExpiry: '' }
        ]
      })),

      removePassenger: (id) => set((state) => {
        const updatedSeats = { ...state.selectedSeats }
        const updatedBaggage = { ...state.selectedBaggage }
        delete updatedSeats[id]
        delete updatedBaggage[id]
        return {
          passengers: state.passengers.filter(p => p.id !== id),
          selectedSeats: updatedSeats,
          selectedBaggage: updatedBaggage
        }
      }),

      updatePassenger: (id, field, value) => set((state) => ({
        passengers: state.passengers.map(p => p.id === id ? { ...p, [field]: value } : p)
      })),

      // Assigns a unique seat to a specific passenger ID with toggle layout support
      setSelectedSeatForPassenger: (passengerId, seat) => set((state) => {
        const currentSeat = state.selectedSeats[passengerId]
        const updatedSeats = { ...state.selectedSeats }

        if (currentSeat?.id === seat?.id) {
          delete updatedSeats[passengerId]
        } else {
          updatedSeats[passengerId] = seat
        }
        return { selectedSeats: updatedSeats }
      }),

      // Assigns bags to specific passenger IDs
      setSelectedBaggageForPassenger: (passengerId, baggage) => set((state) => ({
        selectedBaggage: {
          ...state.selectedBaggage,
          [passengerId]: state.selectedBaggage[passengerId] === baggage ? null : baggage
        }
      })),

      confirmBooking: () => {
        const state = get()
        const bookingId = 'FTE-' + Math.floor(100000 + Math.random() * 900000)
        
        const baseFlightPrice = state.selectedFlight?.price || 389
        const statutoryTaxes = 87

        // Dynamic multi-passenger ticket calculations loops
        const totalTicketsCost = (baseFlightPrice + statutoryTaxes) * state.passengers.length
        
        const totalBaggageFees = Object.values(state.selectedBaggage).reduce((sum, bag) => {
          const fee = bag === '20' ? 35 : bag === '32' ? 55 : 0
          return sum + fee
        }, 0)

        const totalSeatUpgrades = Object.values(state.selectedSeats).reduce((sum, seat) => {
          return sum + (seat?.extraLegroom ? 45 : 0)
        }, 0)

        const confirmed = {
          bookingId,
          flight: state.selectedFlight,
          passengers: state.passengers,
          seats: state.selectedSeats,
          baggage: state.selectedBaggage,
          searchParams: state.searchParams,
          bookedAt: new Date().toISOString(),
          totalPrice: totalTicketsCost + totalBaggageFees + totalSeatUpgrades,
        }

        set({ confirmedBooking: confirmed })
        return confirmed
      },

      reset: () => set({
        selectedFlight: null,
        selectedSeats: {},
        selectedBaggage: {},
        confirmedBooking: null,
        passengers: [
          { id: 1, gender: 'Mr', firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', passportNumber: '', passportExpiry: '' }
        ],
      }),
    }),
    {
      name: 'flights-travel-booking',
      partialize: (state) => ({
        searchParams: state.searchParams,
        selectedFlight: state.selectedFlight,
        passengers: state.passengers,
        selectedSeats: state.selectedSeats,
        selectedBaggage: state.selectedBaggage,
        confirmedBooking: state.confirmedBooking,
      }),
    }
  )
)
import { useState, useEffect, useCallback } from 'react'
import { searchFlights, getDatePrices, DATE_PRICES } from '../api/flights'

export function useFlights(initialParams = {}) {
  const [flights, setFlights]     = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [maxPrice, setMaxPrice]   = useState(600)
  const [airlines, setAirlines]   = useState([])
  const [sortBy, setSortBy]       = useState('recommended')

  const fetchFlights = useCallback(async (params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const res = await searchFlights({ maxPrice, airlines, ...params })
      let sorted = [...res.data]
      if (sortBy === 'price')    sorted.sort((a, b) => a.price - b.price)
      if (sortBy === 'duration') sorted.sort((a, b) =>
        parseInt(a.outbound.duration) - parseInt(b.outbound.duration))
      setFlights(sorted)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [maxPrice, airlines, sortBy])

  useEffect(() => { fetchFlights() }, [fetchFlights])

  const toggleAirline = useCallback((code) => {
    setAirlines(prev =>
      prev.includes(code) ? prev.filter(a => a !== code) : [...prev, code]
    )
  }, [])

  return {
    flights, loading, error,
    maxPrice, setMaxPrice,
    airlines, toggleAirline,
    sortBy, setSortBy,
    refetch: fetchFlights,
  }
}

export function useDatePrices() {
  const [dates, setDates]       = useState(DATE_PRICES)
  const [loading, setLoading]   = useState(false)
  const [activeIdx, setActiveIdx] = useState(2)

  useEffect(() => {
    setLoading(true)
    getDatePrices().then(res => {
      setDates(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return { dates, loading, activeIdx, setActiveIdx }
}

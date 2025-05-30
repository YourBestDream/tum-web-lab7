import { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../services/api'

const CarPartsContext = createContext()

export function CarPartsProvider({ children }) {
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadParts = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)
      const skip = reset ? 0 : page * 10
      const newParts = await api.getCarParts(skip, 10)
      setParts(prev => reset ? newParts : [...prev, ...newParts])
      setHasMore(newParts.length === 10)
      if (!reset) {
        setPage(prev => prev + 1)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Try to login with READ and WRITE permissions
    const initialize = async () => {
      try {
        await api.login(['READ', 'WRITE'])
        await loadParts(true)
      } catch (err) {
        setError('Failed to initialize: ' + err.message)
      }
    }
    initialize()
  }, [])

  const addPart = async (newPart) => {
    try {
      const createdPart = await api.createCarPart(newPart)
      setParts(prev => [...prev, createdPart])
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removePart = async (id) => {
    try {
      await api.deleteCarPart(id)
      setParts(prev => prev.filter(part => part.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const toggleLike = async (id) => {
    try {
      const updatedPart = await api.likeCarPart(id)
      setParts(prev =>
        prev.map(part =>
          part.id === id ? updatedPart : part
        )
      )
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const value = {
    parts,
    loading,
    error,
    hasMore,
    addPart,
    removePart,
    toggleLike,
    loadMore: () => loadParts(),
    refresh: () => loadParts(true),
  }

  return (
    <CarPartsContext.Provider value={value}>
      {children}
    </CarPartsContext.Provider>
  )
}

export function useCarParts() {
  const context = useContext(CarPartsContext)
  if (!context) {
    throw new Error('useCarParts must be used within a CarPartsProvider')
  }
  return context
} 
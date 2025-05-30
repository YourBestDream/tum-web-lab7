import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 150.41 },
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')

  const convertPrice = (priceInUSD) => {
    const { rate } = currencies[currency]
    return (priceInUSD * rate).toFixed(2)
  }

  const formatPrice = (price) => {
    const { symbol } = currencies[currency]
    return `${symbol}${convertPrice(price)}`
  }

  const value = {
    currency,
    setCurrency,
    currencies,
    formatPrice,
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 
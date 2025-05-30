import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, PlusIcon } from '@heroicons/react/24/outline'
import { CarPartsProvider, useCarParts } from './context/CarPartsContext'
import { CurrencyProvider } from './context/CurrencyContext'
import PartsGrid from './components/PartsGrid'
import AddPartForm from './components/AddPartForm'
import Filters from './components/Filters'
import CurrencySelector from './components/CurrencySelector'

function AppContent() {
  const { parts, addPart, removePart, toggleLike } = useCarParts()
  const [showAddForm, setShowAddForm] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [filteredParts, setFilteredParts] = useState(parts)
  const [filters, setFilters] = useState({
    category: '',
    stock: 'all',
    sort: 'name'
  })

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    let result = [...parts]

    // Apply category filter
    if (filters.category) {
      result = result.filter(part => part.category === filters.category)
    }

    // Apply stock filter
    if (filters.stock !== 'all') {
      result = result.filter(part => 
        filters.stock === 'inStock' ? part.inStock : !part.inStock
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'priceLow':
          return a.price - b.price
        case 'priceHigh':
          return b.price - a.price
        case 'likes':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredParts(result)
  }, [parts, filters])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', !darkMode)
  }

  const categories = [...new Set(parts.map(part => part.category))]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Car Parts Shop
            </h1>
            <div className="flex items-center space-x-4">
              <CurrencySelector />
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Part
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-200 hover:scale-105"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-colors duration-300" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200 transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddForm && (
          <div className="mb-8 animate-fadeIn">
            <AddPartForm
              onAdd={(newPart) => {
                addPart(newPart)
                setShowAddForm(false)
              }}
            />
          </div>
        )}

        <Filters
          categories={categories}
          onCategoryChange={(category) => setFilters(prev => ({ ...prev, category }))}
          onStockChange={(stock) => setFilters(prev => ({ ...prev, stock }))}
          onSortChange={(sort) => setFilters(prev => ({ ...prev, sort }))}
        />

        <PartsGrid
          parts={filteredParts}
          onLike={toggleLike}
          onRemove={removePart}
        />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <CurrencyProvider>
      <CarPartsProvider>
        <AppContent />
      </CarPartsProvider>
    </CurrencyProvider>
  )
}

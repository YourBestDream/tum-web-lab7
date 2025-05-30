import { createContext, useContext, useState, useEffect } from 'react'

const CarPartsContext = createContext()

const initialParts = [
  {
    id: 1,
    name: 'Ceramic Brake Pads',
    category: 'Brakes',
    price: 49.99,
    description: 'High-performance ceramic brake pads for optimal stopping power and reduced brake dust',
    image: 'https://www.brembo.com/en/PublishingImages/company/products/ricambi/pastiglie/pastiglie-ceramiche-brembo.jpg',
    inStock: true,
    likes: 0,
  },
  {
    id: 2,
    name: 'Premium Oil Filter',
    category: 'Engine',
    price: 12.99,
    description: 'Premium oil filter with advanced filtration technology for maximum engine protection',
    image: 'https://shop.advanceautoparts.com/wcsstore/CVWEB/Attachment/staticbusinesscontent/image/landing/oil-change/2021/oil-filter-guide-hero.jpg',
    inStock: true,
    likes: 0,
  },
  {
    id: 3,
    name: 'NGK Iridium Spark Plugs Set',
    category: 'Engine',
    price: 24.99,
    description: 'Set of 4 high-performance iridium spark plugs for improved fuel efficiency and engine response',
    image: 'https://m.media-amazon.com/images/I/81vkPJx9JVL._AC_UF1000,1000_QL80_.jpg',
    inStock: false,
    likes: 0,
  },
  {
    id: 4,
    name: 'Performance Air Filter',
    category: 'Engine',
    price: 39.99,
    description: 'High-flow performance air filter for improved engine breathing and horsepower',
    image: 'https://www.knfilters.com/media/wysiwyg/KNFilters/air-filter-cover.jpg',
    inStock: true,
    likes: 0,
  },
  {
    id: 5,
    name: 'LED Headlight Kit',
    category: 'Lighting',
    price: 129.99,
    description: 'Ultra-bright LED headlight conversion kit with 6000K white light output',
    image: 'https://www.oracle-lighting.com/cdn/shop/products/9005-LED-Headlight-Bulbs-6000K-White-Light-Oracle-Lighting_1024x1024.jpg',
    inStock: true,
    likes: 0,
  },
  {
    id: 6,
    name: 'Performance Brake Rotors',
    category: 'Brakes',
    price: 89.99,
    description: 'Cross-drilled and slotted performance brake rotors for improved cooling and braking performance',
    image: 'https://www.powerstop.com/wp-content/uploads/2020/03/Z36-Truck-_-Tow-Brake-Kit_Header.jpg',
    inStock: true,
    likes: 0,
  }
]

export function CarPartsProvider({ children }) {
  const [parts, setParts] = useState(() => {
    const savedParts = localStorage.getItem('carParts')
    return savedParts ? JSON.parse(savedParts) : initialParts
  })

  useEffect(() => {
    localStorage.setItem('carParts', JSON.stringify(parts))
  }, [parts])

  const addPart = (newPart) => {
    setParts(currentParts => [...currentParts, { ...newPart, id: Date.now(), likes: 0 }])
  }

  const removePart = (id) => {
    setParts(currentParts => currentParts.filter(part => part.id !== id))
  }

  const toggleLike = (id) => {
    setParts(currentParts =>
      currentParts.map(part =>
        part.id === id ? { ...part, likes: part.likes + 1 } : part
      )
    )
  }

  const value = {
    parts,
    addPart,
    removePart,
    toggleLike,
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
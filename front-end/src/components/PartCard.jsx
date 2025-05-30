import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCurrency } from '../context/CurrencyContext'

export default function PartCard({ part, onLike, onRemove }) {
  const { formatPrice } = useCurrency()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://m.media-amazon.com/images/I/71K7Q4FpguL._AC_SL1500_.jpg'
            e.target.onerror = null
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {part.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {part.category}
            </p>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(part.price)}
          </span>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {part.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onLike(part.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
            >
              {part.likes > 0 ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500 transform hover:scale-110 transition-transform duration-200" />
              ) : (
                <HeartIcon className="h-5 w-5 transform hover:scale-110 transition-transform duration-200" />
              )}
              <span className="transition-all duration-200">{part.likes}</span>
            </button>
            <span className={`px-2 py-1 rounded text-xs transition-colors duration-200 ${
              part.inStock
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {part.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <button
            onClick={() => onRemove(part.id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 transform hover:scale-110"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 
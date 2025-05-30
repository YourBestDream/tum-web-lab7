export default function Filters({ categories, onCategoryChange, onStockChange, onSortChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 animate-slideIn">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:shadow-md"
        defaultValue=""
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onStockChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:shadow-md"
        defaultValue="all"
      >
        <option value="all">All Stock</option>
        <option value="inStock">In Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>

      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:shadow-md"
        defaultValue="name"
      >
        <option value="name">Sort by Name</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="likes">Most Liked</option>
      </select>
    </div>
  )
} 
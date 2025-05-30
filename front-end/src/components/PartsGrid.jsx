import PartCard from './PartCard'

export default function PartsGrid({ parts, onLike, onRemove }) {
  if (parts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No parts available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parts.map(part => (
        <PartCard
          key={part.id}
          part={part}
          onLike={onLike}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
} 
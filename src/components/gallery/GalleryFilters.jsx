export function GalleryFilters({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter gallery by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-forest text-cream shadow-soft'
                : 'bg-white/70 text-ink/70 hover:bg-forest/10 hover:text-forest'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default GalleryFilters;

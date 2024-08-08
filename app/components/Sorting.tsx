interface SortingProps {
  onSortChange: (sortBy: string) => void;
  priceSortOrder: 'asc' | 'desc';
  starsSortOrder: 'asc' | 'desc';
}

const Sorting: React.FC<SortingProps & { disabled?: boolean }> = ({ onSortChange, priceSortOrder, starsSortOrder, disabled }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onSortChange('price')}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        disabled={disabled}
      >
        Sort by Price {priceSortOrder === 'desc' ? '↑' : '↓'}
      </button>

      <button
        onClick={() => onSortChange('stars')}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        disabled={disabled}
      >
        Sort by Stars {starsSortOrder === 'desc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default Sorting;

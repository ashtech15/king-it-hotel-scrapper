interface SortingProps {
  onSortChange: (sortBy: string) => void;
  priceSortOrder: 'asc' | 'desc';
  starsSortOrder: 'asc' | 'desc';
}

const Sorting: React.FC<SortingProps> = ({ onSortChange, priceSortOrder, starsSortOrder }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onSortChange('price')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sort by Price {priceSortOrder === 'desc' ? '↑' : '↓'}
      </button>

      <button
        onClick={() => onSortChange('stars')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sort by Stars {starsSortOrder === 'desc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default Sorting;

interface SortingProps {
  onSortChange: (sortBy: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onSortChange('price')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sort by Price
      </button>

      <button
        onClick={() => onSortChange('stars')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sort by Stars
      </button>
    </div>
  );
};

export default Sorting;

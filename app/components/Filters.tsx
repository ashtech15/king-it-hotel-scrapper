import { useState } from 'react';

interface FiltersProps {
  countries: string[];
  cities: string[];
  onFilterChange: (country: string, city: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ countries, cities, onFilterChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleFilterChange = () => {
    onFilterChange(selectedCountry, selectedCity);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="px-4 py-2 bg-white border rounded"
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="px-4 py-2 bg-white border rounded"
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button onClick={handleFilterChange} className="px-4 py-2 bg-blue-600 text-white rounded">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;

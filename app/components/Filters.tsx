import { useState } from 'react';

interface FilterOption {
  id: string;
  name: string;
}

interface FiltersProps {
  countries: FilterOption[];
  cities: FilterOption[];
  onFilterChange: (countryId: string, cityId: string) => void;
}

const Filters = ({ countries, cities, onFilterChange }: FiltersProps) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedCityId, setSelectedCityId] = useState<string>('');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    onFilterChange(countryId, selectedCityId);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    onFilterChange(selectedCountryId, cityId);
  };

  return (
    <div className='flex space-x-4 mb-4'>
      <select onChange={handleCountryChange} value={selectedCountryId} className='px-4 py-2 bg-white border rounded'>
        <option value="">All Countries</option>
        {countries.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <select onChange={handleCityChange} value={selectedCityId} className='px-4 py-2 bg-white border rounded'>
        <option value="">All Cities</option>
        {cities.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;

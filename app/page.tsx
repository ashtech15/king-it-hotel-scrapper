"use client";

import { useState, useEffect } from 'react';
import HotelList from './components/HotelList';
import Filters from './components/Filters';
import Sorting from './components/Sorting';
import Pagination from './components/Pagination';

interface Hotel {
  id: string;
  name: string;
  country: string;
  countryId: string;
  city: string;
  cityId: string;
  price: number;
  stars: number;
  imageUrl?: string;
}

interface Filter {
  id: string;
  name: string;
}

const Page = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [countryIdFilter, setCountryIdFilter] = useState<string>('');
  const [cityIdFilter, setCityIdFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceSortOrder, setPriceSortOrder] = useState<'asc' | 'desc'>('asc');
  const [starsSortOrder, setStarsSortOrder] = useState<'asc' | 'desc'>('asc');
  const [countries, setCountries] = useState<Filter[]>([]);
  const [cities, setCities] = useState<Filter[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(21);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/hotels');
        const data: Hotel[] = await response.json();
        setHotels(data);
        setFilteredHotels(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));

        const countries = Array.from(
          new Map(data.map(hotel => [hotel.countryId, hotel.country])).entries()
        ).map(([id, name]) => ({ id, name }));
        
        const cities = Array.from(
          new Map(data.map(hotel => [hotel.cityId, hotel.city])).entries()
        ).map(([id, name]) => ({ id, name }));

        setCountries(countries);
        setCities(cities);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    let updatedHotels = hotels;

    if (countryIdFilter) {
      updatedHotels = updatedHotels.filter(hotel => hotel.countryId === countryIdFilter);
    }

    if (cityIdFilter) {
      updatedHotels = updatedHotels.filter(hotel => hotel.cityId === cityIdFilter);
    }

    if (sortOption === 'price') {
      updatedHotels.sort((a, b) => {
        return priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    } else if (sortOption === 'stars') {
      updatedHotels.sort((a, b) => {
        return starsSortOrder === 'asc' ? a.stars - b.stars : b.stars - a.stars;
      });
    }

    setFilteredHotels(updatedHotels);
    setTotalPages(Math.ceil(updatedHotels.length / itemsPerPage));
    setCurrentPage(1);
  }, [countryIdFilter, cityIdFilter, sortOption, priceSortOrder, starsSortOrder, hotels]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (countryId: string, cityId: string) => {
    setCountryIdFilter(countryId);
    setCityIdFilter(cityId);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
    if (sortBy === 'price') {
      setPriceSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else if (sortBy === 'stars') {
      setStarsSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hotel Offers</h1>

      <Filters
        countries={countries}
        cities={cities}
        onFilterChange={handleFilterChange}
      />

      <div className="flex justify-between items-center mb-4">
        <Sorting
          onSortChange={handleSortChange}
          priceSortOrder={priceSortOrder}
          starsSortOrder={starsSortOrder}
        />        
        <div className="flex items-center ml-auto">
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded p-2"
          >
            <option value={10}>10</option>
            <option value={21}>21</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <HotelList hotels={paginatedHotels} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;

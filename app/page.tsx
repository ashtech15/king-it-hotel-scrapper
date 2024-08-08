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
  city: string;
  price: number;
  stars: number;
  imageUrl?: string;
}

const Page = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');

  const itemsPerPage = 21;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/hotels');
        const data: Hotel[] = await response.json();
        setHotels(data);
        setFilteredHotels(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    let updatedHotels = hotels;

    if (countryFilter) {
      updatedHotels = updatedHotels.filter(hotel => hotel.country === countryFilter);
    }

    if (cityFilter) {
      updatedHotels = updatedHotels.filter(hotel => hotel.city === cityFilter);
    }

    if (sortOption === 'price') {
      updatedHotels.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'stars') {
      updatedHotels.sort((a, b) => b.stars - a.stars);
    }

    setFilteredHotels(updatedHotels);
    setTotalPages(Math.ceil(updatedHotels.length / itemsPerPage));
    setCurrentPage(1);
  }, [countryFilter, cityFilter, sortOption, hotels]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (country: string, city: string) => {
    setCountryFilter(country);
    setCityFilter(city);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
  };

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hotel Offers</h1>

      <Filters
        countries={[...new Set(hotels.map(hotel => hotel.country))]}
        cities={[...new Set(hotels.map(hotel => hotel.city))]}
        onFilterChange={handleFilterChange}
      />

      <Sorting onSortChange={handleSortChange} />

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

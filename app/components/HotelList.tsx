import HotelItem from './HotelItem';

interface Hotel {
    id: string;
    hotelId: string;
    name: string;
    country: string;
    city: string;
    price: number;
    stars: number;
    imageUrl?: string;
}

interface HotelListProps {
    hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    console.log({hotels})
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotels.map((hotel) => (
                <HotelItem key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default HotelList;

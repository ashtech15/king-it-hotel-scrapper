interface Hotel {
    id: string;
    name: string;
    country: string;
    city: string;
    price: number;
    stars: number;
    imageUrl?: string;
}

interface HotelItemProps {
    hotel: Hotel;
}

const HotelItem: React.FC<HotelItemProps> = ({ hotel }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {hotel.imageUrl ? (
                <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-48 object-cover" />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                </div>
            )}
            <div className="p-4">
                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.city}, {hotel.country}</p>
                <p className="text-blue-600 font-bold">€{hotel.price}</p>
                {hotel.stars > 0 && (
                    <p className="text-yellow-500">{'★'.repeat(hotel.stars)}</p>
                )}
            </div>
        </div>
    );
};

export default HotelItem;

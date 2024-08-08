import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);

async function getHotels() {
  try {
    await client.connect();
    const db = client.db('hotels');
    const cacheCollection = db.collection('cache');
    const cache = await cacheCollection.findOne({ name: 'hotels' });

    if (cache && new Date().getTime() - cache.timestamp < 20 * 60 * 1000) {
      console.log('Returning cached data');
      return JSON.parse(cache.data);
    }

    console.log('Fetching new data from API');
    const response = await fetch('http://testapi.swisshalley.com/hotels/', {
      headers: {
        'X-API-KEY': process.env.API_KEY as string
      }
    });

    if (!response.ok) {
      throw new Error(`API response not OK: ${response.statusText}`);
    }

    const data = await response.json();
    const transformedData = data.map((hotel: any) => ({
      id: hotel.hotel_id,
      name: hotel.hotel_name,
      country: hotel.country,
      city: hotel.city,
      price: Math.ceil(parseFloat(hotel.price)),
      stars: parseInt(hotel.star, 10) || 0,
      imageUrl: hotel.image || ''
    }));

    console.log('Storing data in cache');
    await cacheCollection.updateOne(
      { name: 'hotels' },
      { $set: { data: JSON.stringify(transformedData), timestamp: new Date().getTime() } },
      { upsert: true }
    );

    return transformedData;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  } finally {
    await client.close();
  }
}

export async function GET() {
  const hotels = await getHotels();
  return NextResponse.json(hotels);
}

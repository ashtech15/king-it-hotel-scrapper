import mongoose, { Schema, Document } from 'mongoose';

export interface IHotel extends Document {
  id: string;
  name: string;
  country: string;
  city: string;
  price: number;
  stars: number;
  imageUrl?: string;
  cachedAt: Date;
}

const HotelSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  stars: { type: Number, required: true },
  imageUrl: { type: String },
  cachedAt: { type: Date, default: Date.now, expires: '20m' },
});

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);

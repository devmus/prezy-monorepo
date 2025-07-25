import { IService } from '@/types/service';
import { Document } from 'mongoose';

export interface IStore extends Document {
    _id: string;
    name: string;
    description: string;
    category: string;
    location: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    services: Array<IService>;
    createdAt: Date;
    updatedAt: Date;
}

export interface StoreLocation {
    address: string;
    city: string;
    zipCode: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

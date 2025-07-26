import { Document } from 'mongoose';
import { IStore } from './store';

export interface IService extends Document {
    _id: string;
    store: IStore;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

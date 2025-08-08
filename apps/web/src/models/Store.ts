import mongoose, { Schema } from 'mongoose';
import type { IStore } from '@/types';

// Store Schema
const StoreSchema: Schema = new Schema<IStore>(
    {
        name: {
            type: String,
            required: [true, 'Store name is required'],
            trim: true,
            maxlength: [100, 'Store name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            // required: [true, 'Store description is required'],
            trim: true,
            maxlength: [1000, 'Store description cannot exceed 1000 characters'],
        },
        category: {
            type: String,
            required: [true, 'Store category is required'],
            trim: true,
            maxlength: [100, 'Store category cannot exceed 100 characters'],
        },
        shopkeeper: {
            type: String,
            required: [true, 'Shopkeeper is required'],
        },
        status: {
            type: String,
            enum: ['created', 'certified', 'delisted'],
            required: [true, 'Status is required'],
        },
        location: {
            address: {
                type: String,
                required: [true, 'Address is required'],
                trim: true,
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true,
            },
            zipCode: {
                type: String,
                required: [true, 'ZIP code is required'],
                trim: true,
            },
            country: {
                type: String,
                required: [true, 'Country is required'],
                trim: true,
                default: 'Sweden',
            },
            coordinates: {
                latitude: {
                    type: Number,
                    min: -90,
                    max: 90,
                },
                longitude: {
                    type: Number,
                    min: -180,
                    max: 180,
                },
            },
        },
        services: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Service',
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        collection: 'stores',
    },
);

// Indexes for better query performance
StoreSchema.index({ name: 1 });
StoreSchema.index({ 'location.city': 1, 'location.state': 1 });
StoreSchema.index({ 'location.coordinates': '2dsphere' }); // For geospatial queries

// Virtual for full address
StoreSchema.virtual('fullAddress').get(function (this: IStore) {
    return `${this.location.address}, ${this.location.city}, ${this.location.state} ${this.location.zipCode}, ${this.location.country}`;
});

// Ensure virtuals are included in JSON output
StoreSchema.set('toJSON', { virtuals: true });
StoreSchema.set('toObject', { virtuals: true });

// Export the model
export const StoreModel = mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);

export default StoreModel;

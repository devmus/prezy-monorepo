export type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
};

export interface Prediction {
    description: string;
    place_id: string;
}

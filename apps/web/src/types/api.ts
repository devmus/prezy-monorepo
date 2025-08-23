import { IStore } from '@prezy/types';
import { IService } from '@prezy/types';

/////////////////////////////////////////////
// COMMON
/////////

export interface ApiErrorResponse {
    success: false;
    error: string;
}

export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

/////////////////////////////////////////////
// STORES
/////////

/////////////////////////////////////////////
// /api/stores/add
export interface AddStoreRequest {
    store: IStore;
}

export type AddStoreResponse = ApiSuccessResponse<AddStoreRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// /api/stores/list
export interface ListStoresRequest {
    stores: IStore[];
}

export type ListStoresResponse = ApiSuccessResponse<ListStoresRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// /api/stores/list/[id]
export interface GetStoreRequest {
    store: IStore;
}

export type GetStoreResponse = ApiSuccessResponse<GetStoreRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// SERVICES
///////////

/////////////////////////////////////////////
// /api/services/add
export interface AddServiceRequest {
    name: string;
    storeId: string;
}

export type AddServiceResponse = ApiSuccessResponse<AddServiceRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// /api/services/list
export interface ListServicesRequest {
    services: IService[];
}

export type ListServicesResponse = ApiSuccessResponse<ListServicesRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// /api/services/list/[id]
export interface GetServiceRequest {
    service: IService;
}

export type GetServiceResponse = ApiSuccessResponse<GetServiceRequest> | ApiErrorResponse;

/////////////////////////////////////////////
// PLACES
/////////
import { Prediction } from '@/types';
/////////////////////////////////////////////
// /api/places/autocomplete
export type AutocompleteRequest = Prediction[];

export type AutocompleteResponse = ApiSuccessResponse<AutocompleteRequest> | ApiErrorResponse;

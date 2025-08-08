import { IStore } from '@prezy/auth';
import { IService } from '@prezy/auth';
export interface ApiErrorResponse {
    success: false;
    error: string;
}
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}
export interface AddStoreRequest {
    store: IStore;
}
export type AddStoreResponse = ApiSuccessResponse<AddStoreRequest> | ApiErrorResponse;
export interface ListStoresRequest {
    stores: IStore[];
}
export type ListStoresResponse = ApiSuccessResponse<ListStoresRequest> | ApiErrorResponse;
export interface GetStoreRequest {
    store: IStore;
}
export type GetStoreResponse = ApiSuccessResponse<GetStoreRequest> | ApiErrorResponse;
export interface AddServiceRequest {
    name: string;
    storeId: string;
}
export type AddServiceResponse = ApiSuccessResponse<AddServiceRequest> | ApiErrorResponse;
export interface ListServicesRequest {
    services: IService[];
}
export type ListServicesResponse = ApiSuccessResponse<ListServicesRequest> | ApiErrorResponse;
export interface GetServiceRequest {
    service: IService;
}
export type GetServiceResponse = ApiSuccessResponse<GetServiceRequest> | ApiErrorResponse;
import { Prediction } from '@/types';
export type AutocompleteRequest = Prediction[];
export type AutocompleteResponse = ApiSuccessResponse<AutocompleteRequest> | ApiErrorResponse;
//# sourceMappingURL=api.d.ts.map
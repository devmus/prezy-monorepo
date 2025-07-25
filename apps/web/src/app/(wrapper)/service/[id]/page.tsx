'use client';

import BuyService from '@/app/components/buyService';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { GetServiceResponse } from '@/types/api';
import { IService } from '@/types/service';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const {
        data: service,
        error,
        isLoading,
    } = useSWR<GetServiceResponse>(`/api/services/list/${id}`, fetcher);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading services: {error.message}</div>;
    if (!service?.success) return <div>No service found</div>;

    const currentService = service.data.service;

    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-6 bg-gray-50 min-w-[300px]">
            {currentService && (
                <div className="w-full max-w-3xl bg-white p-8 rounded-tl-2xl rounded-b-2xl shadow-lg relative">
                    <Link href={`/store/${currentService.store.id}`} className="mb-4">
                        <span className="flex flex-row justify-center items-center no-wrap absolute h-[32px] -top-8 -right-0 bg-[white] text-blue-800 px-4 text-xs font-semibold rounded-t-md hover:bg-blue-200 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h11M3 6h11m-7 8h7"
                                />
                            </svg>
                            {currentService.store.name}
                        </span>
                    </Link>
                    <div className="flex flex-col items-center mb-4">
                        <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
                            {currentService.name}
                        </h2>
                    </div>

                    {currentService.imageUrl && (
                        <div className="flex justify-center mb-8">
                            <div className="w-64 h-64 relative rounded-xl overflow-hidden border border-gray-200 shadow">
                                <Image
                                    src={currentService.imageUrl}
                                    alt={currentService.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <ServiceDetails currentService={currentService} />
                    <BuyService />
                </div>
            )}
        </div>
    );
}

function ServiceDetails({ currentService }: { currentService: IService }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Price</h3>
                <p className="text-gray-600">{currentService.price} SEK</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Category</h3>
                <p className="text-gray-600">{currentService.category}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{currentService.description}</p>
            </div>
        </div>
    );
}

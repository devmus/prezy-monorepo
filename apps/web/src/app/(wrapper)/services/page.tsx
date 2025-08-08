'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { IService } from '@/types';
import { ListServicesResponse } from '@/types/api';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesPage() {
    const {
        data: services,
        error,
        isLoading,
    } = useSWR<ListServicesResponse>('/api/services/list', fetcher);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading services: {error.message}</div>;
    if (!services?.success) return <div>No services found</div>;

    const serviceList = services.data.services;

    return (
        <div className="flex flex-1 flex-col h-full p-8 justify-between">
            <div className="">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Services on Prezy</h1>
                    <p className="text-muted-foreground mb-8">
                        Here are the services. Click on a service to view its details.
                    </p>

                    {serviceList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceList.map((service: IService) => (
                                <ServiceCard
                                    key={service._id}
                                    service={service}
                                    serviceList={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 bg-card border   rounded-lg">
                            <h3 className="font-semibold mb-2">No services found</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// // /app/(wrapper)/buy/[id]/page.tsx
// 'use client';

// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import useSWR from 'swr';
// import { fetcher } from '@/lib/fetcher';
// import { GetServiceResponse } from '@/types/api';
// import { DeliveryInfo, PaymentMethod, PaymentStatus } from '@prezy/types';
// import BuyStepDetails from './components/BuyStepDetails';
// import BuyStepMethod from './components/BuyStepMethod';
// import BuyStepMessage from './components/BuyStepMessage';
// import BuyStepConfirm from './components/BuyStepConfirm';
// import { IService } from '@prezy/types';
// // import PaymentModule from './components/PaymentModule';

// export default function CheckoutPage() {
//     const { id } = useParams<{ id: string }>();
//     // const [loading, setLoading] = useState(false);
//     // const [error, setError] = useState('');
//     const {
//         data,
//         error: serviceError,
//         isLoading,
//     } = useSWR<GetServiceResponse>(`/api/services/list/${id}`, fetcher);
//     const [formStep, setFormStep] = useState<'details' | 'method' | 'delivery' | 'confirm'>(
//         'details',
//     );
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
//     const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
//         receiptEmail: '',
//         recipientEmail: '',
//         message: '',
//     });

//     const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
//         loading: false,
//         error: null,
//         success: false,
//     });

//     //method - only stripe now, swish, klarna, crypto?
//     //delivery - reciept, beneficiery of giftcard, message - if logged in, have first pre filled and then a button that suggest use same as above...

//     if (isLoading) return <div>Loading...</div>;
//     if (serviceError) return <div>Error loading services: {serviceError.message}</div>;
//     if (!data?.success) return <div>Service not found</div>;

//     const service: IService | undefined = data?.data?.service;

//     return (
//         <>
//             <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg space-y-4">
//                 <h1 className="text-3xl font-bold text-center py-2">Checkout</h1>

//                 <BuyStepDetails formStep={formStep} setFormStep={setFormStep} service={service} />
//                 <BuyStepMethod
//                     formStep={formStep}
//                     setFormStep={setFormStep}
//                     selectedPaymentMethod={selectedPaymentMethod}
//                     setSelectedPaymentMethod={setSelectedPaymentMethod}
//                 />
//                 <BuyStepMessage
//                     formStep={formStep}
//                     setFormStep={setFormStep}
//                     deliveryInfo={deliveryInfo}
//                     setDeliveryInfo={setDeliveryInfo}
//                 />
//                 <BuyStepConfirm
//                     formStep={formStep}
//                     setFormStep={setFormStep}
//                     selectedPaymentMethod={selectedPaymentMethod}
//                     serviceId={id}
//                     deliveryInfo={deliveryInfo}
//                     paymentStatus={paymentStatus}
//                     setPaymentStatus={setPaymentStatus}
//                 />

//                 {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
//             </div>
//             {/* <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg space-y-4">
//                 <>
//                     <PaymentModule
//                         selectedPaymentMethod={selectedPaymentMethod}
//                         paymentStatus={paymentStatus}
//                     />
//                 </>
//             </div> */}
//         </>
//     );
// }

'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { GetServiceResponse } from '@/types/api';
import { DeliveryInfo, PaymentMethod } from '@prezy/types';
import BuyStepDetails from './components/BuyStepDetails';
import BuyStepMethod from './components/BuyStepMethod';
import BuyStepMessage from './components/BuyStepMessage';
import BuyStepConfirm from './components/BuyStepConfirm';
import PaymentModule from './components/PaymentModule';
import { ServiceDTO, PaymentPhase } from '@prezy/types';

export default function CheckoutPage() {
    const { id } = useParams<{ id: string }>();
    const {
        data,
        error: serviceError,
        isLoading,
    } = useSWR<GetServiceResponse>(`/api/services/list/${id}`, fetcher);

    const [formStep, setFormStep] = useState<'details' | 'method' | 'delivery' | 'confirm'>(
        'details',
    );

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        receiptEmail: '',
        recipientEmail: '',
        message: '',
    });

    // Single source of truth for payment status across siblings
    const [paymentPhase, setPaymentPhase] = useState<PaymentPhase>({ state: 'idle' });

    if (isLoading) return <div>Loading...</div>;
    if (serviceError) return <div>Error loading services: {serviceError.message}</div>;
    if (!data?.success) return <div>Service not found</div>;

    const service: ServiceDTO | undefined = data?.data?.service;

    console.log('formStep:', formStep);
    console.log('selectedPaymentMethod:', selectedPaymentMethod);

    return (
        <>
            <h1 className="text-3xl font-bold text-center py-2">Checkout</h1>
            <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg space-y-4">
                <BuyStepDetails formStep={formStep} setFormStep={setFormStep} service={service} />

                <BuyStepMethod
                    formStep={formStep}
                    setFormStep={setFormStep}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                />

                <BuyStepMessage
                    formStep={formStep}
                    setFormStep={setFormStep}
                    deliveryInfo={deliveryInfo}
                    setDeliveryInfo={setDeliveryInfo}
                />

                {/* Summary-only; no payment handlers */}
                <BuyStepConfirm
                    formStep={formStep}
                    setFormStep={setFormStep}
                    selectedPaymentMethod={selectedPaymentMethod}
                    deliveryInfo={deliveryInfo}
                    paymentPhase={paymentPhase}
                />
            </div>

            {/* Visually separate Payment section */}
            <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg space-y-4">
                <PaymentModule
                    formStep={formStep}
                    method={selectedPaymentMethod}
                    serviceId={id}
                    deliveryInfo={deliveryInfo}
                    onStatusChange={setPaymentPhase}
                />
            </div>
        </>
    );
}

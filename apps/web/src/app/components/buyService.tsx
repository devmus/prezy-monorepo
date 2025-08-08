import { useParams, useRouter } from 'next/navigation';

export default function BuyService() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    // const handleBuy = async () => {

    // const response = await fetch(`/api/checkout/stripe/${id}`, {
    //     method: 'POST',
    // });
    // const data = await response.json();
    // console.log(data);
    // };

    const goToCheckout = () => {
        router.push(`/buy/${id}`);
    };

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={goToCheckout}
                className="w-[50%] min-w-[150px] bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-200"
            >
                Buy Now
            </button>
        </div>
    );
}

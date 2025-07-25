// import { useCreateService } from '@/hooks/useCreateService';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';

// export default function AddService({ mutate }: { mutate: () => void }) {
//     const [serviceName, setServiceName] = useState('');
//     const [serviceDescription, setServiceDescription] = useState('');
//     const [servicePrice, setServicePrice] = useState('');
//     const [serviceCategory, setServiceCategory] = useState('');
//     const [serviceImageUrl, setServiceImageUrl] = useState('');

//     const { id } = useParams<{ id: string }>();

//     const { addService, loading } = useCreateService(id, async () => {
//         setServiceName('');
//         setServiceDescription('');
//         setServicePrice('');
//         setServiceCategory('');
//         setServiceImageUrl('');
//         mutate();
//     });

//     return (
//         <div className="">
//             <div className="p-6 bg-card border   rounded-lg ">
//                 <h3 className="font-semibold mb-2">Add a service</h3>
//                 <form
//                     onSubmit={async (e) => {
//                         e.preventDefault();
//                         await addService(
//                             serviceName,
//                             serviceDescription,
//                             servicePrice,
//                             serviceCategory,
//                             serviceImageUrl,
//                         );
//                     }}
//                     className="flex flex-col gap-2"
//                 >
//                     <input
//                         className="border   rounded-md p-2 w-full"
//                         type="text"
//                         name="name"
//                         placeholder="Service name"
//                         value={serviceName}
//                         onChange={(e) => setServiceName(e.target.value)}
//                         disabled={loading}
//                     />
//                     <input
//                         className="border   rounded-md p-2 w-full"
//                         type="text"
//                         name="description"
//                         placeholder="Service description"
//                         value={serviceDescription}
//                         onChange={(e) => setServiceDescription(e.target.value)}
//                         disabled={loading}
//                     />
//                     <input
//                         className="border   rounded-md p-2 w-full"
//                         type="number"
//                         name="price"
//                         placeholder="Service price"
//                         value={servicePrice}
//                         onChange={(e) => setServicePrice(e.target.value)}
//                         disabled={loading}
//                     />
//                     <input
//                         className="border   rounded-md p-2 w-full"
//                         type="text"
//                         name="category"
//                         placeholder="Service category"
//                         value={serviceCategory}
//                         onChange={(e) => setServiceCategory(e.target.value)}
//                         disabled={loading}
//                     />
//                     <ImageSelector
//                         loading={loading}
//                         serviceImageUrl={serviceImageUrl}
//                         setServiceImageUrl={setServiceImageUrl}
//                     />
//                     {serviceImageUrl && (
//                         <div className="mt-4">
//                             <Image
//                                 src={serviceImageUrl}
//                                 alt="Selected spa image"
//                                 width={200}
//                                 height={150}
//                                 className="rounded-lg object-cover border"
//                             />
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         className="text-sm text-muted-foreground bg-[lightblue] rounded-md p-2 w-20"
//                         disabled={loading}
//                     >
//                         {loading ? 'Adding...' : 'Add'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// function ImageSelector({
//     loading,
//     serviceImageUrl,
//     setServiceImageUrl,
// }: {
//     loading: boolean;
//     serviceImageUrl: string;
//     setServiceImageUrl: (value: string) => void;
// }) {
//     return (
//         <select
//             className="border   rounded-md p-2 w-full"
//             name="imageUrl"
//             value={serviceImageUrl}
//             onChange={(e) => setServiceImageUrl(e.target.value)}
//             disabled={loading}
//         >
//             <option value="">Select a spa image</option>
//             <option value="https://images.pexels.com/photos/3997994/pexels-photo-3997994.jpeg">
//                 Facial Massage (Pexels)
//             </option>
//             <option value="https://images.unsplash.com/photo-1556228453-efd6c1ff04cc">
//                 Candles & Stones (Unsplash)
//             </option>
//             <option value="https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg">
//                 Spa Flat Lay (Pexels)
//             </option>
//             <option value="https://images.pexels.com/photos/6621312/pexels-photo-6621312.jpeg">
//                 Back Massage (Pexels)
//             </option>
//             <option value="https://images.unsplash.com/photo-1616529732265-4cb2f1c3c0cb">
//                 Flower & Towels (Unsplash)
//             </option>
//         </select>
//     );
// }

// import { useCreateStore } from '@/hooks/useCreateStore';
// import { useState } from 'react';

// export default function AddStore({ mutate }: { mutate: () => void }) {
//     const [storeName, setStoreName] = useState('');
//     const [storeDescription, setStoreDescription] = useState('');

//     const { addStore, loading } = useCreateStore(async () => {
//         setStoreName('');
//         await mutate();
//     });

//     return (
//         <div className="">
//             <div className="p-6 bg-card border   rounded-lg ">
//                 <h3 className="font-semibold mb-2">Add a store</h3>
//                 <form
//                     onSubmit={async (e) => {
//                         e.preventDefault();
//                         await addStore(storeName, storeDescription);
//                     }}
//                     className="flex flex-row gap-2"
//                 >
//                     <input
//                         className="border   rounded-md p-2 w-full"
//                         type="text"
//                         name="name"
//                         placeholder="Store name"
//                         value={storeName}
//                         onChange={(e) => setStoreName(e.target.value)}
//                         disabled={loading}
//                     />
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

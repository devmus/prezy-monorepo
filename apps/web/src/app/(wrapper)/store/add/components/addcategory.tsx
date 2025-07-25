interface AddNameProps {
    storeCategory: string;
    setStoreCategory: (category: string) => void;
}

export default function AddCategory({ storeCategory, setStoreCategory }: AddNameProps) {
    return (
        <>
            <div className="flex flex-col gap-2 m-2">
                <p>Step 2: Choose store category:</p>
                <select
                    className="border   rounded-md p-2 w-full"
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    <option value="Skin care">Skin care</option>
                    <option value="Spa & Massage">Spa & Massage</option>
                    <option value="Hairdresser">Hairdresser</option>
                </select>
            </div>
        </>
    );
}

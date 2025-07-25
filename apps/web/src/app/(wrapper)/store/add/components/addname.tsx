interface AddNameProps {
    storeName: string;
    setStoreName: (name: string) => void;
}

export default function AddName({ storeName, setStoreName }: AddNameProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <section className="bg-[gray]/5 p-2 rounded-lg">
                    <p className="m-2">Step 1: Start by entering the store name:</p>
                    <input
                        className="border rounded-md p-2 w-full"
                        type="text"
                        placeholder="Store name"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                    />
                </section>
            </div>
        </>
    );
}

export default function AboutPage() {
    return (
        <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">About Prezy</h1>
                <p className="text-muted-foreground mb-8">
                    This is a platform for buying service gift cards.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Payment method 1</h3>
                        <p className="text-sm text-muted-foreground">Stripe</p>
                    </div>
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Payment method 2</h3>
                        <p className="text-sm text-muted-foreground">Swish</p>
                    </div>
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Payment method 3</h3>
                        <p className="text-sm text-muted-foreground">Stable coins</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

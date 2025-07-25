export default function HomePage() {
    return (
        <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Welcome to Prezy</h1>
                <p className="text-muted-foreground mb-8">
                    {'1. Select a store -> 2. Choose a services -> 3. Buy a gift card -> 4. Enjoy!'}
                </p>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Product 1</h3>
                        <p className="text-sm text-muted-foreground">
                            Gift card 30 minute massage.
                        </p>
                    </div>
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Product 1</h3>
                        <p className="text-sm text-muted-foreground">Gift card 1 hour massage.</p>
                    </div>
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Product 1</h3>
                        <p className="text-sm text-muted-foreground">Gift card custom amount.</p>
                    </div>
                </div> */}
                {/* 
                <div className="mt-8 p-6 bg-card border   rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Navigation</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Use the sidebar to navigate between different sections of the application.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Link href="/about" className="text-primary hover:underline">
                            About
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/contact" className="text-primary hover:underline">
                            Contact
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/analytics" className="text-primary hover:underline">
                            Analytics
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/documents" className="text-primary hover:underline">
                            Documents
                        </Link>
                        <span className="text-muted-foreground">•</span>
                        <Link href="/settings" className="text-primary hover:underline">
                            Settings
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

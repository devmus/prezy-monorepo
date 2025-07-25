import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted relative">
            {/* LanguageSwitcher positioned in top right */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageSwitcher />
            </div>

            {/* Center content */}
            <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
                <div className="text-center space-y-8 p-8">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                            <span className="text-primary-foreground font-bold text-2xl">P</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Prezy</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Get your gift cards here. A modern platform for managing and purchasing
                            gift cards.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/home"
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Start here
                        </Link>
                        {/* <Link
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3 border   rounded-lg font-medium hover:bg-muted transition-colors"
                    >
                        Learn More
                    </Link> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                        <div className="p-6 bg-card border   rounded-lg">
                            <h3 className="font-semibold mb-2">Easy to Use</h3>
                            <p className="text-sm text-muted-foreground">
                                Simple and intuitive interface for managing your gift cards.
                            </p>
                        </div>
                        <div className="p-6 bg-card border   rounded-lg">
                            <h3 className="font-semibold mb-2">Secure</h3>
                            <p className="text-sm text-muted-foreground">
                                Your gift cards are protected with industry-standard security.
                            </p>
                        </div>
                        <div className="p-6 bg-card border   rounded-lg">
                            <h3 className="font-semibold mb-2">Fast</h3>
                            <p className="text-sm text-muted-foreground">
                                Quick and efficient gift card processing and delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

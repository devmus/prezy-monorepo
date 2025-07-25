export default function ContactPage() {
    return (
        <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Contact us</h1>
                <p className="text-muted-foreground mb-8">Use the form below to contact us.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-card border   rounded-lg">
                        <h3 className="font-semibold mb-2">Contact form</h3>
                        <p className="text-sm text-muted-foreground">
                            Refunds, complaints, suggestions, etc.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

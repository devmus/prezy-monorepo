import AuthButton from '@/components/AuthButton';

export default function LoginPage() {
    return (
        <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Log in</h1>
                <p className="text-muted-foreground mb-8">Create an account to get started.</p>
                <AuthButton />
            </div>
        </div>
    );
}

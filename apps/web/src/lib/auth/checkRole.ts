import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@prezy/db';
import { authOptions } from '@prezy/auth';
import { User } from '@prezy/models';
import { UserRole } from '@prezy/types';

// Define the type for the lean user object
interface LeanUser {
    _id: string;
    email: string;
    name?: string;
    role: 'user' | 'shopkeeper' | 'admin';
    language: 'en' | 'sv' | 'th';
}

// Define the return type for requireRole function
type RequireRoleResult =
    | { authorized: true; user: LeanUser }
    | { authorized: false; error: string };

/**
 * Check if user is authenticated and has the required role.
 */
export async function requireRoles(roles: UserRole[]): Promise<RequireRoleResult> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return { authorized: false, error: 'Unauthorized: No session' };
    }

    await connectToDatabase();

    const user = (await User.findOne({ email: session.user.email }).lean()) as LeanUser | null;

    if (!user) {
        return { authorized: false, error: 'Unauthorized: User not found' };
    }

    if (!roles.includes(user.role)) {
        return { authorized: false, error: `Requires role: ${roles.join(' or ')}` };
    }

    return { authorized: true, user };
}

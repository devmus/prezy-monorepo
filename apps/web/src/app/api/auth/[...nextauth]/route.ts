import NextAuth from 'next-auth';
import { authOptions } from '@prezy/auth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

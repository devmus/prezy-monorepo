// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//     /* config options here */
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'images.unsplash.com',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'images.pexels.com',
//                 pathname: '/**',
//             },
//         ],
//     },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: ['@prezy/types', '@prezy/db', '@prezy/models', '@prezy/auth'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;

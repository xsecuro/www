import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' *.vercel.app *.yandex.net *.google-analytics.com;
                            style-src 'self' 'unsafe-inline';
                            img-src 'self' data: *.yandex.ru *.google-analytics.com;
                            connect-src 'self';
                        `.replace(/\s+/g, ' '),
                    },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ]
    },
}

export default nextConfig

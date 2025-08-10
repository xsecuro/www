import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { clsx } from 'clsx'
import type { Metadata, Viewport } from 'next'
import { FC, PropsWithChildren } from 'react'
import { geist } from './fonts'
import { RootProvider } from './providers/provider'
import './styles.css'

export const metadata: Metadata = {
    title: 'securo.',
    description: 'Online password generator with support for segmentation, settings, different algorithms and API',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

const RootLayout: FC = ({ children }: PropsWithChildren) => {
    return (
        <html lang="en" className="hide-scrollbar h-full w-full" suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#0a0a0a" />
            </head>
            <body
                className={clsx(
                    geist.className,
                    'bg-background text-foreground flex h-full w-full flex-col antialiased',
                )}
            >
                <RootProvider>{children}</RootProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}

RootLayout.displayName = 'RootLayout'

export default RootLayout

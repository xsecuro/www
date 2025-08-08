'use client'

import { HeaderWidget } from '@/widgets/header'
import { useTheme } from 'next-themes'
import { FC, PropsWithChildren, useEffect } from 'react'

const ContentProvider: FC<PropsWithChildren> = ({ children }) => {
    const { theme } = useTheme()

    useEffect(() => {
        const metaThemeColor = document.querySelector("meta[name='theme-color']")
        console.log(theme)
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? 'oklch(1 0 0)' : 'oklch(0.145 0 0)')
        }
    }, [theme])

    return (
        <>
            <HeaderWidget />
            <main className="flex w-full flex-grow flex-col items-center justify-center">{children}</main>
        </>
    )
}

ContentProvider.displayName = 'ContentProvider'

export { ContentProvider }

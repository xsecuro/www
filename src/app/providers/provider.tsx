'use client'

import { FC, PropsWithChildren } from 'react'
import { ContentProvider } from './content'
import { ThemeProvider } from './theme-provider'

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ContentProvider>{children}</ContentProvider>
        </ThemeProvider>
    )
}

RootProvider.displayName = 'RootProvider'

export { RootProvider }

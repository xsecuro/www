'use client'

import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProviderProps } from 'next-themes'
import { FC, PropsWithChildren } from 'react'

const ThemeProvider: FC<PropsWithChildren<NextThemesProviderProps>> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

ThemeProvider.displayName = 'ThemeProvider'

export { ThemeProvider }

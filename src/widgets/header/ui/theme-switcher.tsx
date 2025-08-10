'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { SwatchBook } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'

interface ThemeSwitcherFeatureProps {
    className?: string
}

const ThemeSwitcherFeature: FC<ThemeSwitcherFeatureProps> = ({ className: rootClassName }) => {
    const { theme, setTheme } = useTheme()

    const toggleThemeHandler = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className={cn(rootClassName)}>
            <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-x-2" onClick={toggleThemeHandler}>
                        <SwatchBook className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={20}>Switch to {theme === 'dark' ? 'light' : 'dark'} theme</TooltipContent>
            </Tooltip>
        </div>
    )
}

ThemeSwitcherFeature.displayName = 'ThemeSwitcherFeature'

export { ThemeSwitcherFeature }

import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Tooltip } from '@/shared/ui/tooltip'
import { H1, H6 } from '@/shared/ui/typography'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { FC, useState } from 'react'
import { NavbarEntity } from './navbar'
import { ThemeSwitcherFeature } from './theme-switcher'

const HeaderWidget: FC = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    const showMenuHandler = () => {
        setMenuVisible(true)
    }

    const hideMenuHandler = () => {
        setMenuVisible(false)
    }

    return (
        <>
            <header className="bg-background/50 fixed flex w-full justify-center backdrop-blur-sm">
                <div className="flex w-full max-w-4xl items-end justify-between gap-x-12 p-6 sm:flex-row md:max-w-7xl md:p-12">
                    <div className="flex items-end gap-x-10">
                        <H1 className="text-primary sm:text-5xl">Securo.</H1>
                        <NavbarEntity mode="simple" />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button variant="ghost" className="flex items-center">
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-foreground size-5"
                            >
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <H6 className="text-muted-foreground text-sm">3.7k</H6>
                        </Button>
                        <Separator className="h-4" />
                        <div className="hidden lg:block">
                            <ThemeSwitcherFeature />
                        </div>
                        <div className="lg:hidden">
                            <Tooltip delayDuration={500}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-x-2"
                                        onClick={showMenuHandler}
                                    >
                                        <Menu className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={20}>Menu</TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </header>
            <AnimatePresence>
                {menuVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={hideMenuHandler}
                        className="minimal-scrollbar bg-background/90 absolute top-0 left-0 z-30 flex h-full w-full cursor-pointer flex-wrap items-center justify-center gap-12 overflow-y-scroll p-12 backdrop-blur-sm md:p-12"
                    >
                        <NavbarEntity mode="menu" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

HeaderWidget.displayName = 'HeaderWidget'

export { HeaderWidget }

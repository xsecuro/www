import { references } from '@/shared/config'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { FC } from 'react'
import { ThemeSwitcherFeature } from './theme-switcher'

interface NavbarProps {
    mode: 'simple' | 'menu'
}

const NavbarEntity: FC<NavbarProps> = ({ mode = 'simple' }) => {
    return (
        <div
            className={cn(
                'relative h-full w-full items-center justify-center',
                mode === 'simple' ? 'hidden lg:flex' : 'flex flex-col',
            )}
        >
            <nav className={cn(mode === 'simple' ? 'hidden lg:block' : 'flex flex-col')}>
                {Object.entries(references).map(([referenceKey, referenceValue], index) => {
                    if (mode === 'simple' && referenceKey === 'home') return

                    return (
                        <Button key={index} variant="link" className="fownt-black text-base">
                            {referenceValue.label}
                        </Button>
                    )
                })}
            </nav>
            {mode === 'menu' && <ThemeSwitcherFeature className="absolute bottom-1/5" />}
        </div>
    )
}

NavbarEntity.displayName = 'NavbarEntity'

export { NavbarEntity }

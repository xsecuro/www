import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H1 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h1'>>(({ className, ...props }, ref) => (
    <h1
        className={cn('scroll-m-20 text-balance text-4xl font-extrabold tracking-tight', className)}
        ref={ref}
        {...props}
    />
))

H1.displayName = 'H1'

export { H1 }

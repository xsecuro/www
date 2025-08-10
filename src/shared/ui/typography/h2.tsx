import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H2 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h2'>>(({ className, ...props }, ref) => (
    <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight', className)} ref={ref} {...props} />
))

H2.displayName = 'H2'

export { H2 }

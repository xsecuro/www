import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H3 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h3'>>(({ className, ...props }, ref) => (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} ref={ref} {...props} />
))

H3.displayName = 'H3'

export { H3 }

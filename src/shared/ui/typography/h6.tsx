import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H6 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h6'>>(({ className, ...props }, ref) => (
    <h6 className={cn('scroll-m-20 text-base font-semibold tracking-tight', className)} ref={ref} {...props} />
))

H6.displayName = 'H6'

export { H6 }

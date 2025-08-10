import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H4 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h4'>>(({ className, ...props }, ref) => (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} ref={ref} {...props} />
))

H4.displayName = 'H4'

export { H4 }

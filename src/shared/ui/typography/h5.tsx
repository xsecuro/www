import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const H5 = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h5'>>(({ className, ...props }, ref) => (
    <h5 className={cn('scroll-m-20 text-lg font-semibold tracking-tight', className)} ref={ref} {...props} />
))

H5.displayName = 'H5'

export { H5 }

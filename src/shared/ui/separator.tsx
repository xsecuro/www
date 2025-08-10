import { cn } from '@/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const separatorVariants = cva('bg-muted-foreground/20 min-h-px min-w-px', {
    variants: {
        variant: {
            default: 'h-full w-px',
            horizontal: 'h-px w-full',
        },
    },
})

function Separator({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof separatorVariants>) {
    return <div className={cn(separatorVariants({ variant, className }))} {...props} />
}

Separator.displayName = 'Separator'

export { Separator }

import { ReferenceKey } from '../types/references'

interface ReferenceValue {
    label: string
    href: string
    child?: Array<ReferenceValue> | ReferenceValue
}

type References = Record<ReferenceKey, ReferenceValue>

export const references: References = {
    home: {
        label: 'Home',
        href: '/',
    },
    about: {
        label: 'About',
        href: '/about',
    },
    algorithm: {
        label: 'Algorithm',
        href: '/algorithm',
        child: [
            {
                label: 'BlumBlumShub',
                href: '/algorithm/blumblumshub',
            },
        ],
    },
    docs: {
        label: 'Docs',
        href: '/docs',
        child: {
            label: 'Api',
            href: '/api',
        },
    },
}

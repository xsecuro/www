import { Geist } from 'next/font/google'
import localFont from 'next/font/local'

const dmMono = localFont({
    src: [
        {
            path: '../../public/fonts/DM_Mono/DMMono-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/DM_Mono/DMMono-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/DM_Mono/DMMono-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
    ],
    preload: true,
})

const geist = Geist({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export { dmMono, geist }

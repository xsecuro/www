import { PasswordEntity } from '@/entities/password'
import { GenerationParametersFeature } from '@/features/generation-parameters'
import { PasswordActionsFeature } from '@/features/password-actions'
import { Button } from '@/shared/ui/button'
import { H1, H5 } from '@/shared/ui/typography'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
    title: 'Home page',
    description: 'Our algorithms will ensure your safety. Configure the password generation method',
}

const HomePage: FC = () => {
    return (
        <section className="flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-16 p-6 md:max-w-7xl md:p-12">
            <div className="flex flex-col items-center gap-y-5">
                <H1 className="text-center text-3xl sm:text-4xl">Generation passwords</H1>
                <H5 className="text-center sm:w-2/3">
                    Our algorithms will ensure your safety. Configure the password generation method
                </H5>
                <div className="flex gap-x-2">
                    <Button>Get started</Button>
                    <Button variant="outline">Algorithms</Button>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-y-3">
                <PasswordEntity />
                <PasswordActionsFeature />
            </div>
            <GenerationParametersFeature />
        </section>
    )
}

HomePage.displayName = 'HomePage'

export default HomePage

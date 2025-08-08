'use client'

import { $password, setPassword } from '@/entities/password'
import { $generationParameters } from '@/features/generation-parameters'
import { setGenerationParametersVisible } from '@/features/generation-parameters/model/generation-parameters'
import { generatePassword } from '@/shared/lib/password/generator'
import { Alert, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { H6 } from '@/shared/ui/typography'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { BoltIcon, FlameIcon, Layers2Icon } from 'lucide-react'
import { FC, useState } from 'react'

const PasswordActionsFeature: FC = () => {
    const password = useUnit($password)
    const generationParameters = useUnit($generationParameters)
    const [isCopied, setIsCopied] = useState(false)

    const refreshHandler = () => {
        const newPassword = generatePassword(generationParameters)
        setPassword(newPassword)
    }

    const copyHandler = async () => {
        try {
            await navigator.clipboard.writeText(password)
            setIsCopied(true)

            const timeout = setTimeout(() => {
                setIsCopied(false)
            }, 2000)

            return () => clearTimeout(timeout)
        } catch (error) {
            console.error('Failed to copy password to clipboard', error)
        }
    }

    const showGenerationParametersHandler = () => {
        setGenerationParametersVisible(true)
    }

    return (
        <div>
            <AnimatePresence>
                {isCopied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-5 right-5"
                    >
                        <Alert className="flex items-center [&>svg]:size-5">
                            <AlertTitle>
                                <H6>Password copied to clipboard</H6>
                            </AlertTitle>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    onClick={refreshHandler}
                    className="group hover:bg-transparent dark:hover:bg-transparent"
                >
                    <FlameIcon className="size-7 transition-colors duration-500 group-hover:text-orange-400" />
                    <H6 className="hidden transition-colors duration-500 group-hover:text-orange-400 md:inline">
                        Refresh
                    </H6>
                </Button>
                <Button
                    variant="ghost"
                    onClick={copyHandler}
                    className="group hover:bg-transparent dark:hover:bg-transparent"
                >
                    <Layers2Icon className="size-7 transition-colors duration-500 group-hover:text-teal-400" />
                    <H6 className="hidden transition-colors duration-500 group-hover:text-teal-400 md:inline">Copy</H6>
                </Button>
                <Button
                    variant="ghost"
                    onClick={showGenerationParametersHandler}
                    className="group hover:bg-transparent dark:hover:bg-transparent"
                >
                    <BoltIcon className="size-7 transition-colors duration-500 group-hover:text-red-400" />
                    <H6 className="hidden transition-colors duration-500 group-hover:text-red-400 md:inline">
                        Settings
                    </H6>
                </Button>
            </div>
        </div>
    )
}

PasswordActionsFeature.displayName = 'PasswordActionsFeature'

export { PasswordActionsFeature }

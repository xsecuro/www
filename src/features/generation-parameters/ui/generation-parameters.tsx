'use client'

import { Checkbox } from '@/shared/ui/checkbox'
import { GenerationCharacterKey } from '@xsecuro/core'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import {
    $generationParameters,
    $generationParametersVisible,
    setGenerationParameters,
    setGenerationParametersVisible,
} from '../model/generation-parameters'

interface ParameterCheckboxProps {
    label: string
    isChecked: boolean
    onChange: () => void
}

const ParameterCheckbox = ({ label, isChecked, onChange }: ParameterCheckboxProps) => {
    return (
        <div className='flex items-center gap-2'>
            <Checkbox checked={isChecked} onCheckedChange={onChange} />
            <span>{label}</span>
        </div>
    )
}

const parameterLabels = {
    digits: 'Use digits',
    lowercaseLetters: 'Use lowercase letters',
    uppercaseLetters: 'Use uppercase letters',
    specialSymbols: 'Use special symbols',
} as const

type ParameterKey = 'digits' | 'lowercaseLetters' | 'uppercaseLetters' | 'specialSymbols'

const GenerationParametersFeature: FC = () => {
    const generationParametersVisible = useUnit($generationParametersVisible)
    const generationParameters = useUnit($generationParameters)

    const hideGenerationParametersHandler = () => {
        setGenerationParametersVisible(false)
    }

    const toggleParameterHandler = (segmentIndex: number, parameterKey: GenerationCharacterKey) => {
        const requirements = Array.isArray(generationParameters.requirements)
            ? generationParameters.requirements
            : [generationParameters.requirements]

        const updatedRequirements = requirements.map((requirement, index) =>
            index === segmentIndex
                ? {
                      ...requirement,
                      [parameterKey]: {
                          ...requirement[parameterKey],
                          include: !requirement[parameterKey].include,
                      },
                  }
                : requirement,
        )

        setGenerationParameters({
            ...generationParameters,
            requirements: updatedRequirements,
        })
    }

    const requirements = Array.isArray(generationParameters.requirements)
        ? generationParameters.requirements
        : [generationParameters.requirements]

    return (
        <AnimatePresence>
            {generationParametersVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={hideGenerationParametersHandler}
                    className='minimal-scrollbar bg-background/90 absolute top-0 left-0 z-30 flex h-full w-full cursor-pointer flex-wrap items-center justify-center gap-12 overflow-y-scroll p-12 backdrop-blur-sm md:p-12'
                >
                    {requirements.map((requirement, segmentIndex) => (
                        <div key={segmentIndex} className='flex flex-col gap-2' onClick={(e) => e.stopPropagation()}>
                            <h3 className='font-medium'>Segment {segmentIndex + 1}</h3>
                            <div className='flex flex-col gap-2'>
                                {Object.entries(parameterLabels).map(([parameterKey, parameterLabel], index) => (
                                    <ParameterCheckbox
                                        key={index}
                                        label={parameterLabel}
                                        isChecked={requirement[parameterKey as GenerationCharacterKey].include}
                                        onChange={() =>
                                            toggleParameterHandler(segmentIndex, parameterKey as GenerationCharacterKey)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

GenerationParametersFeature.displayName = 'GenerationParametersFeature'

export { GenerationParametersFeature }

import { passwordCharacters } from '@/shared/config/constants'
import { algorithmFactory } from '@/shared/lib/password/generator'
import { GenerationParameters } from '@xsecuro/core'
import { createEvent, createStore } from 'effector'

const BBSAlgorithm = algorithmFactory.get('BBS')

const initialGenerationParameters: GenerationParameters = {
    algorithm: BBSAlgorithm,
    separator: 'hyphen',
    requirements: Array(3).fill({
        length: 7,
        digits: {
            raw: passwordCharacters.digits,
            include: true,
        },
        lowercaseLetters: {
            raw: passwordCharacters.lowercaseLetters,
            include: true,
        },
        uppercaseLetters: {
            raw: passwordCharacters.uppercaseLetters,
            include: true,
        },
        specialSymbols: {
            raw: passwordCharacters.specialSymbols,
            include: false,
        },
    }),
}

export const setGenerationParameters = createEvent<GenerationParameters>()
export const $generationParameters = createStore<GenerationParameters>(initialGenerationParameters)

$generationParameters.on(setGenerationParameters, (state, payload) => ({
    ...state,
    ...payload,
}))

export const setGenerationParametersVisible = createEvent<boolean>()
export const $generationParametersVisible = createStore<boolean>(false)

$generationParametersVisible.on(setGenerationParametersVisible, (_, payload) => payload)

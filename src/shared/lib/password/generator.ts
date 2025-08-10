import { AlgorithmFactory, GenerationParameters, Generator } from '@xsecuro/core'

export const algorithmFactory = new AlgorithmFactory()

export function generatePassword(parameters: GenerationParameters): string {
    const generator = new Generator(parameters)
    return generator.generate()
}

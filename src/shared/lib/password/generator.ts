import { AlgorithmFactory, GenerationParameters, Generator } from '@x-securo/core'

export const algorithmFactory = new AlgorithmFactory()

export function generatePassword(parameters: GenerationParameters): string {
    const generator = new Generator(parameters)
    return generator.generate()
}

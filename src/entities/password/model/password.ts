import { createEvent, createStore } from 'effector'

const initialPassword: string = ''

export const setPassword = createEvent<string>()
export const $password = createStore<string>(initialPassword)

$password.on(setPassword, (_, password) => password)

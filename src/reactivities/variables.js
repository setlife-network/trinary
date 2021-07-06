import { makeVar } from '@apollo/client'

export const authUser = makeVar(false)
export const sessionUser = makeVar({})
export const pageName = makeVar('')

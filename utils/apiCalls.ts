import { Me } from 'types'
import { User } from '@prisma/client'

type CreateUser = (data: { handle: string; email: string }, callback?: () => void) => Promise<User>;

export const createUser: CreateUser = async (data, callback) => {
  const resp = await fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const { newUser } = await resp.json()
  callback && callback()
  return newUser
}

type GetMe = (callback?: () => void) => Promise<Me>;

export const getMe: GetMe = async (callback) => {
  const resp = await fetch('/api/users/get_me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const user = await resp.json()
  callback && callback()
  return user
}
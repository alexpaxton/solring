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
  console.log('user created!', newUser)
  callback && callback()
  return newUser
}

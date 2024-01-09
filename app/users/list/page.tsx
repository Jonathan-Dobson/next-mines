'use server';

import { prisma } from '@/prisma'

export default async function Page() {
  const users = await prisma.user.findMany()


  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

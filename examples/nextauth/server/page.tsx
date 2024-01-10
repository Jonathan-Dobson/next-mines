'use server';

import { prisma } from '@/prisma'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth'


export default async function ServerPage() {
  const session = await getServerSession(authOptions)
  const users = await prisma.user.findMany()
  console.log('/users/list', session);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.length === 0 ? <li>No users found</li> :
            users.map((user: any) => (
              <li key={user.id}>
                <a href={`/users/${user.id}`}>{user.name}</a>
              </li>
            ))
        }
      </ul>
    </div>
  )
}

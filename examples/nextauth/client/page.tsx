'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ClientPage() {
  const { data: session, status } = useSession()
  console.log('client', session, status);


  if (status === 'loading') return (<div>Loading...</div>)
  if (status === 'authenticated') return (<div><pre>{JSON.stringify(session)}</pre></div>)
  return (<div><Link href='/api/auth/signin'>Sign In</Link></div>)
}

'use client'

import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { ImSpinner } from "react-icons/im";

export default function withUserSession(
  WithUser: (session: Session | null) => JSX.Element, WithoutUser: JSX.Element, Loading?: JSX.Element) {
  return function UserSessionComponent() {
    const { data: session, status } = useSession()

    if (status === 'loading') return Loading || <ImSpinner className="icon-spin" />
    if (status === 'authenticated') return WithUser(session) || ''

    return WithoutUser || ''
  }
}
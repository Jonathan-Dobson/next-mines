'use client'

import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { ImSpinner } from "react-icons/im";
import React from 'react';

type Props = {
  children: any
}

export const AuthUser = (props: Props) => {
  const { data: session, status } = useSession()
  const Element = props.children || null
  if (status !== 'loading' && session && Element) return Element || null
  return <span></span>
}

export const NoAuthUser = (props: Props) => {
  const { data: session, status } = useSession()

  if (status !== 'loading' && !session) return props.children || null
  return <span></span>
}

export const AuthLoading = (props: Props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') return props.children || <ImSpinner className="icon-spin" />
  return <span></span>
}

export { useSession }
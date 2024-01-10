'use client'

import Link from 'next/link'
import AuthGate from './AuthGate'
import Image from 'next/image'
import AvatarSkeleton from './AvatarSkeleton'
import { useState } from 'react'
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";



export default function User() {
  const [opened, setOpened] = useState(false)
  const [hover, setHover] = useState(false)

  const SignInOrOut = AuthGate(
    () => <div></div>,
    <Link href='/api/auth/signin'>Sign In</Link>,
    <div></div>
  )

  const Avatar = AuthGate(
    (session) => <Image src={session?.user?.image || ''}
      className="avatar" alt={session?.user?.name || ''}
      width={40} height={40}
      loading='eager'
      priority={true}
    />,
    <div></div>,
    <AvatarSkeleton />
  )

  const FullName = AuthGate(
    (session) => <h4>{session?.user?.name}</h4>,
    <h4></h4>,
    <h4></h4>
  )

  return (
    <div>
      <SignInOrOut />
      <div style={{ cursor: 'pointer' }} role='button' onClick={() => setOpened(true)}
        title='User Profile'
      ><Avatar /></div>
      {
        opened && <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
        }} onClick={() => setOpened(false)}
        >
          <div style={{
            position: 'absolute',
            top: 50,
            right: 10,
            color: 'black',
            backgroundColor: 'darkgray',
            border: '1px solid black',
            borderRadius: 4,
            padding: 8,
            zIndex: 1000,


          }}>
            <div style={{}}>
              <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => setOpened(false)}>
                <span onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >{hover ? <IoCloseCircle /> : <IoCloseCircleOutline />}</span>
              </div>
              <FullName />

              <Link href='/api/auth/signout'>Sign Out</Link>
            </div>
          </div>
        </div>
      }
    </div >
  )

}

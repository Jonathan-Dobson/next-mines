'use client';

import Link from 'next/link'
import User from './User'
import { ImSpinner } from "react-icons/im";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {

    return () => setLoading(false)


  }, [pathname])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <nav style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>

        <Link onClick={() => pathname !== '/' && setLoading(true)} href="/">Home</Link>
        <Link onClick={() => pathname !== '/leader-board' && setLoading(true)} href='/leader-board'>Leader board</Link>
        <Link onClick={() => pathname !== '/how-to-play' && setLoading(true)} href='/how-to-play'>How to Play</Link>
        <Link onClick={() => pathname !== '/play-now' && setLoading(true)} href='/play-now'>Play Now</Link>

      </nav>
      <User />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
        display: loading ? 'flex' : 'none',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(22,0,0,0.6)',
      }}
      >
        <ImSpinner className="icon-spin" />
      </div>
    </div>
  )
}

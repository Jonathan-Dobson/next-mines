'use client';

import { ReactNode } from 'react';

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
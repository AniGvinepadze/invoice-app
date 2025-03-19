import Login from '@/app/components/organsms/Login/Login'
import React, { Suspense } from 'react'

export default function LoginPage() {
  return (
       <Suspense fallback={<div>Loading...</div>}>
    <main className='w-full'>
        <Login/>
    </main>
    </Suspense>
  )
}

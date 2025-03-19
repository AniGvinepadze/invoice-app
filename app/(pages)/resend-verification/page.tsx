import ResendVerification from '@/app/components/organsms/ResendVerification/ResendVerification'
import React, { Suspense } from 'react'

export default function ResendVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <main className='w-full'>
     <ResendVerification/>
    </main>

    </Suspense>
  )
}

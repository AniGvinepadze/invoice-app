"use client"
import Verify from '@/app/components/organsms/Verify/Verify'
import React from 'react'
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className='w-full'>
     <Verify/>
    </main>
    </Suspense>

  )
}

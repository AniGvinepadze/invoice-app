import React from 'react'
import LoginHeader from '../../atoms/LoginHeader/LoginHeader'
import LogingIcon from '../../atoms/LoginIcon/LoginIcon.'
import ResendVerificationForm from './ResendVerificationForm'

export default function ResendVerification() {
  return (
    <>
        <div>
        <LoginHeader />
      </div>
      <div className="flex h-screen p-3 gap-4 items-center justify-center">
        <LogingIcon />
        <ResendVerificationForm/>
      </div>

    </>
  )
}

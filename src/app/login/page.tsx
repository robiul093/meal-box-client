import LoginForm from '@/components/module/auth/login/LoginForm'
import React, { Suspense } from 'react'


export default function LoginPage() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

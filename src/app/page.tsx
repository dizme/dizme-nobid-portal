import { getServerSession } from 'next-auth'
import Login from '@/components/Login'
import { authOptions } from '@/auth/config'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Welcome to Credential Issuer
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Please log in to view and issue credentials
          </p>
        </div>
        <div className='flex justify-center items-center'><Login /></div>
      </div>
    </div>
  )
}

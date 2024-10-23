'use client'

import { useUser } from '@/application/state/contexts/user-context'

export const UserCard = () => {
  const { user } = useUser()

  return (
    <div className='flex flex-col items-center justify-center space-y-4 p-5'>
      <img src={user?.avatar} alt='avatar' className='h-32 w-32 rounded-full' />
      <h1 className='text-3xl font-bold'>{user?.name}</h1>
      <p className='text-xl'>{user?.email}</p>
    </div>
  )
}

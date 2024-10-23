import { Suspense } from 'react'
import { Form } from './form'
import { ProductsList } from './products-list'
import { UserCard } from './user-card'

export const View = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-4 p-5'>
      <h1 className='text-3xl font-bold'>Hello world!</h1>
      <Form />

      <div className='flex gap-8'>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
        <UserCard />
      </div>
    </div>
  )
}

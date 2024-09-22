'use client'

import { Button } from '@/components/ui/button'
import { LucideMinus, LucidePlus } from 'lucide-react'
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex items-center gap-2.5'>
        {' '}
        <Button onClick={() => setCount(count - 1)}>
          <LucideMinus className='size-4' />
        </Button>
        <Button onClick={() => setCount(count + 1)}>
          <LucidePlus className='size-4' />
        </Button>
      </div>

      <h3 className='text-2xl'>
        Counter is: <span className='text-red-500'>{count}</span>
      </h3>
    </>
  )
}

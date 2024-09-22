import { Counter } from './counter'

export default function Home() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-4 p-5'>
      <h1 className='text-3xl font-bold'>Hello world!</h1>

      <Counter />
    </div>
  )
}

import { callFetchProducts } from '@/app/http'
import type { Product } from '@/application/@types/entities/product'

export const ProductsList = async () => {
  const products: Product[] = await callFetchProducts({})

  return (
    <ul className='h-[200px] overflow-y-auto'>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>
      })}
    </ul>
  )
}

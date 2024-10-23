import { FetchProductsAction } from '@/core/actions/profile/FetchProductsAction'
import type { Product } from '@/infra/@types/Product'

export const ProductsList = async () => {
  const products: Product[] = await FetchProductsAction({})

  return (
    <ul className='h-[200px] overflow-y-auto'>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>
      })}
    </ul>
  )
}

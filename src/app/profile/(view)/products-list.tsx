import type { Product } from '@/infra/@types/entities/Product'
import { FetchProductsGateway } from '@/infra/gateways/FetchProductsGateway'

export const ProductsList = async () => {
  const products: Product[] = await FetchProductsGateway({})

  return (
    <ul className='h-[200px] overflow-y-auto'>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>
      })}
    </ul>
  )
}

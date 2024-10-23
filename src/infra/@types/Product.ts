export type Product = {
  id: string
  title: string
  price: string
  description: string
  images: string[]
  updatedAt: string
  creationAt: string
  category: {
    creationAt: string
    id: string
    image: string
    name: string
    updatedAt: string
  }
}

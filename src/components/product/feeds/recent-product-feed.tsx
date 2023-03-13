import ProductsBlockCarousel from '@containers/products-block-carousel'
import { useProductsQuery } from '@framework/product/get-all-products-2'

export default function RecentProductFeed({ products }: any) {
  const limit = 5
  const { isLoading } = useProductsQuery({
    limit: 10,
  })

  return (
    <ProductsBlockCarousel
      sectionHeading='Recently View Products'
      products={products}
      loading={false}
      error={false}
      uniqueKey='new-arrivals'
      type='grid'
      className='mb-12 md:mb-14 xl:mb-16'
      imgWidth={344}
      imgHeight={344}
    />
  )
}

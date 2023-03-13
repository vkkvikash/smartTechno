import { useState, useEffect } from "react"
import SectionHeader from '@components/common/section-header'
import ProductsBlock from '@containers/products-block'
// import { useProductsQuery } from '@framework/product/get-all-products-2'
import { Tab } from '@headlessui/react'
// import { useTranslation } from 'next-i18next'
import { ProductJSONMaker } from "../../../api/service"

const NewArrivalsProductFeedWithTabs: React.FC<any> = ({ products }) => {
  // const { t } = useTranslation('common')
  const [itemList, setItemList] = useState<any>([]);
  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      products.map((item: any) => {
        const prodcutList: any = ProductJSONMaker(item.products)
        let obj = {
          id: item.id,
          title: item.title,
          slug: item.slug,
          products: prodcutList
        }
        setItemList((oldArray: any) => [...oldArray, obj])
      })
    }
    return () => {
      isApiSubscribed = false;
      setItemList([])
    }

  }, [products])
  return (
    <div className='mb-12 md:mb-14 xl:mb-16'>
      <SectionHeader
        sectionHeading='Top Selling Products'
        className='pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5'
      />

      <Tab.Group as='div' className=''>
        <Tab.List as='ul' className='tab-ul'>
          {itemList.map((item: any) => {
            return (<Tab
              as='li'
              className={({ selected }) =>
                selected ? 'tab-li-selected' : 'tab-li'
              }
            >
              <p>{item.title}</p>
            </Tab>)
          })}

          {/* <Tab
            as='li'
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-mens-collection')}</p>
          </Tab>
          <Tab
            as='li'
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-womens-collection')}</p>
          </Tab>
          <Tab
            as='li'
            className={({ selected }) =>
              selected ? 'tab-li-selected' : 'tab-li'
            }
          >
            <p>{t('tab-kids-collection')}</p>
          </Tab> */}
        </Tab.List>

        <Tab.Panels>
          {itemList.length ? itemList.map((item: any) => {
            return (<Tab.Panel>
              <ProductsBlock
                products={item.products}
                loading={false}
                error={false}
                uniqueKey='new-arrivals'
                variant='grid'
                imgWidth={435}
                imgHeight={435}
              />
            </Tab.Panel>)
          }) : null}

          {/* <Tab.Panel>
            <ProductsBlock
              products={products.length < 4 ? products : (products.length > 4 && products.length < 12) ? products?.slice(4, products.length - 1) : (products.length > 4 && products.length > 12) ? products?.slice(4, 12) : products}
              loading={false}
              error={false}
              uniqueKey='new-arrivals'
              variant='gridModernWide'
              imgWidth={435}
              imgHeight={435}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ProductsBlock
              // products={products?.slice(8, 16)}
              products={products.length < 8 ? products : (products.length > 8 && products.length < 16) ? products?.slice(8, products.length - 1) : (products.length > 8 && products.length > 16) ? products?.slice(8, 16) : products}
              loading={false}
              error={false}
              uniqueKey='new-arrivals'
              variant='gridModernWide'
              imgWidth={435}
              imgHeight={435}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ProductsBlock
              // products={dummyData?.slice(14, 22)}
              products={products.length < 14 ? products : (products.length > 14 && products.length < 22) ? products?.slice(14, products.length - 1) : (products.length > 14 && products.length > 22) ? products?.slice(8, 16) : products}
              loading={false}
              error={false}
              uniqueKey='new-arrivals'
              variant='gridModernWide'
              imgWidth={435}
              imgHeight={435}
            />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default NewArrivalsProductFeedWithTabs

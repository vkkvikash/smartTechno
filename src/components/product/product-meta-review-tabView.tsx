import { useState } from "react";
import { Tab } from '@headlessui/react'
import ReviewForm from "@components/common/form/review-form";
import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";

interface Props {
  data: any;
}

const ProductMetaReviewTabView: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);

  console.log('itemList ori--', data);
  return (
    <>
      <div className='mb-12 md:mb-14 xl:mb-16'>
        <SectionHeader
          sectionHeading='Product Details'
          className='pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5'
        />

        <Tab.Group as='div' className=''>
          <Tab.List as='ul' className='tab-ul'>
            {data.map((item: any) => {
              return (<Tab
                as='li'
                className={({ selected }) =>
                  selected ? 'tab-li-selected' : 'tab-li'
                }
              >
                <p>{item.title}</p>
              </Tab>)
            })}
          </Tab.List>

          <Tab.Panels>
            {data.length ? data.map((item: any) => {
              return (<Tab.Panel>
                {/* <ProductsBlock
                products={item.content}
                loading={false}
                error={false}
                uniqueKey='new-arrivals'
                variant='grid'
                imgWidth={435}
                imgHeight={435}
              /> */}
                {item.content}
              </Tab.Panel>)
            }) : null}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProductMetaReviewTabView;

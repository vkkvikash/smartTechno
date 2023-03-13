import React, { useState, useEffect } from "react"
import Card from '@components/common/card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import CardLoader from '@components/ui/loaders/card-loader';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import { ROUTES } from '@utils/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import { submitAPI } from "../api/service"

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  type?: 'rounded' | 'circle';
  roundedItemCount?: number;
  roundedSpaceBetween?: number;
  imgSize?: 'large';
  demoVariant?: 'ancient';
  disableBorderRadius?: boolean;
}

const CategoryBlock: React.FC<CategoriesProps> = ({
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0',
  sectionHeading,
  type = 'circle',
  roundedItemCount,
  roundedSpaceBetween,
  imgSize,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const breakpoints = {
    '1720': {
      slidesPerView: roundedItemCount === 5 ? 5 : 8,
      spaceBetween: roundedSpaceBetween || 28,
    },
    '1400': {
      slidesPerView: roundedItemCount === 5 ? 5 : 7,
      spaceBetween: roundedSpaceBetween || 28,
    },
    '1024': {
      slidesPerView: roundedItemCount === 5 ? 4 : 6,
      spaceBetween: roundedSpaceBetween || 20,
    },
    '768': {
      slidesPerView: roundedItemCount === 5 ? 3 : 5,
      spaceBetween: roundedSpaceBetween || 20,
    },
    '500': {
      slidesPerView: roundedItemCount === 5 ? 2 : 4,
      spaceBetween: roundedSpaceBetween || 12,
    },
    '0': {
      slidesPerView: roundedItemCount === 5 ? 2 : 3,
      spaceBetween: roundedSpaceBetween || 12,
    },
  };

  const breakpointsCircle = {
    '1720': {
      slidesPerView: 8,
      spaceBetween: 48,
    },
    '1400': {
      slidesPerView: 7,
      spaceBetween: 32,
    },
    '1025': {
      slidesPerView: 6,
      spaceBetween: 28,
    },
    '768': {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    '500': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '0': {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  };

  const [response, setResponse] = useState<{ error: boolean; data: any[]; isLoading: boolean; errorMessage: string }>({
    error: true,
    data: [],
    isLoading: true,
    errorMessage: ""
  })
  useEffect(() => {
    let isApiSubscribe = true;
    async function getData() {
      const categories: any = await submitAPI({}, "GET", "get/main/category", {})
      if (categories.success) {
        isApiSubscribe = false;
        setResponse({
          error: false,
          data: categories.data.categories,
          isLoading: false,
          errorMessage: ""
        })
      } else {
        isApiSubscribe = false;
        setResponse({
          error: true,
          data: [],
          isLoading: false,
          errorMessage: "Data not found please try again later!"
        })
      }
    }
    if (isApiSubscribe === true) {
      getData()
    }


    return () => {
      isApiSubscribe = false;
    }
  }, [])

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {response.error ? (
        <Alert message={response.errorMessage} />
      ) : (
        <Carousel
          breakpoints={type === 'rounded' ? breakpoints : breakpointsCircle}
          buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
          autoplay={{
            delay: 3000,
          }}
        >
          {response.isLoading && response.data.length === 0
            ? Array.from({ length: roundedItemCount || 10 }).map((_, idx) => {
              if (type === 'rounded') {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                  </SwiperSlide>
                );
              }
              return (
                <SwiperSlide key={`card-circle-${idx}`}>
                  <CardLoader uniqueKey={`card-circle-${idx}`} />
                </SwiperSlide>
              );
            })
            : response.data?.map((category) => (
              <SwiperSlide key={`category--key-${category.id}`}>
                <Card
                  imgSize={imgSize}
                  item={{ image: category.image, name: category.title }}
                  href={`${ROUTES.CATEGORY}/${category.slug}`}
                  variant={type}
                  effectActive={true}
                  size={type === 'rounded' ? 'medium' : 'small'}
                  disableBorderRadius={disableBorderRadius}
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryBlock;

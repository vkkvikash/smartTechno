import React, { useState, useEffect } from "react"
import Card from '@components/common/card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import CardLoader from '@components/ui/loaders/card-loader';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
// import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { ROUTES } from '@utils/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import { submitAPI } from "../api/service"
import { useRouter } from "next/router";

interface BrandCategoriesProps {
    sectionHeading: string;
    className?: string;
    type?: 'rounded' | 'circle';
    roundedItemCount?: number;
    roundedSpaceBetween?: number;
    imgSize?: 'large';
    demoVariant?: 'ancient';
    disableBorderRadius?: boolean;
}

const BrandCategoryBlock: React.FC<BrandCategoriesProps> = ({
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
    const { query } = useRouter();
    const [catBrand, setCatBrand] = useState<any[]>([]);
    // const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isApiSubscribed = true;

        async function fetchProductData() {
            if (query.slug) {
                // setIsLoading(true)
                let data = new FormData();
                data.append("slug", query.slug);
                const brandData: any = await submitAPI(data, "POST", "get/category/details", { 'Content-Type': 'multipart/form-data' });
                setCatBrand(brandData.data.shop_by_brand)
            }

        }

        if (isApiSubscribed) {
            fetchProductData()
        }

        return () => {
            isApiSubscribed = false;
        }
    }, [query, query.slug])

    return (
        <div className={className}>
            <SectionHeader sectionHeading={sectionHeading} />
            <Carousel
                breakpoints={type === 'rounded' ? breakpoints : breakpointsCircle}
                buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
                autoplay={{
                    delay: 3000,
                }}
            >
                {catBrand.length === 0 ?
                    (<SwiperSlide key={`card-rounded`}>
                        <CardRoundedLoader uniqueKey={`card-rounded-`} />
                    </SwiperSlide>)
                    : catBrand?.map((category) => (
                        <SwiperSlide key={`category--key-${category.id}`}>
                            <Card
                                imgSize={imgSize}
                                item={{ image: category.image, name: category.title }}
                                href={`${ROUTES.BRANDS}/${category.slug}`}
                                variant={type}
                                effectActive={true}
                                size={type === 'rounded' ? 'medium' : 'small'}
                                disableBorderRadius={disableBorderRadius}
                            />
                        </SwiperSlide>
                    ))}
            </Carousel>

        </div>
    );
};

export default BrandCategoryBlock;

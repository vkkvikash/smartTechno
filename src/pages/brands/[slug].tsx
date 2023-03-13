import React, { useState, useEffect } from "react"
import Container from '@components/ui/container'
import Layout from '@components/layout/layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ROUTES } from '@utils/routes'
import { useRouter } from "next/router";
import Subscription from '@components/common/subscription'
import Instagram from '@components/common/instagram'
import BannerCarouselBlock from '@containers/banner-carousel-block'
import BannerSliderBlock from '@containers/banner-slider-block'
import BannerWithProducts from '@containers/banner-with-products'
import StickyBox from 'react-sticky-box';
import { BreadcrumbItems } from '@components/common/breadcrumb'
import ActiveLink from '@components/ui/active-link'
import { ShopFilters } from '@components/shop/filters'
import SearchTopBar from '@components/shop/top-bar'
import { BrandProductGrid } from '@components/product/brand-product-grid'
import { submitAPI } from "src/api/service"
import FormData from "form-data"

export default function Brands() {

    const [brandDetails, setBrandDetails] = useState<any>({});
    const [brandId, setBrandId] = useState(null)
    const { query } = useRouter();

    useEffect(() => {
        const getData = async () => {
            let data = new FormData();
            data.append("slug", query.slug);
            const brandData: any = await submitAPI(data, "POST", "get/brand/details", { 'Content-Type': 'multipart/form-data' });
            setBrandId(brandData.data.id)
            setBrandDetails(brandData.data)
        }
        if (query) {
            getData();
        }

    }, [query])
    return (
        <>

            {brandDetails?.banners?.banner_1 && <BannerSliderBlock banners={brandDetails.banners.banner_1} />}
            <Container className='border-b-2 border[#E6E6E6]'>
                {brandDetails?.banners?.banner_1 && <BannerCarouselBlock banners={brandDetails.banners.banner_2} />}
                {/* next section of featured product */}
                <BannerWithProducts
                    sectionHeading="text-on-selling-products"
                    categorySlug="/#"
                />
                {/* ------------------------------------------------------------------------------------------------ */}

                <>
                    <div className={`flex pt-8 pb-16 lg:pb-20`}>
                        <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
                            <StickyBox offsetTop={50} offsetBottom={20}>
                                <div className="pb-7">
                                    <BreadcrumbItems separator="/">
                                        <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                                            <a>{'breadcrumb-home'}</a>
                                        </ActiveLink>
                                        <ActiveLink href={ROUTES.SEARCH} activeClassName="font-semibold text-heading">
                                            <a className="capitalize">{'breadcrumb-search'}</a>
                                        </ActiveLink>
                                    </BreadcrumbItems>
                                </div>
                                <ShopFilters />
                            </StickyBox>
                        </div>

                        <div className="w-full lg:-ms-9">
                            <SearchTopBar />
                            {brandId !== null && <BrandProductGrid brandId={brandId} />}
                        </div>
                    </div>
                    <Subscription />
                </>
                <Instagram className='mb-4 md:mb-5 xl:mb-16' variant='rounded' />
                <Subscription className='bg-opacity-0 px-5 sm:px-16 xl:px-0 mb-12 md:mb-14 xl:mb-16 !py-0 !md:py-0 !lg:py-0' />
            </Container>
        </>
    );
}

Brands.Layout = Layout;



import Container from '@components/ui/container'
import Layout from '@components/layout/layout'
import { GetStaticProps } from 'next'
import ProductsFeatured from '@containers/products-featured'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ROUTES } from '@utils/routes'
import { homeSevenBanner as banner } from '@framework/static/banner'
import { collectionContemporaryData as collection } from '@framework/static/collection'
import BannerCard from '@components/common/banner-card'
import CollectionBlock from '@containers/collection-block'
import Subscription from '@components/common/subscription'
import Instagram from '@components/common/instagram'
import {
    contemporaryBanner1,
    contemporaryBanner2,
} from '@framework/static/banner'
import DownloadApps from '@components/common/download-apps'
import CustomSliderbypinkcitywala from '@components/common/CustomSlider/CustomSliderbypinkcitywala'
import ExclusiveBlock from '@containers/exclusive-block'
import FeatureBlock from '@containers/feature-block'
import SaleBannerGrid from '@containers/sale-banner-grid'
import { promotionBannerTwo as promotionBanners } from "@framework/static/banner";
import BannerCarouselBlock from '@containers/banner-carousel-block'
import BannerSliderBlock from '@containers/banner-slider-block'
import BannerWithProducts from '@containers/banner-with-products'
import ShopDiscount from '@components/shop/discount'
import StickyBox from 'react-sticky-box';
import { BreadcrumbItems } from '@components/common/breadcrumb'
import ActiveLink from '@components/ui/active-link'
import { ShopFilters } from '@components/shop/filters'
import SearchTopBar from '@components/shop/top-bar'
import { ProductGrid } from '@components/product/product-grid'

export default function FAQ() {

    return (
        <>

            <BannerSliderBlock />
            <Container className='border-b-2 border[#E6E6E6]'>
                <BannerCarouselBlock bannerData={promotionBanners} />
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
                            <ProductGrid />
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

FAQ.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "faq",
                "footer",
            ])),
        },
    };
};


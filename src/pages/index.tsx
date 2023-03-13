import { useState, useEffect } from "react"
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BrandBlock from "@containers/brand-block";
import Divider from "@components/ui/divider";
import Instagram from "@components/common/instagram";
import Subscription from "@components/common/subscription";
import HeroBlock from "@containers/hero-block";
import ExclusiveBlock from "@containers/exclusive-block";
import BannerCard from "@components/common/banner-card";
import { ROUTES } from '@utils/routes'
import SaleBannerGrid from "@containers/sale-banner-grid";
import TestimonialCarousel from "@containers/testimonial-carousel";
import BannerCarouselBlock from "@containers/banner-carousel-block";
import NewArrivalsProductFeedWithTabs from "@components/product/feeds/new-arrivals-product-feed-with-tabs";
import RecentProductFeed from "@components/product/feeds/recent-product-feed";
import { submitAPI, ProductJSONMaker } from "src/api/service"
import FormData from "form-data"
import CategoryBlock from "@containers/category-block";

export default function Home() {
	const [bannerArr, setBannerArr] = useState<any>({});
	const [exclusiveBannerArr, setExclusiveBannerArr] = useState<any>([]);
	const [testimonialsTwo, setTestimonialsTwo] = useState<any>([]);
	const [testimonials, setTestimonials] = useState<any>([]);
	const [productList, setProductList] = useState({
		recentProducts: [],
		collectionProducts: []
	});

	useEffect(() => {
		let isApiSubscribed = true;
		const getData = async () => {
			let data = new FormData();
			const homeBanners: any = await submitAPI(data, "GET", "get/home/banner", { 'Content-Type': 'multipart/form-data' });
			const exclusiveData: any = homeBanners.data.banners.banner_3;
			const testimonialsData = homeBanners.data.testimonials;
			setBannerArr(homeBanners.data);
			exclusiveData.map((item: any, i: any) => {
				let obj = {
					id: item?.id,
					slug: item?.slug,
					buttonText: item?.title,
					image: {
						imageMobile: item?.image?.mobile?.url,
						imageDesktop: item?.image?.desktop?.url
					},
					backgroundColor: i % 2 === 0 ? "bg-gray-150" : "bg-linenSecondary",
				}
				setExclusiveBannerArr((oldArray: any) => [...oldArray, obj]);
			})
			testimonialsData.map((item: any) => {
				let obj1 = {
					id: item?.id,
					avatar: {
						src: item?.user_profile,
						width: 420,
						height: 420,
					},
					rating: item?.rating,
					name: item?.name,
					text: item?.testimonial,
					company: item?.company_name
				}
				setTestimonialsTwo((oldArray: any) => [...oldArray, obj1]);
				setTestimonials((oldArray: any) => [...oldArray, obj1]);
			})
		}
		const getProductData = async () => {
			let data = new FormData();
			const productsData: any = await submitAPI(data, "GET", "get/home/collections?user_id=2", {});

			if (productsData.success) {
				const recentProductJson = ProductJSONMaker(productsData.data.recently_products);
				setProductList({
					recentProducts: recentProductJson,
					collectionProducts: productsData.data.collection_products
				})
			}
		}

		if (isApiSubscribed) {
			getData();
			getProductData();
		}
		return () => {
			isApiSubscribed = false;
		}

	}, [])
	return (
		<>
			{bannerArr?.banners?.banner_1 ? <HeroBlock banners={bannerArr.banners.banner_1} /> : null}
			<Container>
				<CategoryBlock sectionHeading="Shop By Category" type="rounded" />
			</Container>
			<Container>
				
				{productList.recentProducts.length ? <NewArrivalsProductFeedWithTabs products={productList.collectionProducts} /> : null}

				{exclusiveBannerArr.length && <ExclusiveBlock banners={exclusiveBannerArr} />}
				<BrandBlock sectionHeading="Top Brands" />
				{/* {bannerArr?.banners?.banner_4 && <BannerSliderBlock banners={bannerArr.banners.banner_4} />} */}

				{bannerArr?.banners?.banner_4 && <SaleBannerGrid data={bannerArr.banners.banner_4} />}
				{bannerArr?.banners?.banner_2 ? <BannerCarouselBlock banners={bannerArr.banners.banner_2} /> : null}
				{bannerArr?.banners?.banner_5.length && <BannerCard
					key={`banner--key1${bannerArr?.banners?.banner_5[0].id}`}
					banner={bannerArr?.banners?.banner_5[0]}
					href={`${ROUTES.COLLECTIONS}/${bannerArr?.banners?.banner_5[0].slug}`}
					className='mb-12 md:mb-14 xl:mb-16 pb-0.5 md:pb-0 lg:pb-1 xl:pb-0 md:-mt-2.5'
				/>}
				{productList.collectionProducts.length ? <RecentProductFeed products={productList.recentProducts} /> : null}
				{testimonialsTwo.length && <TestimonialCarousel sectionHeading="Testimonial" testimonialsTwo={testimonialsTwo} testimonials={testimonials} />}
				<Subscription />
				<br></br>
				<Instagram />
				<br></br>
			</Container>
			<Divider className="mb-0" />
		</>
	);
}

Home.Layout = Layout;


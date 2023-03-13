import { useState, useEffect } from "react"
import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout";
import CategoryBlock from "@containers/category-block";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import { ShopFilters } from '@components/shop/filters';
import StickyBox from 'react-sticky-box';
import { submitAPI } from "../api/service"

export default function AllCategories() {
	const [banners, setBanners] = useState({
		error: false,
		data: [],
		isLoading: false,
		errorMessage: ""
	});


	useEffect(() => {
		let isApiSubscribe = true;
		async function getData() {
			const categories: any = await submitAPI({}, "GET", "get/categories/banner", {})
			if (categories.success) {
				isApiSubscribe = false;
				setBanners({
					error: false,
					data: categories.data.banners,
					isLoading: false,
					errorMessage: ""
				})
			} else {
				isApiSubscribe = false;
				setBanners({
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
		<>
			{banners.data.length ? <HeroSlider data={banners.data} variantRounded="default" variant="fullWidth" /> : null}
			<Container>
				<CategoryBlock sectionHeading="Shop by brand" type="rounded" />
			</Container>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">

						<ProductsFlashSaleBlock date={"2023-03-01T01:02:03"} />
					</div>
				</div>

			</Container>

		</>
	);
}

AllCategories.Layout = Layout;


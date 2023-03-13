import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BrandCategoryBlock from "@containers/brand-category-block";
import { ShopFilters } from '@components/shop/filters';
import StickyBox from 'react-sticky-box';
import CategoryBannerWithProducts from "@containers/category-banner-with-products";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";

export default function ProductCategory() {
	return (
		<>
			<Container>
				<CategoryBannerWithProducts
					sectionHeading="Product Sub Category"
					categorySlug="/#"
				/>
				<BrandCategoryBlock sectionHeading="Shop By Brand" type="rounded" />
			</Container>
			<Container>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar />
						<ProductGrid />
					</div>
				</div>

			</Container>

		</>
	);
}

ProductCategory.Layout = Layout;


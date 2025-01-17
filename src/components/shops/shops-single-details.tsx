import StickyBox from "react-sticky-box";
import { useShopQuery } from "@framework/shop/get-shop";
import Text from "@components/ui/text";
import ProductCard from "@components/product/product-card";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUI } from "@contexts/ui.context";
import { getDirection } from "@utils/get-direction";
import { ProductGrid } from "@components/product/product-grid";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import Container from "@components/ui/container";
import { Drawer } from "@components/common/drawer/drawer";
import ShopSidebar from "@components/shops/shop-sidebar";
import ShopSidebarDrawer from "@components/shops/shop-sidebar-drawer";
import { useTranslation } from "next-i18next";
import { ProductJSONMaker } from "../../api/service"

const ShopsSingleDetails: React.FC = () => {
	const {
		query: { slug },
	} = useRouter();
	const { t } = useTranslation("common")
	const { data, isLoading } = useShopQuery(slug as string);
	const { openShop, displayShop, closeShop } = useUI();
	const { locale } = useRouter();
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<div className="flex lg:hidden items-center px-8 py-4 border-b border-gray-300 mb-4">
				<div className="flex flex-shrink-0">
					<Image
						unoptimized
						src={data?.logo?.original!}
						alt={data?.name}
						width={62}
						height={62}
						className="rounded-md"
					/>
				</div>
				<div className="ps-4">
					<Text variant="heading">{data?.name}</Text>
					<button
						className="font-semibold text-sm text-heading transition-all opacity-80 hover:opacity-100"
						onClick={openShop}
					>
						{t('text-more-info')}
					</button>
				</div>
			</div>
			<Container>
				<div className="flex flex-col lg:flex-row lg:pt-7 pb-16 lg:pb-20">
					<div className="flex-shrink-0 hidden lg:block lg:w-80 xl:w-96 border border-gray-300 rounded-lg">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<ShopSidebar data={data} />
						</StickyBox>
					</div>

					<div className="w-full lg:ps-7">
						<div className="flex mb-5 lg:mb-7">
							<Image
								unoptimized
								src={data?.cover_image?.original!}
								alt={data?.name}
								width={2760}
								height={1020}
								className="rounded-xl bg-gray-300"
							/>
						</div>
						<div
							className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8`}
						>
							{/* {isLoading && !data?.pages?.length ? ( */}
							{isLoading ? (
								<ProductFeedLoader limit={20} uniqueKey="search-product" />
							) : (
								data.productList.length ? data.productList.map((product: any) => (
									<ProductCard
										key={`product--key${product.id}`}
										variant="grid"
										product={product}
										imgWidth={176}
										imgHeight={176}
									/>
								)) : null
							)}
						</div>
						{/* <ProductGrid /> */}
					</div>
				</div >
			</Container >
			<Drawer
				placement={dir === "rtl" ? "right" : "left"}
				open={displayShop}
				onClose={closeShop}
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<ShopSidebarDrawer data={data} />
			</Drawer>
		</>
	);
};

export default ShopsSingleDetails;

import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import CategoryCard from "@components/common/category-card";
import { useWindowSize } from "@utils/use-window-size";
import CategoryCardLoader from "@components/ui/loaders/category-card-loader";
import { useFeaturedCategoriesQuery } from "@framework/category/get-all-featured-categories";
import Alert from "@components/ui/alert";

interface CategoriesProps {
	sectionHeading: string;
	className?: string;
}

const breakpoints = {
	"1220": {
		slidesPerView: 4,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"440": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
	sectionHeading = "Shop By Category",
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const { width } = useWindowSize();
	const { data, isLoading, error } = useFeaturedCategoriesQuery({
		limit: 10,
	});

	const DummyData = [
		{
			"id": 1,
			"name": "Bags",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=bag-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/bags/1.png",
						"original": "/assets/images/category/two/bags/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=bag-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/bags/2.png",
						"original": "/assets/images/category/two/bags/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=bag-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/bags/3.png",
						"original": "/assets/images/category/two/bags/3.png"
					}
				}
			]
		},
		{
			"id": 2,
			"name": "Shoes",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=shoes-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/shoes/1.png",
						"original": "/assets/images/category/two/shoes/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=shoes-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/shoes/2.png",
						"original": "/assets/images/category/two/shoes/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=shoes-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/shoes/3.png",
						"original": "/assets/images/category/two/shoes/3.png"
					}
				}
			]
		},
		{
			"id": 3,
			"name": "Wallets",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=wallet-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/wallets/1.png",
						"original": "/assets/images/category/two/wallets/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=wallet-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/wallets/2.png",
						"original": "/assets/images/category/two/wallets/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=wallet-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/wallets/3.png",
						"original": "/assets/images/category/two/wallets/3.png"
					}
				}
			]
		},
		{
			"id": 4,
			"name": "Jewellers",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=jeweller-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/jewellers/1.png",
						"original": "/assets/images/category/two/jewellers/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=jeweller-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/jewellers/2.png",
						"original": "/assets/images/category/two/jewellers/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=jeweller-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/jewellers/3.png",
						"original": "/assets/images/category/two/jewellers/3.png"
					}
				}
			]
		},
		{
			"id": 5,
			"name": "Watches",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=watch-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/watches/1.png",
						"original": "/assets/images/category/two/watches/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=watch-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/watches/2.png",
						"original": "/assets/images/category/two/watches/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=watch-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/watches/3.png",
						"original": "/assets/images/category/two/watches/3.png"
					}
				}
			]
		},
		{
			"id": 6,
			"name": "Sun Glasses",
			"products": [
				{
					"id": 1,
					"slug": "/search?q=sun-glasses-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/sun-glasses/1.png",
						"original": "/assets/images/category/two/sun-glasses/1.png"
					}
				},
				{
					"id": 2,
					"slug": "/search?q=sun-glasses-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/sun-glasses/2.png",
						"original": "/assets/images/category/two/sun-glasses/2.png"
					}
				},
				{
					"id": 3,
					"slug": "/search?q=sun-glasses-in-fashion",
					"image": {
						"id": 1,
						"thumbnail": "/assets/images/category/two/sun-glasses/3.png",
						"original": "/assets/images/category/two/sun-glasses/3.png"
					}
				}
			]
		}
	]
	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<Carousel
				breakpoints={breakpoints}
				autoplay={{
					delay: 4000,
				}}
			>
				{isLoading
					? Array.from({ length: 6 }).map((_, idx) => (
						<SwiperSlide key={idx}>
							<CategoryCardLoader
								uniqueKey={`featured-category-${idx}`}
							/>
						</SwiperSlide>
					))
					: DummyData?.map((category) => (
						<SwiperSlide key={`category--key${category.id}`}>
							<CategoryCard category={category} />
						</SwiperSlide>
					))}
			</Carousel>
			{/* {false ? (
				<Alert message={error?.message} />
			) : (
				<>
					{width < 1025 ? (
						<div className="relative">
							<Carousel
								breakpoints={breakpoints}
								autoplay={{
									delay: 4000,
								}}
							>
								{isLoading
									? Array.from({ length: 6 }).map((_, idx) => (
										<SwiperSlide key={idx}>
											<CategoryCardLoader
												uniqueKey={`featured-category-${idx}`}
											/>
										</SwiperSlide>
									))
									: DummyData?.map((category) => (
										<SwiperSlide key={`category--key${category.id}`}>
											<CategoryCard category={category} />
										</SwiperSlide>
									))}
							</Carousel>
						</div>
					) : (
						<div className="lg:grid lg:grid-cols-3 lg:gap-5 xl:gap-7">
							{isLoading
								? Array.from({ length: 6 }).map((_, idx) => (
									<CategoryCardLoader
										key={idx}
										uniqueKey={`featured-category-${idx}`}
									/>
								))
								: data?.map((category) => (
									<CategoryCard
										key={`category--key${category.id}`}
										category={category}
									/>
								))}
						</div>
					)}
				</>
			)} */}
		</div>
	);
};

export default CategoryGridBlock;

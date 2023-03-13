import React, { useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
// import { useRouter } from "next/router";
// import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
// import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
// import Carousel from "@components/ui/carousel/carousel";
// import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
// import YoutubeCard from "./YoutubeCard/YoutubeCard";
import EMICardCompo from "@components/common/EMICardCompo/EMICardCompo";
import ProductSpecification from "@components/common/ProductSpecification/ProductSpecification";
import ProductOverview from "@components/common/ProductOverview/ProductOverview";
import Cookies from 'universal-cookie';
// import FormData from 'form-data';
// import { submitAPI } from "src/api/service";
import Badges from "@components/common/Badges/Badges";
import { IoStar, IoSearchSharp, IoTrophySharp, IoPricetagsSharp, IoLogoUsd, IoLocationSharp } from "react-icons/io5";
import CustomSliderbypinkcitywala from "@components/common/CustomSlider/CustomSliderbypinkcitywala";
import ProductMetaReviewTabView from "./product-meta-review-tabView";
import FAQ from "src/pages/faq";
import ProductReview from "@components/common/ProductReview/ProductReview";

// const productGalleryCarouselResponsive = {
// 	"768": {
// 		slidesPerView: 2,
// 	},
// 	"0": {
// 		slidesPerView: 1,
// 	},
// };
const variationss = [{
	id: 1,
	value: "S",
	attribute: {
		id: 1,
		name: "Size",
		slug: "size"
	}
}]

const ProductSingleDetails: React.FC<any> = ({ productDetails, isLoading }: any) => {
	// const {
	// 	query: { slug },
	// } = useRouter();
	const cookies = new Cookies();
	const { width } = useWindowSize();
	// const { data, isLoading } = useProductQuery(slug as string);
	const { addItemToCart } = useCart();
	const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
	const [quantity, setQuantity] = useState(1);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const { price, basePrice, discount } = usePrice(
		{
			amount: productDetails?.vendor_info?.discount_price && Number(productDetails?.vendor_info?.discount_price === Number(productDetails.vendor_info.price)) ? 0 : Number(productDetails?.vendor_info?.price) - Number(productDetails.vendor_info.discount_price),
			baseAmount: Number(productDetails.vendor_info.price),
			currencyCode: "INR",
		}
	);
	if (isLoading) return <p>Loading...</p>;
	const variations = getVariations(productDetails?.variations);

	const isSelected = !isEmpty(variations)
		? !isEmpty(attributes) &&
		Object.keys(variations).every((variation) =>
			attributes.hasOwnProperty(variation)
		)
		: true;

	async function addToCart() {
		const userId = cookies.get('userId')
		if (userId) {
			if (!isSelected) return;

			setAddToCartLoader(true);
			const isProductAdded: any = await addItemToCart(productDetails.id, quantity);
			if (isProductAdded.success) {
				setAddToCartLoader(false);
				toast.success("Added to the bag", {
					progressClassName: "fancy-progress-bar",
					position: width > 768 ? "bottom-right" : "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
				setAddToCartLoader(false);
				toast.error("Failed to add product in cart", {
					progressClassName: "fancy-progress-bar",
					position: width > 768 ? "bottom-right" : "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		} else {
			toast.error("Please logIn to add product in card", {
				progressClassName: "fancy-progress-bar",
				position: width > 768 ? "bottom-right" : "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}

	}

	function handleAttribute(attribute: any) {
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

	const reviewData = [{
		title: "Specifications",
		id: "1",
		content: <ProductSpecification data={productDetails?.specificationlist} />,
	},
	{
		title: "Description",
		id: "2",
		content: productDetails?.description,
	},
	{
		title: "Overview",
		id: "3",
		content: <ProductOverview data={productDetails?.product_overview} />,
	}, {
		title: "Reviews",
		id: "4",
		content: <ProductReview />,
	}, {
		title: "Q&A",
		id: "5",
		content: <FAQ />,
	}]

	return (
		<>
			<div className="block lg:grid grid-cols-12 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
				<div className="col-span-5">
					<CustomSliderbypinkcitywala images={productDetails?.images} />
				</div>


				<div className="col-span-5 pt-8 lg:pt-0">
					<div className="pb-2 mb-2 border-b border-gray-300">
						<Badges badgeName="Brand Name"></Badges>
						<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
							{productDetails?.product_name}
						</h2>

						{/* product review and star */}
						<div className="flex pb-4">
							<div className="flex pr-5" data-rounded-score="5">
								<IoStar />
								<IoStar />
								<IoStar />
								<IoStar />
								<IoStar />
							</div>
							<span className="reviews__bottomline__text">4.9 | 1490 Reviews</span>
						</div>
						{/* product review and star */}


						<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
							{(productDetails?.description).substr(0, 150)}
						</p>
						<div className="col-span-5">
							<div className="pb-2 ">
								<ul className="text-sm space-y-5 pb-1">
									<li className="text-sm font-bold ">
										<span
											className="inline-flex items-center justify-center px-2 py-1 mx-1 leading-none text-white themeGrad"
										>#1 BEST SELLER</span> in &nbsp;
										<Link
											href="/"
											className="transition hover:underline hover:text-heading"
										>
											{productDetails?.product_to_categories[0]?.title}
										</Link></li>
									<li>
										<span className="font-semibold text-heading inline-block pe-2">
											SKU:
										</span>
										{productDetails?.sku}
									</li>
									<li className="">
										<span className="font-semibold text-heading inline-block pe-2">
											Category:&nbsp;
											{productDetails?.product_to_categories?.map((productCategory: any) => {
												// <span></>
												return <span className="inline-flex items-center justify-center px-2 py-1 mx-1 text-xs leading-none text-white bg-black rounded">{productCategory?.title}</span>
											})
											}
										</span>

									</li>
									{/* <li>
								<Link
									href="/"
									className="text-black themeGradientBorder-1-bottom font-bold"
								>
									+15% off up to $100 w/Affirm w/ promo code AFFIRM15PC, while funds last
								</Link>
							</li> */}
									<li>
										<p className="flex flex-row items-center">
											<IoSearchSharp />&nbsp;See more <Link href="/">"asus laptop"</Link>
										</p>
									</li>
									<li>
										<p className="flex flex-row items-center">
											<IoPricetagsSharp />&nbsp;Check more best sellers of <Link href="/">"Laptops / Notebooks"</Link></p>
									</li>
									{/* <li>
								<p className="flex flex-row items-center">
									<IoTrophySharp />&nbsp;Check more deals of <Link href="/">"Laptops / Notebooks"</Link></p>
							</li>
							<li>
								<p className="flex flex-row items-center">
									<IoLogoUsd />&nbsp;Check more lowest price of <Link href="/">"Laptops / Notebooks"</Link>
								</p>
							</li> */}
									{productDetails?.tags && Array.isArray(productDetails.tags) && (
										<li className="productTags">
											<span className="font-semibold text-heading inline-block pe-2">
												Tags:
											</span>
											{productDetails.tags.map((tag: any) => (
												<Link
													key={tag.id}
													href={tag.slug}
													className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
												>
													{tag.name}
													<span className="text-heading">,</span>
												</Link>
											))}
										</li>
									)}
								</ul>
							</div>
							{/* <YoutubeCard /> */}
						</div>
						<div className="flex items-center mb-3">
							<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
								{price}
							</div>
							{discount && (
								<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
									{basePrice}
								</span>
							)}
						</div>

						<p className="text-gray-700 text-sm flex flex-row items-center text-center">
							<IoLocationSharp />&nbsp;Deliver to Select <Link href="/">delivery location</Link>
						</p>
					</div>

					<div className="pb-1 ">
						{Object.keys(variationss).map((variation) => {
							let productTitle = variationss[1]?.value;
							// let productAtt = variationss[1]?.attribute;
							return (
								<ProductAttributes
									key={variation}
									title={productTitle}
									attributes={variations[variation]}
									active={attributes[variation]}
									onClick={handleAttribute}
								/>
							);
						})}
					</div>
					<div className="flex items-center space-s-2 md:pe-32 lg:pe-10 2xl:pe-32 3xl:pe-48 border-b border-gray-300 pb-8">
						<Counter
							quantity={quantity}
							onIncrement={() => setQuantity((prev) => prev + 1)}
							onDecrement={() =>
								setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
							}
							disableDecrement={quantity === 1}
						/>
						<Button
							onClick={addToCart}
							variant="slim"
							className={`hoverThemeGradientBg w-full md:w-6/12 xl:w-full ${!isSelected && ""
								}`}
							disabled={!isSelected}
							loading={addToCartLoader}
						>
							<span className="py-2 3xl:px-2">Add to cart</span>
						</Button>
						<Button
							onClick={addToCart}
							variant="slim"
							className={`hoverThemeGradientBg w-full md:w-6/12 xl:w-full ${!isSelected && ""
								}`}
							disabled={!isSelected}
							loading={addToCartLoader}
						>
							<span className="py-2 3xl:px-2">Buy Now</span>
						</Button>
					</div>

					<div>
						<p className=" text-sm my-2 themeGrad text-white rounded text-center">
							{/* <span className="inline-flex items-center justify-center px-2 py-1 mr-1 leading-none text-white bg-black rounded">FREE SHIPPING</span> */}
							<span className="text-white">FREE SHIPPING</span>
							&nbsp;from India (Jaipur)
						</p>
					</div>

				</div>
				<div className="col-span-2">
					<h1>Payment Gateway</h1>
				</div>

			</div>

			{/* <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-2 pb-10 lg:pb-14 2xl:pb-20 items-start ">
				
				<div className="col-span-4 pt-8 lg:pt-0">
					<EMICardCompo />
				</div>
			</div> */}
			<div className="grid-cols-12">
				{/* <ProductMetaReview data={reviewData} /> */}
				<ProductMetaReviewTabView data={reviewData} />
			</div>
		</>
	);
};

export default ProductSingleDetails;

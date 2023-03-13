import Carousel from "@components/ui/carousel/carousel";
import ProductCard from "@components/product/product-card";
import SectionHeader from "@components/common/section-header";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
import { useFlashSaleProductsQuery } from "@framework/product/get-all-flash-sale-products";
import Alert from "@components/ui/alert";
import { SwiperSlide } from "swiper/react";

interface ProductsProps {
	sectionHeading?: string;
	className?: string;
	date?: any;
}

const breakpoints = {
	"1500": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"1025": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"768": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"480": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const ProductsFlashSaleCarousel: React.FC<ProductsProps> = ({
	sectionHeading = "text-flash-sale",
	className = "mb-10 md:mb-12 xl:mb-14",
}) => {
	const { data, isLoading, error } = useFlashSaleProductsQuery({
		limit: 10,
	});
	const dummyData = [{
		"id": 1,
		"name": "Style Quotient",
		"description": "Men Black top sleeveless gown",
		"slug": "adidas-shoes-black",
		"soldBy": "Frenaldo",
		"image": {
		  "id": 1,
		  "thumbnail": "/assets/images/products/p-26-md.png",
		  "original": "/assets/images/products/p-26-m.png"
		},
		"gallery": [
		  {
			"id": 1,
			"thumbnail": "/assets/images/products/p-26-1.png",
			"original": "/assets/images/products/p-26-1.png"
		  },
		  {
			"id": 2,
			"thumbnail": "/assets/images/products/p-26-2.png",
			"original": "/assets/images/products/p-26-2.png"
		  }
		],
		"sale_price": 45.0,
		"quantity": 320,
		"sold": 180,
		"variations": [
		  {
			"id": 1,
			"value": "S",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 2,
			"value": "M",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 3,
			"value": "L",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 4,
			"value": "XL",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 5,
			"value": "Orange",
			"meta": "#e86c25",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 6,
			"value": "Pink",
			"meta": "#ffa5b4",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 7,
			"value": "Purple",
			"meta": "#8224e3",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 8,
			"value": "Red",
			"meta": "#dd3333",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  }
		]
	  },
	  {
		"id": 2,
		"name": "Armani Wide-Leg Trousers",
		"description": "Monochrome elegance. Made with a relaxed wide-leg, these trousers are made from a sustainable soft organic cotton with a mechanical stretch making the garment easily recycled.",
		"slug": "armani-wide-leg-trousers",
		"soldBy": "Frenaldo",
		"image": {
		  "id": 1,
		  "thumbnail": "/assets/images/products/p-16-md.png",
		  "original": "/assets/images/products/p-16-m.png"
		},
		"gallery": [
		  {
			"id": 1,
			"thumbnail": "/assets/images/products/p-16-1.png",
			"original": "/assets/images/products/p-16-1.png"
		  },
		  {
			"id": 2,
			"thumbnail": "/assets/images/products/p-16-2.png",
			"original": "/assets/images/products/p-16-2.png"
		  }
		],
		"price": 16.0,
		"sale_price": 12.0,
		"quantity": 320,
		"sold": 180,
		"variations": [
		  {
			"id": 1,
			"value": "S",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 2,
			"value": "M",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 3,
			"value": "L",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 4,
			"value": "XL",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 5,
			"value": "Orange",
			"meta": "#e86c25",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 6,
			"value": "Pink",
			"meta": "#ffa5b4",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 7,
			"value": "Purple",
			"meta": "#8224e3",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 8,
			"value": "Red",
			"meta": "#dd3333",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  }
		]
	  },
	  {
		"id": 3,
		"name": "Zara Shoes Green",
		"description": "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.",
		"slug": "style-quotient",
		"soldBy": "Frenaldo",
		"image": {
		  "id": 1,
		  "thumbnail": "/assets/images/products/p-3.png",
		  "original": "/assets/images/products/p-3-m.png"
		},
		"gallery": [
		  {
			"id": 1,
			"thumbnail": "/assets/images/products/p-3-1.png",
			"original": "/assets/images/products/p-3-1.png"
		  },
		  {
			"id": 2,
			"thumbnail": "/assets/images/products/p-3-2.png",
			"original": "/assets/images/products/p-3-2.png"
		  }
		],
		"price": "16.38",
		"sale_price": 50.0,
		"quantity": 320,
		"sold": 180,
		"variations": [
		  {
			"id": 1,
			"value": "S",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 2,
			"value": "M",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 3,
			"value": "L",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 4,
			"value": "XL",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 5,
			"value": "Orange",
			"meta": "#e86c25",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 6,
			"value": "Pink",
			"meta": "#ffa5b4",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 7,
			"value": "Purple",
			"meta": "#8224e3",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 8,
			"value": "Red",
			"meta": "#dd3333",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  }
		]
	  },
	  {
		"id": 4,
		"name": "Wayfarer Sunglasses",
		"description": "Our optical engineers developed these sunglasses for hiking. Ideal for occasional use in the mountains.",
		"slug": "wayfarer-sunglasses",
		"soldBy": "Frenaldo",
		"image": {
		  "id": 1,
		  "thumbnail": "/assets/images/products/p-25-md.png",
		  "original": "/assets/images/products/p-25-m.png"
		},
		"gallery": [
		  {
			"id": 1,
			"thumbnail": "/assets/images/products/p-25-1.png",
			"original": "/assets/images/products/p-25-1.png"
		  },
		  {
			"id": 2,
			"thumbnail": "/assets/images/products/p-25-2.png",
			"original": "/assets/images/products/p-25-2.png"
		  }
		],
		"price": 18.0,
		"sale_price": 15.0,
		"quantity": 320,
		"sold": 180,
		"variations": [
		  {
			"id": 1,
			"value": "S",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 2,
			"value": "M",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 3,
			"value": "L",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 4,
			"value": "XL",
			"attribute": {
			  "id": 1,
			  "name": "Size",
			  "slug": "size"
			}
		  },
		  {
			"id": 5,
			"value": "Orange",
			"meta": "#e86c25",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 6,
			"value": "Pink",
			"meta": "#ffa5b4",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 7,
			"value": "Purple",
			"meta": "#8224e3",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  },
		  {
			"id": 8,
			"value": "Red",
			"meta": "#dd3333",
			"attribute": {
			  "id": 1,
			  "name": "Color",
			  "slug": "color"
			}
		  }
		]
	  }]
	return (
		<div className={`${className} 2xl:pt-2`}>
			<div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
				<SectionHeader sectionHeading={sectionHeading} className="mb-0" />
			</div>
			{false ? (
				<Alert message={error?.message} />
			) : (
				<Carousel
					autoplay={{
						delay: 3500,
					}}
					breakpoints={breakpoints}
					buttonGroupClassName="-mt-10 md:-mt-12 xl:-mt-14"
				>
					{false && dummyData?.length
						? Array.from({ length: 10 }).map((_, idx) => (
								<ProductCardGridLoader
									key={idx}
									uniqueKey={`flash-sale-${idx}`}
								/>
						  ))
						: dummyData?.map((product: any) => (
								<SwiperSlide key={`product--key-${product.id}`}>
									<ProductCard
										product={product}
										imgWidth={335}
										imgHeight={335}
										variant="gridSlim"
									/>
								</SwiperSlide>
						  ))}
				</Carousel>
			)}
		</div>
	);
};

export default ProductsFlashSaleCarousel;

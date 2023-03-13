import { useState, useEffect } from "react"
import BannerCard from "@components/common/banner-card";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
import { homeThreeProductsBanner as banner } from "@framework/static/banner";
import Alert from "@components/ui/alert";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { submitAPI, ProductJSONMaker } from "src/api/service";
import FormData from "form-data"

interface CategoryProductsProps {
    sectionHeading: string;
    categorySlug?: string;
    className?: string;
    variant?: "default" | "reverse";
}

const CategoryBannerWithProducts: React.FC<CategoryProductsProps> = ({
    sectionHeading,
    categorySlug,
    variant = "default",
    className = "mb-12 md:mb-14 xl:mb-16",
}) => {

    const [brandDeatils, setBrandDetails] = useState<any>({});
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { query } = useRouter();

    useEffect(() => {
        let isApiSubscribed = true;

        async function fetchProductData() {
            if (query.slug) {
                setIsLoading(true)
                let data = new FormData();
                data.append("slug", query.slug);
                const brandData: any = await submitAPI(data, "POST", "get/category/details", { 'Content-Type': 'multipart/form-data' });
                const productData: any = await ProductJSONMaker(brandData.data.featured_product_data)
                setBrandDetails(brandData.data)
                setIsLoading(false)
                setProductDetails(productData)
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
            <SectionHeader
                sectionHeading={sectionHeading}
                categorySlug={categorySlug}
            />
            {false ? (
                <Alert message={error?.message} />
            ) : (
                <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
                    {brandDeatils?.banner?.image ? (variant === "reverse" ? (
                        <BannerCard
                            banner={{ image: brandDeatils.banner.image, title: brandDeatils.title }}
                            href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
                            className="hidden 3xl:block"
                            effectActive={true}
                        />
                    ) : (
                        <BannerCard
                            banner={{ image: brandDeatils.banner.image, title: brandDeatils.title }}
                            href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
                            className="hidden 3xl:block"
                            effectActive={true}
                        />
                    )) : null}
                    <div
                        className={`col-span-full 3xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 xl:gap-7 ${variant === "reverse" ? "row-span-full" : ""
                            }`}
                    >
                        {isLoading
                            ? Array.from({ length: 9 }).map((_, idx) => (
                                <ProductCardListSmallLoader
                                    key={idx}
                                    uniqueKey={`on-selling-${idx}`}
                                />
                            ))
                            :
                            productDetails?.map((product: any) => (
                                <ProductCard
                                    key={`product--key${product.id}`}
                                    product={product}
                                    imgWidth={176}
                                    imgHeight={176}
                                    variant="listSmall"
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryBannerWithProducts;

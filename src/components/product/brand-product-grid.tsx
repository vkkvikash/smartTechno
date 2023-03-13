import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useBrandProductsQuery } from "@framework/product/get-all-brand-products";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";

interface BrandProductGridProps {
    className?: string;
    brandId?: string | number | null;
}
export const BrandProductGrid: FC<BrandProductGridProps> = ({ className = "", brandId }) => {

    const {
        isFetching: isLoading,
        isFetchingNextPage: loadingMore,
        fetchNextPage,
        hasNextPage,
        data,
        error,
    } = useBrandProductsQuery({ limit: 10, brandId });
    if (error) return <p>{error.message}</p>;

    const { t } = useTranslation("common");

    return (
        <>
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
            >
                {isLoading && !data?.pages?.length ? (
                    <ProductFeedLoader limit={20} uniqueKey="search-product" />
                ) : (
                    data?.pages?.map((page) => {
                        return page?.results?.map((product: any) => (
                            <ProductCard
                                key={`product--key${product.id}`}
                                product={product}
                                variant="gridModernWide"
                            />
                        ));
                    })
                )}
            </div>
            <div className="text-center pt-8 xl:pt-14">
                {hasNextPage && (
                    <Button
                        loading={loadingMore}
                        disabled={loadingMore}
                        onClick={() => fetchNextPage()}
                        variant="slim"
                    >
                        {t("button-load-more")}
                    </Button>
                )}
            </div>
        </>
    );
};

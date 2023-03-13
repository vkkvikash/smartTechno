import { useEffect, useState } from "react"
import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { ProductJSONMaker } from "../../api/service"

interface ProductGridProps {
	className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { query } = useRouter();
	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		data,
		error,
	} = useProductsQuery({ limit: 10, ...query });
	if (error) return <p>{error.message}</p>;

	const [productList, setProductList] = useState<any>([])
	const { t } = useTranslation("common");

	useEffect(() => {

		if (data?.pages[0]?.results) {
			const productsList = ProductJSONMaker(data.pages[0].results);
			setProductList(productsList)
		}

		return () => {
			setProductList([])
		}
	}, [data?.pages[0]?.results])

	return (
		<>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					productList.length ? productList.map((product: any) => (
						<ProductCard
							key={`product--key${product.id}`}
							variant="grid"
							product={product}
							imgWidth={344}
							imgHeight={344}
						/>
					)) : null
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

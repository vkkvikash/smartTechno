import { useState, useEffect } from "react"
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { useRouter } from "next/router";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import FormData from 'form-data';
import { submitAPI, ProductJSONMaker } from "../../api/service"

export default function ProductPage() {
	const { query } = useRouter();
	const [productData, setProductData] = useState<any>({
		productDetails: {},
		relatedProduct: []
	})
	const [isLoading, setIsLoading] = useState<boolean>(true)
	useEffect(() => {
		let isApiSubscribed = true;
		async function getProduct() {
			var data = new FormData();
			data.append("slug", query.slug)
			const isApiSubscribed: any = await submitAPI(data, "POST", "get/product/details", { 'Content-Type': 'multipart/form-data' });
			if (isApiSubscribed.success) {
				setProductData({
					productDetails: isApiSubscribed.data,
					relatedProduct: ProductJSONMaker(isApiSubscribed.data.similar_product_data)
				})
				setIsLoading(false)
			}
		}
		if (isApiSubscribed && query.slug) {
			getProduct()
		}

		return () => {
			isApiSubscribed = false;
		}
	}, [query.slug])
	return (
		<>
			<Divider className="mb-0" />
			<Container>
				<div className="pt-8">
					<Breadcrumb />
				</div>
				{!isLoading &&
					<><ProductSingleDetails productDetails={productData.productDetails} isLoading={isLoading} />
						<RelatedProducts relatedProduct={productData.relatedProduct} sectionHeading="Related Products" /></>
				}
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;


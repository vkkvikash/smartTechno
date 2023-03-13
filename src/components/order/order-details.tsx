import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


const OrderItemCard = ({ product }: { product: any }) => {
	const { price: itemTotal } = usePrice({
		amount: parseFloat(product?.price?.replace(/,/g, '')) * parseFloat(product.quantity.replace(/,/g, '')),
		currencyCode: "INR",
	});

	return (
		<tr
			className="border-b font-normal border-gray-300 last:border-b-0"
			key={product.id}
		>
			<td className="p-4">
				{product.name} * {product.quantity}
			</td>
			<td className="p-4">{itemTotal}</td>
		</tr>
	);
};
const OrderDetails: React.FC<{ className?: string }> = ({
	className = "pt-10 lg:pt-12",
}) => {
	const {
		query: { id },
	} = useRouter();
	const { t } = useTranslation("common");
	const { data: order, isLoading } = useOrderQuery(id?.toString()!);
	const { price: subtotal } = usePrice(
		order && {
			amount: parseFloat(order?.total?.replace(/,/g, '')),
			currencyCode: "INR",
		}
	);
	const { price: total } = usePrice(
		order && {
			amount: parseFloat(order?.shipping_amount.replace(/,/g, ''))
				? parseFloat(order?.total.replace(/,/g, '')) + parseFloat(order?.shipping_amount.replace(/,/g, ''))
				: parseFloat(order?.total.replace(/,/g, '')),
			currencyCode: "INR",
		}
	);
	const { price: shipping } = usePrice(
		order && {
			amount: Number(order?.shipping_amount),
			currencyCode: "INR",
		}
	);
	if (isLoading) return <p>Loading...</p>;
	return (
		<div className={className}>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("Order details")}:
			</h2>
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<thead>
					<tr>
						<th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
							{t("Product")}
						</th>
						<th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
							{t("Total")}
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products.map((product, index) => (
						<OrderItemCard key={index} product={product} />
					))}
				</tbody>
				<tfoot>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("Subtotal")}:</td>
						<td className="p-4">{subtotal}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("Shipping")}:</td>
						<td className="p-4">
							{shipping}
							{/* <span className="text-[13px] font-normal ps-1.5 inline-block">
								via Flat rate
							</span> */}
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("Payment method")}:</td>
						<td className="p-4">{order?.payment_method}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("Total")}:</td>
						<td className="p-4">{total}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">{t("Note")}:</td>
						<td className="p-4">{order?.note}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default OrderDetails;

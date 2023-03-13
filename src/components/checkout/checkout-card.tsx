import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";

const CheckoutCard: React.FC = () => {
	const { items, isEmpty, total } = useCart();

	const { t } = useTranslation("common");
	const checkoutFooter = [
		{
			id: 1,
			name: t("Subtotal"),
			price: total,
		},
		{
			id: 2,
			name: t("Shipping"),
			price: t("Free"),
		},
		{
			id: 3,
			name: t("Total"),
			price: total,
		},
	];
	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("Your Order")}
			</h2>
			<div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
				<span>{t("Product")}</span>
				<span className="ms-auto flex-shrink-0">{t("Subtotal")}</span>
			</div>
			{!isEmpty ? (
				items.map((item: any) => <CheckoutItem item={item} key={item.id} />)
			) : (
				<p className="text-red-500 lg:px-3 py-4">{t("Your cart is empty.")}</p>
			)}
			{checkoutFooter.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default CheckoutCard;

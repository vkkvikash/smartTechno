import React, { useState, useEffect } from "react";
import CartIcon from "@components/icons/cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { submitAPI } from "src/api/service";
import Cookies from 'universal-cookie';
import FormData from 'form-data';

const CartButton = () => {
	const cookies = new Cookies();
	const { openCart } = useUI();
	const { numberOfItems } = useCart();
	const [totalProduct, setTotalProduct] = useState(0)

	useEffect(() => {
		let isApiSubscribed = true;
		const getTotalItem = async () => {

			const userId = cookies.get('userId')
			if (userId) {
				var data = new FormData();
				data.append('user_id', userId);
				const isProductAdded: any = await submitAPI(data, "POST", "cart/list", { 'Content-Type': 'multipart/form-data' });
				if (isProductAdded.success && "cart" in isProductAdded.data) {
					setTotalProduct(isProductAdded.data.cart.length)
				}
			}
		};
		if (isApiSubscribed) {
			getTotalItem()
		}

		return () => {
			isApiSubscribed = false;
		}
	}, [cookies.get('userId')])

	function handleCartOpen() {
		return openCart();
	}

	return (
		<button
			className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
			onClick={handleCartOpen}
			aria-label="cart-button"
		>
			<CartIcon />
			<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
				{numberOfItems}
			</span>
		</button>
	);
};

export default CartButton;

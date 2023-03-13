import React, { useEffect, useState } from "react"
import Cookies from 'universal-cookie';
import { useCart } from "@contexts/cart/cart.context";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import FormData from 'form-data';
import { submitAPI } from "../../api/service"
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";

interface addressType {
	id: number | null;
	name: string | null;
	mobile: string | null;
	pincode: string | null;
	locality: string | null;
	address: string | null;
	city: string | null;
	landmark: string | null;
	address_type: string | null;
	is_default: string | null;
	state_name: string | null;
}
interface paymentOption {
	key: string;
	amount: string;
	currency: string;
	name: string;
	order_id: any;
	handler: (response: any) => Promise<void>;
	modal: any
	prefill: {
		name: any;
		contact: any;
	};
	theme: {
		color: string;
	};
}
const inputClassName = "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out"
const CheckoutForm: React.FC = () => {
	const { t } = useTranslation();
	const Razorpay = useRazorpay();
	const cookies = new Cookies();
	const Authorization = cookies.get('Authorization');
	const name = cookies.get('name');
	const mobile = cookies.get('mobile');
	const { charges, total, checkOutCart, items } = useCart();
	const [addressList, setAddressList] = useState<addressType[]>([]);
	const [formData, setFormData] = useState({
		address: "",
		tax_amount: 0,
		shipping_amount: 0,
		total: 0,
		payment_method: "Online Payment",
		shipping_method: "Flat Shipping Rate",
		comment: "New Order"
	})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		let isApiSubscribed = true;
		const getData = async () => {
			const getUserData: any = await submitAPI({}, "GET", "user/profile", { Authorization });
			const getUserAddress: any = await submitAPI({}, "GET", "user/address/list", { Authorization });
			if (getUserData.success) {
				if (getUserAddress.data.length) {
					setAddressList(getUserAddress.data)
				}
			}
		}
		if (isApiSubscribed && Authorization !== null && Authorization !== null) {
			getData()
		}
		return () => {
			isApiSubscribed = false;
		}
	}, [Authorization])

	const handleOnChange = (key: any, value: any) => {
		setFormData(formData => {
			return {
				...formData,
				[key]: value
			}
		})
	}

	const onSubmit = async (event: any) => {
		try {
			event.preventDefault();
			console.log(formData.payment_method)
			if (Authorization) {
				if (Number(formData.address) > 0) {
					if (formData.payment_method === "Online Payment") {
						setIsLoading(true);
						let data = new FormData();
						data.append("amount", Number(total) + Number(charges.tax) + Number(charges.shipping));
						const isCheckedOut: any = await submitAPI(data, "POST", "razorpay/ordercreate", { Authorization, 'Content-Type': 'multipart/form-data' });
						if (isCheckedOut.success) {
							const orderId = isCheckedOut.data.id;
							const orderName = items.map(item => item.name).join(",");
							const options: paymentOption = {
								key: "rzp_test_actTGEbO1kF84S", // Enter the Key ID generated from the Dashboard
								amount: ((Number(total) + Number(charges.tax) + Number(charges.shipping)) * 100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
								currency: "INR",
								name: orderName,
								order_id: orderId,
								handler: async function (response: any) {
									let data = new FormData();
									data.append("user_addres_id", Number(formData.address));
									data.append("tax_amount", charges.tax);
									data.append("shipping_amount", charges.shipping);
									data.append("total", Number(charges.tax) + Number(charges.shipping) + Number(total));
									data.append("payment_method", formData.shipping_method);
									data.append("shipping_method", formData.payment_method);
									data.append("comment", formData.comment);
									data.append("razorpay_order_id", response.razorpay_payment_id);
									data.append("razorpay_payment_id", response.razorpay_order_id);
									data.append("razorpay_signature", response.razorpay_signature);
									const isOrderPlaced: any = await checkOutCart(data, Authorization)
									if (isOrderPlaced.success) {
										setIsLoading(false);
										toast.success("Order placed successfully")
										// Router.push(ROUTES.ORDER);
									} else {
										toast.error(`${isOrderPlaced.message}`);
										setIsLoading(false);
									}
								},
								modal: {
									"ondismiss": function () {
										setIsLoading(false);
										toast.error("Transaction cancelled");
									}
								},
								prefill: {
									name: name,
									contact: mobile,
								},
								theme: {
									color: "#3399cc",
								},
							};

							const paymentObject = new Razorpay(options);
							paymentObject.open();

							paymentObject.on("payment.failed", function (response: any) {
								setIsLoading(false);
								console.log("failed", response)
								toast.error("Payment failed. Please try again. Contact support for help");
							});
						} else {
							setIsLoading(false);
							toast.error("Can't process payment! Please try again later")
						}
					} else if (formData.payment_method === "Cash On Delivery") {
						let data = new FormData();
						data.append("user_addres_id", Number(formData.address));
						data.append("tax_amount", charges.tax);
						data.append("shipping_amount", charges.shipping);
						data.append("total", Number(charges.tax) + Number(charges.shipping) + Number(total));
						data.append("payment_method", formData.shipping_method);
						data.append("shipping_method", formData.payment_method);
						data.append("comment", formData.comment);
						const isOrderPlaced: any = await checkOutCart(data, Authorization)
						if (isOrderPlaced.success) {
							setIsLoading(false);
							toast.success("Order placed successfully");
						} else {
							toast.error(`${isOrderPlaced.message}`);
							setIsLoading(false);
						}
					}
				} else {
					toast.error("Please select an address");
				}
			} else {
				toast.error("Please Login");
			}

		} catch (error) {
			setIsLoading(false);
			toast.error("Transaction failed. Please try again later.");
		}



	}

	return (
		<>

			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("Select an address")}
			</h2>
			<form
				onSubmit={onSubmit}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="block mb-4">
					{addressList.map((address: addressType, index: any) => {
						const label = `${address.name},${address.mobile}, ${address.pincode},\n ${address.state_name}, ${address.locality}, ${address.city} \n ${address.locality}, ${address.landmark}, ${address.address}`
						return (
							<div key={address.id} className="mb-2" >
								<label className="group flex items-center text-heading text-sm cursor-pointer">
									<input
										checked={formData.address === `${address.id}`}
										type="radio"
										value={`${address.id}`}
										className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
										name="address"
										onChange={(event) => handleOnChange("address", event?.target.value)}
									/>
									<span className="ms-2 text-sm text-heading relative">
										{t(`${label}`)}
									</span>
								</label>
							</div>
						)
					})}
				</div>
				<div className="block mb-2">
					<label htmlFor="tax_amount" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						{t("Tax Amount")}
					</label>
					<input type="number" disabled value={charges.tax} onChange={(event) => handleOnChange("tax_amount", event?.target.value)} className={inputClassName} name="tax_amount" id="tax_amount" aria-describedby="emailHelp" placeholder="Tax Amount" />
				</div>
				<div className="block mb-2">
					<label htmlFor="shipping_amount" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						{t("Shipping Amount")}
					</label>
					<input type="number" disabled value={charges.shipping} onChange={(event) => handleOnChange("shipping_amount", event?.target.value)} className={inputClassName} name="shipping_amount" id="shipping_amount" aria-describedby="emailHelp" placeholder="Shipping Amount" />
				</div>
				<div className="block mb-2">
					<label htmlFor="total" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						{t("Total")}
					</label>
					<input type="number" disabled value={Number(charges.shipping) + Number(charges.tax) + Number(total)} onChange={(event) => handleOnChange("total", event?.target.value)} className={inputClassName} name="total" id="total" aria-describedby="emailHelp" placeholder="Total" />
				</div>
				<div className="block mb-2">
					<div key={"online"} className="mb-2" >
						<label className="group flex items-center text-heading text-sm cursor-pointer">
							<input
								type="radio"
								checked={formData.payment_method == "Online Payment"}
								value={"Online Payment"}
								className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
								name="payment_method"
								onChange={(event) => handleOnChange("payment_method", event?.target.value)}
							/>
							<span className="ms-2 text-sm text-heading relative">
								{t("Online Payment")}
							</span>
						</label>
					</div>
					<div key={"Cash On Delivery"} className="mb-2" >
						<label className="group flex items-center text-heading text-sm cursor-pointer">
							<input
								checked={formData.payment_method == "Cash On Delivery"}
								type="radio"
								value={"Cash On Delivery"}
								className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
								name="payment_method"
								onChange={(event) => handleOnChange("payment_method", event?.target.value)}
							/>
							<span className="ms-2 text-sm text-heading relative">
								{t("Cash On Delivery")}
							</span>
						</label>
					</div>
				</div>
				<div className="block mb-2">
					<label htmlFor="payment_method" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
						{t("Shipping Method")}
					</label>
					<input type="text" className={inputClassName} disabled value={formData.shipping_method} onChange={(event) => handleOnChange("shipping_method", event?.target.value)} name="shipping_method" id="shipping_method" aria-describedby="emailHelp" placeholder="Shipping Method" />
				</div>

				<Button
					className="w-full sm:w-auto"
					loading={isLoading}
					disabled={isLoading}
				>
					{t("Place Order")}
				</Button>
			</form>


		</>
	);
};

export default CheckoutForm;

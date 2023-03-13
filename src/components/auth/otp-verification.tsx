import React, { useState } from "react"
import { useRouter } from "next/router";
import { useCart } from "@contexts/cart/cart.context";
import Cookies from 'universal-cookie';
import Input from "@components/ui/input";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { verify, OtpInputType } from "@framework/auth/use-otp";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { ROUTES } from "@utils/routes";
import { submitAPI } from "../../api/service"

type OTPVerificationProps = {
	otp?: number | string | null;
	mobile: number | string;
	device_token?: number | null;
	device_type?: number | null;
	id?: number | null;
	first_name?: string | null;
};

interface responseDataType {
	isLoading: boolean
	isSuccess: boolean
}


const OTPVerification: React.FC<OTPVerificationProps> = (props: OTPVerificationProps) => {
	const { t } = useTranslation();
	const cookies = new Cookies();
	const Router = useRouter();
	const { closeModal } = useUI();
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OtpInputType>();

	const { addItemToCart } = useCart();

	async function onSubmit({ otp }: OtpInputType) {
		setIsLoading(true);
		const isVerified = await verify({ mobile: props.mobile, otp, device_token: props.device_token, device_type: props.device_type });
		if (isVerified.success) {
			setIsLoading(false);
			cookies.set('Authorization', `${'Bearer ' + isVerified.data.token}`, { path: '/' });
			cookies.set('userId', isVerified.data.id, { path: '/' });
			cookies.set('name', isVerified.data.first_name, { path: '/' });
			cookies.set('mobile', isVerified.data.mobile, { path: '/' });
			toast.success(isVerified.message);
			const localItemInCart = JSON.parse(localStorage.getItem('itemsArray')) || [];
			const oldPath = localStorage.getItem('oldPath')
			console.log("oldPath oldPath", oldPath)
			closeModal()
			console.log("localItemInCart", localItemInCart)
			if (localItemInCart.length) {
				const isAdded = await addItemToCart(localItemInCart[0].productId, localItemInCart[0].quantity).then((isAdded) => {
					// if (isAdded.success) {
					// 	if (oldPath === undefined || oldPath === null || oldPath === "/") {
					// 		Router.push("/")
					// 	} else {
					// 		Router.push(oldPath)
					// 	}
					// } else {
					// 	if (oldPath === undefined || oldPath === null || oldPath === "/") {
					// 		Router.push("/")
					// 	} else {
					// 		Router.push(oldPath)
					// 	}
					// }
				})

			} else {
				if (oldPath === undefined || oldPath === null || oldPath === "/") {
					Router.push("/")
				} else {
					Router.push(oldPath)
				}
			}

		} else {
			setIsLoading(false);
			toast.error(isVerified.message)
		}
	}

	return (


		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center"
			noValidate
		>
			<div className="flex flex-col justify-center ">

				<Input
					labelKey="OTP"
					type="text"
					variant="solid"
					{...register("otp", {
						required: `${t("OTP is required")}`,
						pattern: {
							value:
								/[^0-9]*$/,
							message: t("Invalid OTP"),
						},
					})}
					errorKey={errors.otp?.message}
				/>

				<div className="relative">
					<Button
						type="submit"
						loading={isLoading}
						disabled={isLoading}
						className="h-11 md:h-12 w-full mt-2"
					>
						{t("Verify")}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default OTPVerification;

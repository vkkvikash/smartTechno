import React, { useState } from "react"
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { login, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import OTPVerification from "./otp-verification"

interface responseDataType {
	isLoading: boolean
	otp?: number | string | null;
	mobile: number | string;
	isSuccess: boolean
}

export const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const [response, setResponse] = useState<responseDataType>({
		isLoading: false,
		otp: null,
		mobile: "",
		isSuccess: false
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputType>();

	async function onSubmit({ mobile }: LoginInputType) {
		setResponse((response: any) => {
			return {
				...response,
				isLoading: true
			}
		})
		const isLoggedIn = await login({
			mobile
		});
		if (isLoggedIn.success) {
			setResponse({
				otp: isLoggedIn.data.otp,
				mobile: isLoggedIn.data.mobile,
				isLoading: false,
				isSuccess: true
			})

		} else {
			setResponse((response: any) => {
				return {
					...response,
					isLoading: false
				}
			})
			toast.error(isLoggedIn.message)
		}
	}

	function handleSignUp() {
		setModalView("SIGN_UP_VIEW");
		return openModal();
	}

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("LogIn with Mobile Number")}
				</p>
			</div>
			{response.isSuccess === false && <form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="Mobile"
						type="text"
						placeholder="10 Digit"
						variant="solid"
						{...register("mobile", {
							required: `${t("Mobile number is required")}`,
							pattern: {
								value:
									/^[6-9]\d{9}$/,
								message: t("Invalid Mobile Number"),
							},
						})}
						errorKey={errors.mobile?.message}
					/>

					<div className="relative">
						<Button
							type="submit"
							loading={response.isLoading}
							disabled={response.isLoading}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							{t("Login")}
						</Button>
					</div>
				</div>
			</form>}

			{response.isSuccess === true && <OTPVerification otp={response.otp}
				mobile={response.mobile} device_token={null} device_type={null}
			/>}


			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				New to smart techno please&nbsp;
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{t("register")}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;

import React, { useState } from "react"
import { toast } from "react-toastify";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { signUp, SignUpInputType } from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import OTPVerification from "./otp-verification"

interface formDataType {
	isLoading: boolean;
	otp?: number | string | null;
	mobile: number | string;
	id: number;
	first_name: string;
	device_token: number | null;
	device_type: number | null;
}
const SignUpForm: React.FC = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState<formDataType>({
		isLoading: false,
		otp: null,
		mobile: "",
		id: 0,
		first_name: "",
		device_token: null,
		device_type: null,
	});

	const { setModalView, openModal, closeModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInputType>();

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}


	async function onSubmit({ name, mobile }: SignUpInputType) {
		setFormData(formData => {
			return {
				...formData,
				isLoading: true
			}
		})
		const isSignedUp = await signUp({
			name,
			mobile,
		});
		if (isSignedUp.success) {
			setFormData(formData => {
				return {
					...formData,
					isLoading: false,
					otp: isSignedUp.data.otp,
					mobile: isSignedUp.data.mobile,
					id: isSignedUp.data.id,
					first_name: isSignedUp.data.first_name,
					device_token: isSignedUp.data.device_token,
					device_type: isSignedUp.data.device_type,
				}
			})
			toast.success(isSignedUp.message);
		} else {
			toast.error(isSignedUp.message);
			setFormData(formData => {
				return {
					...formData,
					isLoading: false
				}
			})
		}

	}

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("By signing up, you agree to our")}{" "}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("terms")}
					</Link>{" "}
					&amp;{" "}
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("policy")}
					</Link>
				</p>
			</div>
			{formData.otp === null && <form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="Name"
						type="text"
						variant="solid"
						{...register("name", {
							required: "Name is required",
							pattern: {
								value:
									/^[A-Za-z ]*$/,
								message: t("Please Enter a valid name"),
							},
						})}
						errorKey={errors.name?.message}
					/>
					<Input
						labelKey="Mobile"
						type="text"
						variant="solid"
						{...register("mobile", {
							required: `${t("Mobile number required")}`,
							pattern: {
								value:
									/^[6-9]\d{9}$/,
								message: t("Invalid Mobile number"),
							},
						})}
						errorKey={errors.mobile?.message}
					/>

					<div className="relative">
						<Button
							type="submit"
							loading={formData.isLoading}
							disabled={formData.isLoading}
							className="h-11 md:h-12 w-full mt-2"
						>
							{t("Register")}
						</Button>
					</div>
				</div>
			</form>}
			{formData.otp !== null && <OTPVerification otp={formData.otp}
				mobile={formData.mobile}
				id={formData.id}
				first_name={formData.first_name}
				device_token={formData.device_token}
				device_type={formData.device_type}
			/>}
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("Already have an account ? ")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("Login")}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;

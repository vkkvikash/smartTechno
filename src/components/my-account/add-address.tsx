import { useState } from "react"
import Input from "@components/ui/input";
import { toast } from "react-toastify";
import { RadioBox } from "@components/ui/radiobox";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
	addAddressInputType,
} from "@framework/customer/add-address";
import { useTranslation } from "next-i18next";
import Cookies from 'universal-cookie';
import FormData from 'form-data';
import { submitAPI } from "../../api/service"

const defaultValues = {
	name: "",
	mobile: "",
	pincode: "",
	state: "",
	city: "",
	locality: "",
	landmark: "",
	address: "",
	address_type: "",
	IsDefault: "",
};

const AddAddress: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const cookies = new Cookies();
	const Authorization = cookies.get('Authorization');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<addAddressInputType>({
		defaultValues,
	});
	async function onSubmit(input: addAddressInputType) {
		setIsLoading(true)
		var data = new FormData();
		data.append('name', input.name);
		data.append('mobile', input.mobile);
		data.append('pincode', input.pincode);
		data.append('locality', input.locality);
		data.append('address', input.address);
		data.append('city', input.city);
		data.append('state', input.state);
		data.append('landmark', input.landmark);
		data.append('address_type', input.address_type);
		data.append('is_default', input.IsDefault);
		const isApiSubscribed: any = await submitAPI(data, "POST", "user/address/add", { Authorization });
		if (isApiSubscribed.success) {
			setIsLoading(false)
			toast.success(isApiSubscribed.message)
		} else {
			setIsLoading(false)
			toast.error(isApiSubscribed.message)
		}
	}
	const { t } = useTranslation();
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("Add Address")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex  h-full lg:w-8/12 flex-col`}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full mx-auto flex flex-col justify-center "
				>
					<div className="block lg:grid grid-cols-12 gap-x-10 xl:gap-x-14 pb-10 lg:pb-14 2xl:pb-20 items-start">
						{/* <div className="flex flex-col-2 space-y-3"> */}
						<Input
							labelKey="Name"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
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
							className="col-span-6 mt-4"
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

						<Input
							labelKey="Pincode"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
							{...register("pincode", {
								required: "Name is required",
								pattern: {
									value:
										/^[0-9]\d{5}$/,
									message: t("Please Enter a valid pincode"),
								},
							})}
							errorKey={errors.pincode?.message}
						/>
						<Input
							labelKey="State"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
							{...register("state", {
								required: `${t("State number required")}`,
								pattern: {
									value:
										/^[A-Za-z ]*$/,
									message: t("Invalid State number"),
								},
							})}
							errorKey={errors.state?.message}
						/>
						<Input
							labelKey="City"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"

							{...register("city", {
								required: "city is required",
								pattern: {
									value:
										/^[A-Za-z ]*$/,
									message: t("Please Enter a valid city"),
								},
							})}
							errorKey={errors.city?.message}
						/>
						<Input
							labelKey="Locality"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
							{...register("locality", {
								required: "Landmark is required",
								pattern: {
									value:
										/^[A-Za-z0-9 ]*$/,
									message: t("Please Enter a valid locality"),
								},
							})}
							errorKey={errors.locality?.message}
						/>
						<Input
							labelKey="Landmark"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
							{...register("landmark", {
								required: "Landmark is required",
								pattern: {
									value:
										/^[A-Za-z0-9 ]*$/,
									message: t("Please Enter a valid landmark"),
								},
							})}
							errorKey={errors.landmark?.message}
						/>
						<Input
							labelKey="Address"
							type="text"
							variant="solid"
							className="col-span-6 mt-4"
							{...register("address", {
								required: "Address is required",
								pattern: {
									value:
										/^[A-Za-z0-9 ]*$/,
									message: t("Please Enter a valid address"),
								},
							})}
							errorKey={errors.address?.message}
						/>
						<div className="flex align-center gap-x-10 col-span-12 py-4">
							<RadioBox
								labelKey="Home"
								type="radio"
								{...register("address_type", {
									required: "Address type is required",
								})}
								value="home"
								name="address_type"
								className="col-span-4"
							/>
							<RadioBox
								labelKey="Office"
								type="radio"
								{...register("address_type", {
									required: "Address type is required",
								})}
								value="office"
								name="address_type"
								className="col-span-4"
							/>

							{/* <RadioBox
							labelKey="Yes"
							type="radio"
							{...register("IsDefault", {
								required: "Address type is required",
							})}
							value="yes"
							name="IsDefault"
							className="col-span-3"
						/>

						<RadioBox
							labelKey="No"
							type="radio"
							{...register("IsDefault", {
								required: "Address type is required",
							})}
							value="no"
							name="IsDefault"
							className="col-span-3"
						/> */}
						</div>


						<div className="relative col-span-12">
							<Button
								type="submit"
								loading={isLoading}
								disabled={isLoading}
								className="h-13 mt-3 col-span-12"
							>
								{t("Add Address")}
							</Button>
						</div>
					</div>
				</form>
			</motion.div>
		</>
	);
};

export default AddAddress;

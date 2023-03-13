import React, { useEffect, useState } from "react"
import Cookies from 'universal-cookie';
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { UpdateUserType } from "@framework/customer/use-update-customer";
import { useTranslation } from "next-i18next";
import { submitAPI } from "../../api/service"

interface UserDataTyp {
	firstName: string;
	mobile: string;
}

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

let defaultValues: UserDataTyp = {
	firstName: "",
	mobile: ""
};
const AccountDetails: React.FC = () => {
	const cookies = new Cookies();
	const Authorization = cookies.get('Authorization');

	const [addressList, setAddressList] = useState<addressType[]>([])
	const { t } = useTranslation();
	const {
		register,
		reset,
		formState: { errors },

	} = useForm<UpdateUserType>({ defaultValues })

	useEffect(() => {
		let isApiSubscribed = true;
		const getData = async () => {
			const getUserData: any = await submitAPI({}, "GET", "user/profile", { Authorization });
			const getUserAddress: any = await submitAPI({}, "GET", "user/address/list", { Authorization });
			if (getUserData.success) {
				defaultValues.firstName = getUserData.data.first_name;
				defaultValues.mobile = getUserData.data.mobile;
				reset({ ...defaultValues });
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

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			//@ts-ignore
			variants={fadeInTop(0.35)}
			className={`w-full flex flex-col`}
		>
			<>
				<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
					{t("account-details")}
				</h2>

				<div className="flex flex-col space-y-4 sm:space-y-5">
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="Name"
							disabled
							{...register("firstName", {
								required: "first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
						/>
					</div>
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							type="text"
							disabled
							labelKey="Mobile"
							{...register("mobile", {
								required: "Mobile-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.mobile?.message}
						/>
					</div>
				</div>


				<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mt-6 xl:mb-8">
					{t("Address List")}
				</h2>

				{addressList.map((address: addressType) => {
					return (
						<div className="flex flex-col space-y-4 sm:space-y-5 bg-gray-300 p-4 rounded-lg">
							<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
								<p>NAME : {address.name}</p> <p>MOBILE : {address.mobile}</p>
								<p>PINCODE : {address.pincode}</p> <p>State : {address.state_name}</p><p>City : {address.city}</p>
							</div>
							<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
								<p>Locality : {address.locality}</p> <p>Landmark : {address.landmark}</p> <p>{address.address}</p>
								<p>Address Type: {address.address_type}</p>
							</div>
						</div>
					)
				})}
			</>
		</motion.div>
	);
};

export default AccountDetails;

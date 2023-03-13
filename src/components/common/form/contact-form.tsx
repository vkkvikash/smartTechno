import Input from "@components/ui/input";
import Button from "@components/ui/button";
import FormData from "form-data";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
import { submitAPI } from "src/api/service";

interface ContactFormValues {
	name: string;
	email: string;
	subject: string;
	message: string;
	mobile: string;
}
let defaultValues: ContactFormValues = {
	name: "",
	email: "",
	subject: "",
	message: "",
	mobile: ""
};

const ContactForm: React.FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>();
	async function onSubmit(values: ContactFormValues) {
		var data = new FormData();
		data.append('name', values.name);
		data.append('email', values.email);
		data.append('phone_number', values.mobile);
		data.append('subject', values.subject);
		data.append('message', values.message);
		const isApiSubscribed: any = await submitAPI(data, "POST", "contactus/send", { 'Content-Type': 'multipart/form-data' });
		if (isApiSubscribed.success) {
			toast.success(isApiSubscribed.message)
			reset({ ...defaultValues });
		} else {
			toast.error(isApiSubscribed.message)
			reset({ ...defaultValues });
		}

	}
	const { t } = useTranslation();
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			<div className="flex flex-col space-y-5">
				<div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
					<Input
						labelKey="Name"
						placeholderKey="Name"
						{...register("name", { required: "Name is required" })}
						className="w-full md:w-1/2 "
						errorKey={errors.name?.message}
						variant="solid"
					/>
					<Input
						labelKey="Email"
						type="email"
						placeholderKey="forms:placeholder-email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Email should be valid",
							},
						})}
						className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
						errorKey={errors.email?.message}
						variant="solid"
					/>
				</div>
				<Input
					labelKey="Mobile"
					{...register("mobile", {
						required: "Mobile number is required",
						pattern: {
							value:
								/^[6-9]\d{9}$/,
							message: t("Invalid Mobile Number"),
						}
					},
					)}
					className="relative"
					placeholderKey="Mobile"
					errorKey={errors.mobile?.message}
					variant="solid"
				/>
				<Input
					labelKey="Subject"
					{...register("subject", { required: "Subject is required" })}
					className="relative"
					placeholderKey="Subject"
					errorKey={errors.subject?.message}
					variant="solid"
				/>
				<TextArea
					labelKey="Message"
					{...register("message")}
					className="relative mb-4"
					placeholderKey="Message"
				/>
				<div className="relative">
					<Button
						type="submit"
						className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
					>
						{t("Send Message")}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;

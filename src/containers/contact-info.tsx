import { FC, useState, useEffect } from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import FormData from "form-data";
import { submitAPI } from "src/api/service";

interface Props {
	image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {

	const { t } = useTranslation("common");
	const [contactBlock, setContactBlock] = useState<any>([]);
	const [mapImage, setMapImage] = useState("");

	useEffect(() => {
		async function getInfo() {
			const data = new FormData();
			const info: any = await submitAPI(data, "GET", "get/setting", {});
			setMapImage(info.data.google_maps)
			setContactBlock([
				{
					id: 1,
					slug: "/",
					icon: <IoLocationSharp />,
					name: "Address",
					description: info?.data?.address
				},
				{
					id: 2,
					slug: "/",
					icon: <IoMail />,
					name: "Email",
					description: info?.data?.support_email,
				},
				{
					id: 3,
					slug: "/",
					icon: <IoCallSharp />,
					name: "Phone",
					description: info?.data?.support_phone,
				},
			])
		}
		getInfo()
	}, [])
	return (
		<div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
			<h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
				{t("Find us here")}
			</h4>
			{contactBlock?.map((item: any) => (
				<div key={`contact--key${item.id}`} className="flex pb-7">
					<div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
						{item.icon}
					</div>
					<div className="flex flex-col ps-3 2xl:ps-4">
						<h5 className="text-sm font-bold text-heading">
							{t(`${item.name}`)}
						</h5>
						<Link href={item.slug} className="text-sm mt-0">
							{t(`${item.description}`)}
						</Link>
					</div>
				</div>
			))}
			<iframe
				width="360"
				height="186"
				style={{ border: "0px" }}
				loading="lazy"
				allowfullscreen
				referrerpolicy="no-referrer-when-downgrade"
				src={mapImage}>
			</iframe>
		</div>
	);
};

export default ContactInfoBlock;

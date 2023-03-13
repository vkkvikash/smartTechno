import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import FormData from 'form-data';
import { submitAPI } from "../api/service"

interface CategoryBannerProps {
	className?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
	className = "mb-7",
}) => {
	const { query } = useRouter();
	const [bannerImage, setBannerImage] = useState("")
	useEffect(() => {
		let isApiSubscribed = true;
		async function getBanner() {
			var data = new FormData();
			data.append("slug", query.slug)
			const isApiSubscribed: any = await submitAPI(data, "POST", "get/category/details", { 'Content-Type': 'multipart/form-data' });
			if (isApiSubscribed.success) {
				setBannerImage(isApiSubscribed.data.banner_image)
			}
		}
		if (isApiSubscribed) {
			getBanner()
		}

		return () => {
			isApiSubscribed = false;
		}
	}, [query])

	const categoryTitle = query.slug?.toString().split("-").join("");
	return (
		<div
			className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
		>
			<div className="hidden md:flex">
				<Image
					unoptimized
					src={bannerImage !== "" ? bannerImage : "/assets/images/category-banner.jpg"}
					alt="Category Banner"
					width={1800}
					height={570}
					className="rounded-md"
				/>
			</div>
			<div className="relative md:absolute top-0 start-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
				<h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full">
					#{categoryTitle}
				</h2>
			</div>
		</div>
	);
};

export default CategoryBanner;

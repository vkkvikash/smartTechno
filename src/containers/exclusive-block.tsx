import Image from "next/image";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";

interface Props {
	className?: string;
	variant?: "default" | "modern";
	banners?: any;
}

const ExclusiveBlock: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	variant = "default",
	banners
}) => {
	const { t } = useTranslation("common");
	const exclusiveName = "NEW YEAR";
	const year = (new Date()).getFullYear();

	return (
		<div className={`rounded-md overflow-hidden lg:block ${className}`}>
			<div className="flex justify-between">
				{banners.slice(0, 2).map((item: any, index: number) => (
					<div
						className={`group w-2/4 flex justify-between items-end relative transition duration-200 ease-in ${item.id === 2 && variant === "modern"
							? "flex-row"
							: "flex-row-reverse"
							} ${item.backgroundColor} ${index % 2 == 1 ? "lightRedBg" : "lightBluBg"}`}
						key={`exclusive--key${item.id}`}
					>
						<div
							className={`exclusiveImage relative z-10 flex transform transition duration-200 ease-in group-hover:scale-105 ${variant === "modern" && item.id === 2
								? "me-auto 2xl:ps-24 3xl:ps-40"
								: "ms-auto 2xl:pe-24 3xl:pe-40"
								}`}
						>
							<Image
								unoptimized
								src={item.image.imageDesktop || item.image.imageMobile}
								alt={item.buttonText}
								width={600}
								height={600}
							/>
						</div>
						<Link
							href={item.slug}
							className={`absolute z-10 bottom-3 sm:bottom-5 inline-block bg-white shadow-product rounded-md text-heading lowercase text-sm xl:text-xl 2xl:text-xl sm:uppercase px-3 sm:px-5 xl:px-6 2xl:px-8 py-2.5 sm:py-4 xl:py-5 2xl:py-7 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white ${item.id === 2
								? variant === "modern"
									? "end-3 sm:end-5 xl:end-7"
									: "start-3 sm:start-5 xl:start-7"
								: variant === "modern"
									? "start-3 sm:start-5 xl:start-7"
									: "end-3 sm:end-5 xl:end-7"
								} ${variant === "modern"
									? "xl:top-7 xl:bottom-auto"
									: "xl:bottom-7 xl:top-auto"
								}`}
						>
							{t(`${item.buttonText}`)}
						</Link>
						{exclusiveName && (
							<div
								className={`z-0 absolute top-10 xl:top-12 2xl:top-16 3xl:top-24 uppercase text-black opacity-10 text-xl xl:text-2xl 3xl:text-3xl tracking-widest leading-5 ${item.id === 2 ? "start-5 xl:start-7" : "end-5 xl:end-7"
									}`}
							>
								{/* {item.id !== 2
									? t(`${exclusiveName}`)
									: t("Exclusive")} */}
								{item.id % 2 == 0 ? "AMD" : "INTEL"}
							</div>
						)}

						{year && (
							<div
								className={`exclusiveYear absolute top-16 xl:top-20 2xl:top-24 3xl:top-32 start-0 z-10 text-black font-bold leading-none tracking-widest ${item.id === 2 ? "text-start pl-4 start-0" : "text-end end-0"
									}`}
							>
								{item.id !== 2
									? year.toString().slice(0, 2)
									: year.toString().slice(2, 4)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ExclusiveBlock;

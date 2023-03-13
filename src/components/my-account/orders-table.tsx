import { useState, useEffect } from "react"
import Cookies from 'universal-cookie';
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { submitAPI } from "src/api/service";
import { toast } from "react-toastify";

const OrdersTableRowDesktop: React.FC = ({ order }: any) => {
	const { t } = useTranslation("common");
	return (
		<>
			<tr className="border-b border-gray-300 last:border-b-0">
				<td className="px-4 py-5 text-start">
					<Link
						href={`/my-account/orders/${order.id}`}
						className="underline hover:no-underline text-body"
					>
						#{order.id}
					</Link>
				</td>
				<td className="text-start lg:text-center px-4 py-5 text-heading">
					{order.order_date}
				</td>
				<td className="text-start lg:text-center px-4 py-5 text-heading">
					{order.order_status}
				</td>
				<td className="text-start lg:text-center px-4 py-5 text-heading">
					{order.total}
				</td>
				<td className="text-end px-4 py-5 text-heading">
					<Link
						href={`/my-account/orders/${order.id}`}
						className="mx-2 text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
					>
						{t("button-view")}
					</Link>
					<a
						href={order.customer_bill}
						target="_blank"
						className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
					>
						{t("Invoice")}
					</a>
				</td>
			</tr>
		</>
	)
}

const OrdersTableRowMobile: React.FC = ({ order }: any) => {
	const { t } = useTranslation("common");
	return (
		<>
			<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
				<li className="flex items-center justify-between">
					{t("Order")}
					<span className="font-normal">
						<Link
							href={`/my-account/orders/${order.id}`}
							className="underline hover:no-underline text-body"
						>
							#{order.id}
						</Link>
					</span>
				</li>
				<li className="flex items-center justify-between">
					{t("Date")}
					<span className="font-normal">{order.order_date}</span>
				</li>
				<li className="flex items-center justify-between">
					{t("Status")}
					<span className="font-normal">{order.order_status}</span>
				</li>
				<li className="flex items-center justify-between">
					{t("Total")}
					<span className="font-normal">{order.total}</span>
				</li>
				<li className="flex items-center justify-between">
					{t("Actions")}
					<span className="font-normal">
						<Link
							href={`/my-account/orders/${order.id}`}
							className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
						>
							{t("button-view")}
						</Link>
					</span>
					<span className="font-normal">
						<a
							href={order.customer_bill}
							target="_blank"
							className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
						>
							{t("button-view")}
						</a>
					</span>
				</li>
			</ul>
		</>
	)
}

const OrdersTable: React.FC = () => {
	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	const cookies = new Cookies();
	const Authorization = cookies.get('Authorization');
	const [orderList, setOrderList] = useState([]);

	useEffect(() => {
		let isApiSubscribed = true
		const getOrders = async () => {
			if (Authorization) {
				const getUserOrders: any = await submitAPI({}, "GET", "my/order", { Authorization });
				if (getUserOrders.success) {
					if (getUserOrders.data.length) {
						setOrderList(getUserOrders.data)
					}
				}
			} else {
				toast.error("Please Login to check your orders")
			}

		}
		if (isApiSubscribed) {
			getOrders()
		}

		return () => {
			isApiSubscribed = false
		}
	}, [])
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("Orders")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<tr>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
									{t("Order number")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("Date")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("Status")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("Total")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
									{t("Actions")}
								</th>
							</tr>
						</thead>
						<tbody className="text-sm lg:text-base">
							{orderList.length > 0 ? (
								orderList.map((order: any) => {
									return (
										< OrdersTableRowDesktop order={order} key={order.id} />
									)
								})
							) : null}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
						{orderList.length > 0 ? (
							orderList.map((order: any) => {
								return (
									< OrdersTableRowMobile order={order} key={order.id} />
								)
							})
						) : null}
					</div>
				)}
			</motion.div>
		</>
	);
};

export default OrdersTable;

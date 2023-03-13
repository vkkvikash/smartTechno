import { useEffect } from "react"
import Cookies from 'universal-cookie'
import Router from "next/router";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
import OrderInformation from "@components/order/order-information";
import AccountLayout from "@components/my-account/account-layout";
import OrderDetails from "@components/order/order-details";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function OrderPage() {
	const cookies = new Cookies();
	useEffect(() => {
		const Authorization = cookies.get("Authorization");
		const userId = cookies.get("userId");
		if (userId && Authorization) {
			return
		} else {
			Router.push("/signin")
		}
	}, [])

	return (
		<>
			<PageHeader pageHeader="text-page-order" />
			<Container>
				<OrderInformation />
			</Container>
		</>

	);

}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};

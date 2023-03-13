import { useEffect } from "react"
import Cookies from 'universal-cookie'
import Router from "next/router";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function OrdersTablePage() {

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
		<AccountLayout>
			<OrdersTable />
		</AccountLayout>
	);

}

OrdersTablePage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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

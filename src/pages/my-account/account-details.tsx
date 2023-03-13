import { useEffect } from "react"
import Cookies from 'universal-cookie'
import Router from "next/router";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AccountDetails from "@components/my-account/account-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function AccountDetailsPage() {
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
			<AccountDetails />
		</AccountLayout>
	);


}

AccountDetailsPage.Layout = Layout;

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

import { useEffect } from "react"
import Cookies from 'universal-cookie'
import Router from "next/router";
import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

export default function AccountPage() {
	const { t } = useTranslation("common");
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
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
				{t("Dashboard")}
			</h2>
			<p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
				{t("From your account dashboard you can view your")}{" "}
				<Link
					href={ROUTES.ORDERS}
					className="text-heading underline font-semibold"
				>
					{t("recent orders")}
				</Link>
				, {t("manage your")}{" "}
				<Link
					href={ROUTES.ACCOUNT_DETAILS}
					className="text-heading underline font-semibold"
				>
					{t("Account Details")}
				</Link>{" "}
				{t("and")}{" "}
				<Link
					href={ROUTES.CHANGE_PASSWORD}
					className="text-heading underline font-semibold"
				>
					{t("change your password")}
				</Link>
				.
			</p>
		</AccountLayout>
	);
}

AccountPage.Layout = Layout;

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

import React, { useState, useEffect } from "react"
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import Accordion from "@components/common/accordion";
import PageHeader from "@components/ui/page-header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { submitAPI } from "../api/service"

interface FAQ {
	questions: string;
	answer: string;
	id: number | string
}
export default function FAQ() {

	const [content, setContent] = useState<FAQ[]>([{
		questions: "",
		answer: "",
		id: 0
	}])
	useEffect(() => {
		let isApiSubscribe = true;
		async function getData() {
			const response: any = await submitAPI({}, "GET", "faq/list", {})
			if (response.success) {
				const finalData: any = []
				response.data.faq.map((faq: any) => {
					const obj = {
						questions: faq.questions,
						answer: faq.answers,
						id: faq.id
					}
					finalData.push(obj)

				})
				setContent(finalData)
			}
		}
		if (isApiSubscribe) {
			getData()
		}
		return () => {
			isApiSubscribe = false
		}
	}, [])
	return (
		<>
			<PageHeader pageHeader="text-page-faq" />
			<Container>
				<div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
					{content.length && <Accordion items={content} translatorNS="faq" />}
				</div>
				<Subscription />
			</Container>
		</>
	);
}

FAQ.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"faq",
				"footer",
			])),
		},
	};
};

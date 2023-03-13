import Container from '@components/ui/container'
import Layout from '@components/layout/layout'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BrandBlock from '@containers/brand-block';


export default function FAQ() {


    return (
        <>
            <Container>
                <BrandBlock sectionHeading="Top-Brands" className="brandBlockHomePage" />
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


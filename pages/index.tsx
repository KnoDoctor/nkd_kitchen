import { useRouter } from "next/router";

import { GetStaticProps } from "next";

import RenderComponents from "../components/__cms/RenderComponents";

export default function Home({ pageData }: any) {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const page = pageData?.data;

	return <RenderComponents cmsData={page?.cms_data} />;
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async () => {
	try {
		//Fetch Page Data
		const pageReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/pages/6555bcef-0836-4e91-a9ed-3f5bcebfd266`
		);

		const pageData = await pageReq.json();

		if (!pageData.success) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				pageData: pageData,
			},
			// Next.js will attempt to re-generate the page:
			// - When a request comes in
			// - At most once every second
			revalidate: 30, // In seconds
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
};

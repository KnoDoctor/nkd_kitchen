import { useRouter } from "next/router";

import { GetStaticProps } from "next";

import RenderComponents from "../components/__cms/RenderComponents";
import ArticleCard from "../components/_molecules/__cards/ArticleCard";
import CardSlider from "../components/_molecules/__cards/CardSlider";

export default function Home({ pageData }: any) {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const page = pageData?.data;

	return (
		<>
			<RenderComponents cmsData={page?.cms_data} />
			<div style={{ maxWidth: "250px", margin: "2rem auto" }}>
				<ArticleCard />
			</div>
			<div style={{ maxWidth: "100%", margin: "2rem auto" }}>
				<CardSlider
					slides={[
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
						{ title: "boop" },
					]}
				/>
			</div>
		</>
	);
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async () => {
	try {
		//Fetch Page Data
		const pageReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/pages/fd42735f-49ae-450b-9854-d7633b6d0f08`
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

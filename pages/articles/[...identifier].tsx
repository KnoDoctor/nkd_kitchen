import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import RenderComponents from "../../components/__cms/RenderComponents";

const Article = ({ articleData }: any) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const article = articleData?.data[0];

	return (
		<div>
			<RenderComponents cmsData={article?.cms_data} />
		</div>
	);
};

export default Article;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	// const paths = sampleUserData.map((user) => ({
	//   params: { id: user.id.toString() },
	// }))

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return {
		paths: [{ params: { identifier: ["e6a95da2-342e-4de2-a7bb-c9c4240e8e33"] } }],
		fallback: true,
	};
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params)
		return {
			notFound: true,
		};

	const articleLookupString = params.identifier;

	let convertedArticleLookupString: any;
	if (Array.isArray(articleLookupString)) {
		convertedArticleLookupString = articleLookupString.join("___");
	}

	try {
		//Fetch Article Data
		const articleReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/articles/___${convertedArticleLookupString}`
		);

		const articleData = await articleReq.json();

		if (!articleData.success) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				articleData: articleData,
			},
			// Next.js will attempt to re-generate the article:
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

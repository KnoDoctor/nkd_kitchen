import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import RenderComponents from "../components/__cms/RenderComponents";

const Page = ({ pageData }: any) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div style={{ padding: "150px" }}>Loading...</div>;
	}

	const page = pageData?.data[0];

	return <RenderComponents cmsData={page?.cms_data} />;
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	// const paths = sampleUserData.map((user) => ({
	//   params: { id: user.id.toString() },
	// }))

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return {
		paths: [{ params: { identifier: ["5dc04042-6753-4a56-a660-c8b6c542fc99"] } }],
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

	const pageLookupString = params.identifier;

	let convertedPageLookupString: any;
	if (Array.isArray(pageLookupString)) {
		convertedPageLookupString = pageLookupString.join("___");
	}

	try {
		//Fetch Page Data
		const pageReq = await fetch(
			`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/pages/___${convertedPageLookupString}`
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

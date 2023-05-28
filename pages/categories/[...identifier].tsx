import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

// import RenderComponents from "../../components/__cms/RenderComponents";
import Button from "@mui/material/Button";

const Category = ({ categoryData }: any) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div style={{ padding: "150px" }}>Loading...</div>;
    }

    const category = categoryData?.data[0];
    console.log(categoryData);

    return (
        <div>
            <div style={{ paddingTop: "100px" }}>{categoryData?.data?.category_name}</div>
            {/* <RenderComponents cmsData={category?.cms_data} /> */}
            <Button onClick={() => router.back()}>Back</Button>
        </div>
    );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    // const paths = sampleUserData.map((user) => ({
    //   params: { id: user.id.toString() },
    // }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths: [],
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

    const identifier = params.identifier;

    try {
        //Fetch Category Data
        const categoryReq = await fetch(
            `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/categories/${identifier}`
        );

        const categoryData = await categoryReq.json();

        if (!categoryData.success) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                categoryData: categoryData,
            },
            // Next.js will attempt to re-generate the category:
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
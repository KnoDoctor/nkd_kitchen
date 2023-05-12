import Link from "../../components/_atoms/Link";
import useArticles from "../../hooks/articles/useArticles";

const Articles = () => {
	const articles = useArticles();

	if (articles.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div style={{ paddingTop: "125px" }}>
			<ul>
				{articles.data.data.map((article: any) => (
					<Link href={`/articles${article.article_lookup_string.replace(/___/g, "/")}`}>
						<li>{article.article_name}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Articles;

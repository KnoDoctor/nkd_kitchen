import Link from "../../components/_atoms/Link";
import ListCard from "../../components/_molecules/__cards/ListCard";
import useRecipes from "../../hooks/recipes/useRecipes";

const Recipes = () => {
	const recipes = useRecipes();

	if (recipes.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<div style={{ paddingTop: "125px", maxWidth: "600px", margin: "auto" }}>
			{recipes.data.data.map((recipe: any, i: number) => (
				<Link href={`/recipes/${recipe.recipe_id}`} sx={{ textDecoration: "none" }}>
					<ListCard
						name={recipe.recipe_name}
						user={recipe.users.name}
						image={`https://picsum.photos/300/200?random=${i}`}
					/>
				</Link>
			))}
		</div>
	);
};

export default Recipes;

import Link from "../../components/_atoms/Link";
    import useRecipes from "../../hooks/recipes/useRecipes";
    
    const Recipes = () => {
        const recipes = useRecipes();
    
        if (recipes.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {recipes.data.data.map((recipe: any) => (
                        <Link href={`/recipes/${recipe.recipe_id}`}>
                            <li>{recipe.recipe_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default Recipes;
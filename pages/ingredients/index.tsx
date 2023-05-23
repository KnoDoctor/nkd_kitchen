import Link from "../../components/_atoms/Link";
    import useIngredients from "../../hooks/ingredients/useIngredients";
    
    const Ingredients = () => {
        const ingredients = useIngredients();
    
        if (ingredients.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {ingredients.data.data.map((ingredient: any) => (
                        <Link href={`/ingredients/${ingredient.ingredient_id}`}>
                            <li>{ingredient.ingredient_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default Ingredients;
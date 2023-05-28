import Link from "../../components/_atoms/Link";
    import useCategories from "../../hooks/categories/useCategories";
    
    const Categories = () => {
        const categories = useCategories();
    
        if (categories.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {categories.data.data.map((category: any) => (
                        <Link href={`/categories/${category.category_id}`}>
                            <li>{category.category_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default Categories;
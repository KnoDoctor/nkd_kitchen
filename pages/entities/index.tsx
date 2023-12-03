import Link from "../../components/_atoms/Link";
    import useEntities from "../../hooks/entities/useEntities";
    
    const Entities = () => {
        const entities = useEntities();
    
        if (entities.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {entities.data.data.map((entity: any) => (
                        <Link href={`/entities/${entity.entity_id}`}>
                            <li>{entity.entity_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default Entities;
import Link from "../../components/_atoms/Link";
    import useModules from "../../hooks/modules/useModules";
    
    const Modules = () => {
        const modules = useModules();
    
        if (modules.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {modules.data.data.map((module: any) => (
                        <Link href={`/modules/${module.module_id}`}>
                            <li>{module.module_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default Modules;
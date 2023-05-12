import Link from "../../components/_atoms/Link";
    import usePeople from "../../hooks/people/usePeople";
    
    const People = () => {
        const people = usePeople();
    
        if (people.isLoading) {
            return <div>Loading</div>;
        }
    
        return (
            <div style={{ paddingTop: "125px" }}>
                <ul>
                    {people.data.data.map((person: any) => (
                        <Link href={`/people/${person.person_id}`}>
                            <li>{person.person_name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default People;
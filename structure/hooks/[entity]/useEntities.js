module.exports.buildUseEntitiesFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import useSWR from "swr";

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}

export default function use${uppercasePlural}() {
    const { data, error, mutate }: any = useSWR(\`/api/${lowercasePlural}\`, fetcher);

    return {
        data,
        isLoading: !error && !data,
        error,
        mutate,
    };
}`;
};

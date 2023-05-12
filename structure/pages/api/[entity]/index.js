module.exports.buildApiIndexFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            return get${uppercasePlural}();
        case "POST":
            return create${uppercaseSingular}();
        default:
            return res.status(405).end(\`Method \${req.method} Not Allowed\`);
    }

    async function get${uppercasePlural}() {
        try {
            const all${uppercasePlural} = await prisma.${lowercasePlural}.findMany();

            res.status(200).json({
                success: true,
                data: all${uppercasePlural},
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function create${uppercaseSingular}() {
        try {
            const { ${lowercaseSingular}_name } = req.body;

            if (!${lowercaseSingular}_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create ${lowercaseSingular}, name parameter is missing.",
                });
            }

            const created${uppercaseSingular} = await prisma.${lowercasePlural}.create({
                data: {
                    ${lowercaseSingular}_id: generateGuid(),
                    ${lowercaseSingular}_name,
                },
            });

            res.status(201).json({
                success: true,
                data: created${uppercaseSingular},
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }
}
`;
};

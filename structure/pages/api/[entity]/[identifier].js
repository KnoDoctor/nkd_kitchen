module.exports.buildApiIdentifierFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { identifier },
        method,
    } = req;

    let ${lowercaseSingular}_id = typeof identifier === "string" ? identifier : "";

    if (!checkIfGuid(${lowercaseSingular}_id))
        return res.status(400).json({
            success: false,
            error: "Please supply a uuid.",
        });

    switch (method) {
        case "GET":
            return get${uppercaseSingular}();
        case "PATCH":
            return update${uppercaseSingular}();
        case "DELETE":
            return delete${uppercaseSingular}();
        default:
            return res.status(405).end(\`Method \${req.method} Not Allowed\`);
    }

    async function get${uppercaseSingular}() {
        try {
            let ${lowercaseSingular} = await prisma.${lowercasePlural}.findUnique({
                where: {
                    ${lowercaseSingular}_id,
                },
            });

            if (${lowercaseSingular}) {
                res.status(200).json({
                    success: true,
                    data: ${lowercaseSingular},
                });
            } else {
                res.status(404).json({
                    success: false,
                    data: ${lowercaseSingular},
                });
            }
        } catch (error) {
            console.log(error);

            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function update${uppercaseSingular}() {
        try {
            const { ${lowercaseSingular}_name } = req.body;

            const patchedPost = await prisma.${lowercasePlural}.update({
                where: {
                    ${lowercaseSingular}_id,
                },
                data: {
                    ${lowercaseSingular}_name,
                },
            });

            res.status(200).json({
                success: true,
                data: patchedPost,
            });
        } catch (error) {
            console.log(error);

            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function delete${uppercaseSingular}() {
        try {
            const deletedPost = await prisma.${lowercasePlural}.delete({
                where: {
                    ${lowercaseSingular}_id,
                },
            });

            res.status(200).json({
                success: true,
                data: null,
            });
        } catch (error) {
            console.log(error);

            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }
}`;
};

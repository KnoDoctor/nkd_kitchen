import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { identifier },
        method,
    } = req;

    let entity_id = typeof identifier === "string" ? identifier : "";

    if (!checkIfGuid(entity_id))
        return res.status(400).json({
            success: false,
            error: "Please supply a uuid.",
        });

    switch (method) {
        case "GET":
            return getEntity();
        case "PATCH":
            return updateEntity();
        case "DELETE":
            return deleteEntity();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getEntity() {
        try {
            let entity = await prisma.entities.findUnique({
                where: {
                    entity_id,
                },
            });

            if (entity) {
                res.status(200).json({
                    success: true,
                    data: entity,
                });
            } else {
                res.status(404).json({
                    success: false,
                    data: entity,
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

    async function updateEntity() {
        try {
            const { entity_name } = req.body;

            const patchedPost = await prisma.entities.update({
                where: {
                    entity_id,
                },
                data: {
                    entity_name,
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

    async function deleteEntity() {
        try {
            const deletedPost = await prisma.entities.delete({
                where: {
                    entity_id,
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
}
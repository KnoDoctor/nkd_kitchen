import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            return getCategories();
        case "POST":
            return createCategory();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getCategories() {
        try {
            const allCategories = await prisma.categories.findMany();

            res.status(200).json({
                success: true,
                data: allCategories,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createCategory() {
        try {
            const { category_name } = req.body;

            if (!category_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create category, name parameter is missing.",
                });
            }

            const createdCategory = await prisma.categories.create({
                data: {
                    category_id: generateGuid(),
                    category_name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdCategory,
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

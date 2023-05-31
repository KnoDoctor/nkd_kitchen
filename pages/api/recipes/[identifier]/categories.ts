import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../../utils/uuids";
import sendError from "../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "POST":
			return createRecipeCategoryRelationship();
		// case "DELETE":
		// 	return deleteRecipeCategoryRelationship();
		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}

	async function createRecipeCategoryRelationship() {
		try {
			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			// const { categoryRelationshipsToAdd, categoryRelationshipsToRemove } = req.body;
			const { recipe_id, category_id } = req.body;

			const addedCategoryRelationships = await prisma.recipes_categories.create({
				data: {
					recipe_id,
					category_id,
				},
			});

			// const createdRecipe = await prisma.recipes.create({
			// 	data: {
			// 		recipe_id: generateGuid(),
			// 		recipe_name,
			// 		user_id,
			// 	},
			// });

			res.status(201).json({
				success: true,
				data: {
					addedCategoryRelationships,
				},
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
}

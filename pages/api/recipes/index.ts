import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import prisma from "../../../prisma/prismaClientInstance";

import { generateGuid } from "../../../utils/uuids";
import sendError from "../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getRecipes();
		case "POST":
			return createRecipe();
		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}

	async function getRecipes() {
		try {
			const allRecipes = await prisma.recipes.findMany({
				include: {
					users: { select: { name: true } },
					recipes_ingredients: {
						select: {
							ingredients: {
								include: {
									substituting_ingredient: true,
									substituted_ingredient: true,
								},
							},
							quantity: true,
							unit: true,
						},
					},
					recipes_categories: true,
				},
			});

			res.status(200).json({
				success: true,
				data: allRecipes,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}

	async function createRecipe() {
		try {
			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			const { recipe_name } = req.body;

			if (!recipe_name) {
				return sendError(res, 400, "Could not create recipe, name parameter is missing.");
			}

			const createdRecipe = await prisma.recipes.create({
				data: {
					recipe_id: generateGuid(),
					recipe_name,
					user_id,
				},
			});

			res.status(201).json({
				success: true,
				data: createdRecipe,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
}

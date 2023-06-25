import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../../../utils/uuids";
import sendError from "../../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		query: { identifier, ingredient_id },
	} = req;

	switch (method) {
		case "GET":
			return getRecipeIngredientRelationship();
		case "POST":
			return createRecipeIngredientRelationship();
		case "PATCH":
			return updateRecipeIngredientRelationship();
		case "DELETE":
			return deleteRecipeIngredientRelationship();
		default:
			return sendError(res, 405, `Method ${method} Not Allowed`);
	}

	async function getRecipeIngredientRelationship() {
		try {
			if (typeof identifier != "string" || typeof ingredient_id != "string") {
				throw new Error(
					"Identifiers for relationship are not typeof string, please check URL and try again."
				);
			}

			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			const recipeIngredientRelationship = await prisma.recipes_ingredients.findUnique({
				where: {
					recipe_id_ingredient_id: {
						recipe_id: identifier,
						ingredient_id,
					},
				},
			});

			res.status(200).json({
				success: true,
				data: {
					recipeIngredientRelationship,
				},
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
	async function createRecipeIngredientRelationship() {
		try {
			if (typeof identifier != "string" || typeof ingredient_id != "string") {
				throw new Error(
					"Identifiers for relationship are not typeof string, please check URL and try again."
				);
			}

			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			const addedIngredientRelationships = await prisma.recipes_ingredients.create({
				data: {
					recipe_id: identifier,
					ingredient_id,
				},
			});

			res.status(201).json({
				success: true,
				data: {
					addedIngredientRelationships,
				},
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
	async function updateRecipeIngredientRelationship() {
		try {
			if (typeof identifier != "string" || typeof ingredient_id != "string") {
				throw new Error(
					"Identifiers for relationship are not typeof string, please check URL and try again."
				);
			}

			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			const { quantity, unit } = req.body;

			const patchedPost = await prisma.recipes_ingredients.update({
				where: {
					recipe_id_ingredient_id: {
						recipe_id: identifier,
						ingredient_id,
					},
				},
				data: {
					quantity,
					unit,
				},
			});

			res.status(200).json({
				success: true,
				data: patchedPost,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
	async function deleteRecipeIngredientRelationship() {
		try {
			if (typeof identifier != "string" || typeof ingredient_id != "string") {
				throw new Error(
					"Identifiers for relationship are not typeof string, please check URL and try again."
				);
			}

			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please login and try again.");
			}

			await prisma.recipes_ingredients.delete({
				where: {
					recipe_id_ingredient_id: {
						recipe_id: identifier,
						ingredient_id,
					},
				},
			});

			res.status(200).json({
				success: true,
				data: {},
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
}

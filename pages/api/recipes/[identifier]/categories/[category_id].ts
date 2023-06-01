import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../../../utils/uuids";
import sendError from "../../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		query: { identifier, category_id },
	} = req;

	switch (method) {
		case "POST":
			return createRecipeCategoryRelationship();
		case "DELETE":
			return deleteRecipeCategoryRelationship();
		default:
			return sendError(res, 405, `Method ${method} Not Allowed`);
	}

	async function createRecipeCategoryRelationship() {
		try {
			if (typeof identifier != "string" || typeof category_id != "string") {
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

			const addedCategoryRelationships = await prisma.recipes_categories.create({
				data: {
					recipe_id: identifier,
					category_id,
				},
			});

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
	async function deleteRecipeCategoryRelationship() {
		try {
			if (typeof identifier != "string" || typeof category_id != "string") {
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

			await prisma.recipes_categories.delete({
				where: {
					recipe_id_category_id: {
						recipe_id: identifier,
						category_id,
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

import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import sendError from "../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	switch (method) {
		case "GET":
			return getMyRecipes();

		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}

	async function getMyRecipes() {
		try {
			if (typeof identifier != "string") {
				throw new Error(
					"The user_id supplied was not valid, please check the id provided and try again."
				);
			}

			const myRecipes = await prisma.recipes.findMany({
				where: {
					user_id: identifier,
				},
			});

			res.status(201).json({
				success: true,
				data: myRecipes,
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
}

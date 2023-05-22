import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import sendError from "../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getMyRecipes();

		default:
			return sendError(res, 405, `Method ${req.method} Not Allowed`);
	}

	async function getMyRecipes() {
		try {
			const token = await getToken({ req });

			if (!token) {
				throw new Error("Could not authenicate user, please login and try again.");
			}

			const { sub: user_id } = token;

			if (typeof user_id != "string") {
				throw new Error("user_id was not valid, please refresh your and try again.");
			}

			const myRecipes = await prisma.recipes.findMany({
				where: {
					user_id,
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

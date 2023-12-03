import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../../../utils/uuids";
import sendError from "../../../../../utils/helperFunctions/sendError";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		query: { identifier, entity_id },
	} = req;

	switch (method) {
		case "POST":
			return createModuleEntityRelationship();
		case "PATCH":
			return updateModuleEntityRelationship();
		case "DELETE":
			return deleteModuleEntityRelationship();
		default:
			return sendError(res, 405, `Method ${method} Not Allowed`);
	}

	async function createModuleEntityRelationship() {
		try {
			if (typeof identifier != "string" || typeof entity_id != "string") {
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

			const addedEntityRelationships = await prisma.modules_entities.create({
				data: {
					modules_entities_id: generateGuid(),
					module_id: identifier,
					entity_id,
				},
			});

			res.status(201).json({
				success: true,
				data: {
					addedEntityRelationships,
				},
			});
		} catch (error) {
			console.log(error);
			sendError(res, 400, error);
		}
	}
	async function updateModuleEntityRelationship() {
		try {
			if (typeof identifier != "string" || typeof entity_id != "string") {
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

			const patchedPost = await prisma.modules_entities.update({
				where: {
					module_id_entity_id: {
						module_id: identifier,
						entity_id,
					},
				},
				data: {},
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
	async function deleteModuleEntityRelationship() {
		try {
			if (typeof identifier != "string" || typeof entity_id != "string") {
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

			await prisma.modules_entities.delete({
				where: {
					module_id_entity_id: {
						module_id: identifier,
						entity_id,
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

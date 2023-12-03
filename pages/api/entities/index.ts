import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prismaClientInstance";

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getEntities();
		case "POST":
			return createEntity();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getEntities() {
		try {
			const allEntities = await prisma.entities.findMany();

			res.status(200).json({
				success: true,
				data: allEntities,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createEntity() {
		try {
			const { entity_name, entity_slug } = req.body;

			if (!entity_name) {
				return res.status(400).json({
					success: false,
					error: "Could not create entity, name parameter is missing.",
				});
			}
			if (!entity_slug) {
				return res.status(400).json({
					success: false,
					error: "Could not create entity, name parameter is missing.",
				});
			}

			const createdEntity = await prisma.entities.create({
				data: {
					entity_id: generateGuid(),
					entity_name,
					entity_slug,
				},
			});

			res.status(201).json({
				success: true,
				data: createdEntity,
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

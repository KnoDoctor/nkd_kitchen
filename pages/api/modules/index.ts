import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../prisma/prismaClientInstance";

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getModules();
		case "POST":
			return createModule();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getModules() {
		try {
			const allModules = await prisma.modules.findMany({
				include: {
					modules_entities: {
						select: {
							entities: true,
						},
					},
				},
			});

			res.status(200).json({
				success: true,
				data: allModules,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createModule() {
		try {
			const { module_name, module_slug } = req.body;

			if (!module_name) {
				return res.status(400).json({
					success: false,
					error: "Could not create module, name parameter is missing.",
				});
			}
			if (!module_slug) {
				return res.status(400).json({
					success: false,
					error: "Could not create module, slug parameter is missing.",
				});
			}

			const createdModule = await prisma.modules.create({
				data: {
					module_id: generateGuid(),
					module_name,
					module_slug,
				},
			});

			res.status(201).json({
				success: true,
				data: createdModule,
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

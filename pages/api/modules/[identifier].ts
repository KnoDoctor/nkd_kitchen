import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let module_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(module_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getModule();
		case "PATCH":
			return updateModule();
		case "DELETE":
			return deleteModule();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getModule() {
		try {
			let module = await prisma.modules.findUnique({
				where: {
					module_id,
				},
			});

			if (module) {
				res.status(200).json({
					success: true,
					data: module,
				});
			} else {
				res.status(404).json({
					success: false,
					data: module,
				});
			}
		} catch (error) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function updateModule() {
		try {
			const { module_name, module_slug, module_image } = req.body;

			const patchedPost = await prisma.modules.update({
				where: {
					module_id,
				},
				data: {
					module_name,
					module_slug,
					module_image,
				},
			});

			res.status(200).json({
				success: true,
				data: patchedPost,
			});
		} catch (error) {
			console.log(error);

			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function deleteModule() {
		try {
			const deletedPost = await prisma.modules.delete({
				where: {
					module_id,
				},
			});

			res.status(200).json({
				success: true,
				data: null,
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

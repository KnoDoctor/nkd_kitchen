import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let project_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(project_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getProject();
		case "PATCH":
			return updateProject();
		case "DELETE":
			return deleteProject();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getProject() {
		try {
			let athlete;

			athlete = await prisma.projects.findUnique({
				where: {
					project_id,
				},
			});

			if (athlete) {
				res.status(200).json({
					success: true,
					data: athlete,
				});
			} else {
				res.status(404).json({
					success: false,
					data: athlete,
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

	async function updateProject() {
		try {
			const {
				project_name,
				project_description,
				project_data,
				project_hero_image,
				is_published,
			} = req.body;

			const patchedPost = await prisma.projects.update({
				where: {
					project_id,
				},
				data: {
					project_name,
					project_description,
					project_data,
					project_hero_image,
					is_published,
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

	async function deleteProject() {
		try {
			const deletedPost = await prisma.projects.delete({
				where: {
					project_id,
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

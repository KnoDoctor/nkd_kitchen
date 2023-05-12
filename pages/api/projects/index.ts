import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getProjects();
		case "POST":
			return createProject();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getProjects() {
		try {
			const allProjects = await prisma.projects.findMany();

			res.status(200).json({
				success: true,
				data: allProjects,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				success: false,
				error: error,
			});
		}
	}

	async function createProject() {
		try {
			const { project_name, project_description, email } = req.body;

			if (!project_name) {
				return res.status(400).json({
					success: false,
					error: "Could not create project, name parameter is missing.",
				});
			}
			if (!project_description) {
				return res.status(400).json({
					success: false,
					error: "Could not create project, description parameter is missing.",
				});
			}
			// if (!email) {
			// 	return res.status(400).json({
			// 		success: false,
			// 		error: "Could not create project, email parameter is missing.",
			// 	});
			// }

			const createdProject = await prisma.projects.create({
				data: {
					project_id: generateGuid(),
					project_name,
					project_description,
				},
			});

			res.status(201).json({
				success: true,
				data: createdProject,
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

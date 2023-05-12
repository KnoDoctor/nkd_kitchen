import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkIfGuid } from "../../../utils/uuids";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { identifier },
		method,
	} = req;

	let person_id = typeof identifier === "string" ? identifier : "";

	if (!checkIfGuid(person_id))
		return res.status(400).json({
			success: false,
			error: "Please supply a uuid.",
		});

	switch (method) {
		case "GET":
			return getPerson();
		case "PATCH":
			return updatePerson();
		case "DELETE":
			return deletePerson();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getPerson() {
		try {
			let person = await prisma.people.findUnique({
				where: {
					person_id,
				},
			});

			if (person) {
				res.status(200).json({
					success: true,
					data: person,
				});
			} else {
				res.status(404).json({
					success: false,
					data: person,
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

	async function updatePerson() {
		try {
			const { first_name, last_name } = req.body;

			const patchedPost = await prisma.people.update({
				where: {
					person_id,
				},
				data: {
					first_name,
					last_name,
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

	async function deletePerson() {
		try {
			const deletedPost = await prisma.people.delete({
				where: {
					person_id,
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

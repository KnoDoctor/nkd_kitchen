import type { NextApiRequest, NextApiResponse } from "next";

const sendError = (res: NextApiResponse, statusCode: number, error: unknown) => {
	res.status(statusCode).json({ success: false, error: String(error) });
};

export default sendError;

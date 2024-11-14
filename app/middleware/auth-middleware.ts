import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { auth } from "@clerk/nextjs/server";

const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  try {
    // get the current user session from clerk
    const { userId, sessionId } = await auth();

    if (!userId || !sessionId) {
      res.status(401).json({ error: "Unauthorized" });
    }

    await next(req, res);
  } catch (error) {
    console.log("Middleware error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default authMiddleware;

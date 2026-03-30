import { Router } from "express";
import { getStreamToken } from "../controllers/chatControllers.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = Router();

router.get("/chat", protectRoute, getStreamToken);
export default router;
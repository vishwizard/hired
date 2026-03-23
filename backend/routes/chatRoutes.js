import { Router } from "express";
import { getStreamToken } from "../controllers/chatControllers";
import { protectRoute } from "../utils/protectRoute";

const router = Router();

router.get("/chat", protectRoute, getStreamToken);
export default router;
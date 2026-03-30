import express from 'express';
import { protectRoute } from '../utils/protectRoute.js';
import { createSession, getActiveSessions, getMyPastSessions, getSessionById, joinSession, endSession } from '../controllers/sessionControllers.js'
const router = express.Router();

router.post("/", protectRoute, createSession)
router.get("/active", protectRoute, getActiveSessions);
router.get("/passive", protectRoute, getMyPastSessions);
router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);
export default router;


import { Router } from "express";
import { sightseeingSearch, getAvailability } from "../controllers/sightseeingController.js";

const router = Router();

router.post("/api/sightseeing-search", sightseeingSearch);
router.post("/api/get-availability", getAvailability);

export default router;



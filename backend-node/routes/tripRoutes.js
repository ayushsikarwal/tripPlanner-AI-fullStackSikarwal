import { Router } from "express";
import { getTrip, updateTrip } from "../controllers/tripController.js";

const router = Router();

router.get("/api/trip/:userId", getTrip);
router.post("/api/trip/update", updateTrip);

export default router;



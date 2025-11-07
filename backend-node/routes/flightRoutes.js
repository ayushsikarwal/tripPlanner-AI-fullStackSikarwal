import { Router } from "express";
import { flightSearch } from "../controllers/flightController.js";

const router = Router();

router.post("/api/flight-search", flightSearch);

export default router;



import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routers
import tripRoutes from "./routes/tripRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import sightseeingRoutes from "./routes/sightseeingRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Health/misc
app.post("/checking", (req, res) => {
  const { user, invitedMembers, formData } = req.body;
  if (!user || !invitedMembers || !formData) {
    return res.status(400).send("Invalid body parameters");
  }
  res.send("POST request received");
});

// Routes (preserve original paths)
app.use(tripRoutes);
app.use(emailRoutes);
app.use(hotelRoutes);
app.use(flightRoutes);
app.use(sightseeingRoutes);

export default app;



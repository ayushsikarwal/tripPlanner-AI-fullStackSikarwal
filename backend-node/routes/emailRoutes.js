import { Router } from "express";
import { sendInvitationEmails } from "../controllers/emailController.js";

const router = Router();

router.post("/send-mail", sendInvitationEmails);

export default router;



import express from "express";
import { healthCheck } from "../../controllers/healthController";
import { check } from "../../midlewares/check";
const router = express.Router();

router.get("/health", check, healthCheck);

export default router;

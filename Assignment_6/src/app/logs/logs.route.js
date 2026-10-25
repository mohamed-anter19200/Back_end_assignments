import { Router } from "express";
import * as logsController from "./logs.controller.js";

const router = Router();

router.post("/capped", logsController.createCappedLogs);
router.post("/", logsController.insertLog);

export default router;
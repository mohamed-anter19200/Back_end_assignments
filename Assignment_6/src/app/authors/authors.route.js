import { Router } from "express";
import * as authorsController from "./authors.controller.js";

const router = Router();

router.post("/", authorsController.insertAuthor);

export default router;
import { Router } from "express";
import * as usersController from "./users.controller.js";

const router = Router();

router.post("/signup", usersController.signup);
router.get("/by-email", usersController.getUserByEmail);
router.put("/:id", usersController.createOrUpdateUser);
router.get("/:id", usersController.getUserById);
router.get("/:id", usersController.getUserById);

export default router;

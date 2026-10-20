
import { Router } from "express";
import * as commentsController from "./comments.controller.js";

const router = Router();

router.post(
    "/find-or-create",
    commentsController.findOrCreateComment
);

router.get(
    "/search",
    commentsController.searchComments
);

router.get(
    "/recent/:postId",
    commentsController.getRecentComments
);

router.patch(
    "/:commentId",
    commentsController.editComment
);

router.post(
    "/",
    commentsController.addComments
);

export default router;

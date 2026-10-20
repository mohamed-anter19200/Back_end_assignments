
import { Router } from "express";
import * as postController from "./posts.controller.js";
const router = Router();

router.post("/", postController.addPost);
router.get("/details", postController.getPostsDetails);
router.delete("/:postId",postController.removePost);
router.get("/comment-count", postController.getPostsCommentCount);
export default router;

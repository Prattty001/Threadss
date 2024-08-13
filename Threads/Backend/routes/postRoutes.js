import express from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from "../controller/postController.js";
import protectRoute from "../middleware/protectedRoutes.js";


const router=express.Router()
router.get("/feed", protectRoute, getFeedPosts);
router.post("/create",protectRoute ,createPost);
router.get("/:id",getPost)
router.delete("/:id",protectRoute ,deletePost);
router.post('/like/:id',protectRoute,likeUnlikePost)
router.post('/reply/:id',protectRoute,replyToPost)
export default router
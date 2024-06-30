const express = require("express");
const router = express.Router();

router.get("/posts", getPosts);
router.get("/getDetails/:id", getDetails);
router.get("/updatePosts/:id", updatePosts);
router.get("/deletePosts/:id", deletePosts);

module.exports = router;

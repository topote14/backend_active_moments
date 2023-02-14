const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require('multer');
const upload = multer({ dest: 'public/images' });

const createPostController = require("../controllers/createPost");
const getPostController = require("../controllers/getPost");
const likePostController = require("../controllers/likePost");
const getUserPostController = require("../controllers/getUserPost");

router.post("/create", verifyToken, upload.single('image'), createPostController);
router.post("/like", verifyToken, likePostController)
router.get("/get/:page", verifyToken, getPostController);
router.get("/get/user/:userId/:page", verifyToken, getUserPostController);

module.exports = router;
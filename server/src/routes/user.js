const router = require("express").Router();
const userCtrl = require("../controller/user_controller")
const multer = require("multer");

const { fileStorageEngine } = require("../middlewares/uploadImageEngine");
const upload = multer({ storage: fileStorageEngine });
// add user
router.post("/signup", upload.single("image"), userCtrl.signUp);
router.post("", userCtrl.login);
router.get("/getall", userCtrl.findAllUsers);
router.get("/getUserByID/:id",userCtrl.getUserById);

// router.post("", userCtrl.addUser);

module.exports = router;
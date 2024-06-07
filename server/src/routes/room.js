const router = require("express").Router();
const roomCtr = require("../controller/room_controller")
const multer = require("multer");

const { RoomStorageEngine } = require("../middlewares/uploadImageEngine");
const upload = multer({ storage: RoomStorageEngine });
//flutter consumes this only
/* router.get("/events", roomCtr.getAllRooms); */

//================ post method is for test purpose ================ 
//ADD Room
router.get("/getAllRooms", roomCtr.findAllRooms);
router.get("/getRoomEvents/:id", roomCtr.findEventsByRoomID);
router.post("",upload.single("image"), roomCtr.addRoom);
router.put("/editRoom/:id",roomCtr.editRoom);
router.delete("/delete/:id",roomCtr.deleteRoom);
module.exports = router;
const router = require("express").Router();
const eventCtrl = require("../controller/event_controller")


router.get("", eventCtrl.findAllEvents);
router.post("/setevent", eventCtrl.addEvent);
router.get("/:id", eventCtrl.findEventsByRoomID);
router.get("/getEventById/:id", eventCtrl.getEventById);
router.put("/updateEvent/:id",eventCtrl.updateEvent);
router.delete("/deleteEvent/:id",eventCtrl.deleteEvent);

module.exports = router;
const { RoomModel, EventModel } = require("../models");
const { ObjectId } = require("mongodb");

module.exports.findAllRooms = async (req, res) => {
    const rooms = await RoomModel.find({});
    return res.status(200).send({ message: "rooms retrieved successfully", data: rooms });
};
module.exports.addRoom = async (req, res) => {
    const new_room = await RoomModel.create(
        {
            label : req.body.label,  
            capacity : req.body.capacity,
            image : req.file.filename
        }
    );
    return res.status(200).send({ message: "Room added successfully", data: new_room });
};
module.exports.findEventsByRoomID = async (req, res) => {
    console.log("=============== FIND EVENTS BY ROOM ID ===============")
    const roomId = req.params.id;
    const events = await EventModel.find({ room: roomId }).populate('applicant');
    return res.status(200).send({ message: "Events retrieved successfully", data: events });
}

module.exports.editRoom = async function(req, res, next) {
    const ID = req.params.id;
    if (!ObjectId.isValid(ID)) {
        return res.status(404).json('room not found');
      }
    try {
        await RoomModel.findByIdAndUpdate(
        ID,
        {
          label: req.body.label,
          capacity: req.body.capacity,
          image: req.file.filename
          
        },
        { new: true } 
      );
      const updatedRoom = await RoomModel.findById(ID)
      res.status(200).send({ message: "Events updated successfully", data: updatedRoom });
    } catch (err) {
        console.log(err)
      return res.status(500).json(err);
    }
  };
  /** Delete Room */
  module.exports.deleteRoom = async function (req, res, next) {
    try {
      const room = await RoomModel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Events deleted successfully", data: room });
    } catch (error) {
      res.status(404).json(error);
    }
  };
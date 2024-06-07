const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let room ="room.jpg"
const RoomSchema = new Schema({
    label: { type: String, required: true },
    capacity: { type: Number, required: true },
    image: { type: String ,default: room},
});
module.exports = mongoose.model("room", RoomSchema);

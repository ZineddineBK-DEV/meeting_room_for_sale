const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomEventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = mongoose.model("event", RoomEventSchema);
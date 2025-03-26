const { mongoose } = require("mongoose");

module.exports = connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect('mongodb://localhost:27017/RoomBooking',)
        .then(() => console.log("DB connected..."))
        .catch((err) => console.log(err))
}
const { mongoose } = require("mongoose");

module.exports = connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect('mongodb+srv://pteCluster:pteCluster@pte.uecwzfo.mongodb.net/RoomBooking',)
        .then(() => console.log("DB connected..."))
        .catch((err) => console.log(err))
}
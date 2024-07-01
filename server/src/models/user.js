const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let avatar ="User.jpg"
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already in use"],
      },
    password: { type: String },
    image: { type: String ,default: avatar},
    role : {type : String , default: "User"}

})

module.exports = mongoose.model("user", userSchema);
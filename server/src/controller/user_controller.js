const { UserModel } = require("../models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");



module.exports.signUp = async function (req, res, next) {
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user
        if (req.file){
          user = await UserModel.create({ 
            name : req.body.name, 
            email : req.body.email,
            password : hashedPassword,
            image : req.file.filename
        });
        }else{
          user = await UserModel.create({ 
            name : req.body.name, 
            email : req.body.email,
            password : hashedPassword,
        });
        }
         
        res.status(200).json({
          message :"Account Created succefully",
          data : user
        });
        }
    catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  };
module.exports.login = async function (req, res, next) {
    try {
      let fetchedUser = await UserModel.findOne({ email: req.body.email })
      if (!fetchedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      var result = await bcrypt.compare(req.body.password, fetchedUser.password);
      if (!result) {
        return res.status(500).json({ message: "Please check your password!" });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          id: fetchedUser._id,
        },
        "secret_this_should_be_longer",
        { expiresIn: "2h" }
      );
      return res.status(200).json({
        token: token,
        name: fetchedUser.name,
        image: fetchedUser.image,
        id: fetchedUser._id,
        role : fetchedUser.role
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  };

  module.exports.findAllUsers = async (req, res) => {
    const users = await UserModel.find({});
    return res.status(200).send({ message: "users retrieved successfully", data: users });
};
module.exports.getUserById = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await UserModel.findById(ID)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.deleteUser = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await UserModel.findByIdAndDelete(ID)
    res.status(200).json({
      message: "User deleted successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// module.exports.addUser = async (req, res) => {
//     const new_user = await UserModel.create(req.body);
//     return res.status(200).send({ message: "user added successfully", data: new_user });
// };

/* const addRoom = async (req, res) => {
    const new_room = await RoomModel.create(req.body);
    return res.status(200).send({ message: "Room added successfully", data: new_room });
}; */

// module.exports = { addUser, findAllUsers }
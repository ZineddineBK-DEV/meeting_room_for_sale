const express = require("express");
const cors = require("cors");
const roomRoute = require("./src/routes/room");
const userRoute = require("./src/routes/user");
const eventRoute = require("./src/routes/event");
const db_init = require("./src/services/db.service");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
db_init();


app.use("/images", express.static(path.join("./src/static/images")));
app.use("/roomImages", express.static(path.join("./src/static/roomImages")));


app.use("/api/material/room/tablette", roomRoute);
app.use("/api/material/user", userRoute);
app.use("/api/material/event", eventRoute);


const PORT = 3000;

app.listen(PORT, () => console.log("Server listening on port " + PORT));
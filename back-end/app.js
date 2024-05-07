const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});
mongoose.connect(
  "mongodb+srv://joshforlenza:8oOo4Kg8YptJUNPa@cluster0.8vwdo6a.mongodb.net/ConcertsIO?retryWrites=true&w=majority"
);
const Guest = mongoose.model(
  "Guest",
  new Schema({ name: String, phone: String })
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/guest", async (req, res) => {
  try {
    console.log(req.body);
    fullName = req.body.fullName;
    console.log(fullName.split(" "));
    phone = req.body.phone;
    // validate data
    if (fullName.split(" ").length < 2) {
      res.status(400).json({
        message: "Name must be at least two words",
      });
    } else if (
      fullName.split(" ")[0].length === 0 ||
      fullName.split(" ")[1].length === 0
    ) {
      res.status(400).json({
        message: "Name must be at least two words",
      });
    } else if (!/^\d+$/.test(phone)) {
      res.status(400).json({
        message: "Phone number must be digits only",
      });
    } else if (phone.length < 10 || phone.length > 11) {
      res.status(400).json({
        message: "Phone number must be between 10 and 11 digits",
      });
    } else {
      // Create MongoDB doc and save to db
      const newGuest = new Guest({
        name: fullName,
        phone: phone,
      });
      newGuest.save();
      savedGuest = await Guest.findOne({ phone: phone });
      console.log(savedGuest);
      if (savedGuest) {
        // if save is successful, send response back with 201 status code
        res.status(201).json({
          status: "success",
          data: savedGuest,
        });
      } else {
        console.error(err);
        res.status(400).json({
          messae: "save to db failed",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: "failed",
    });
  }
});
module.exports = app;

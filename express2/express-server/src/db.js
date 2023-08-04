const mongoose = require("mongoose");
const uri =
  "mongodb+srv://vanshikasanan:vanshikaantino@cluster0.vryxbab.mongodb.net/?retryWrites=true&w=majority";
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;

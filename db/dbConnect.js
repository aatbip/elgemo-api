const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");
  } catch (e) {
    console.log(e);
  }
};

module.exports = dbConnect;

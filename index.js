require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Stand = require("./models/stand");
const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb+srv://ariel:ariel@cluster0.oqhvcr9.mongodb.net/";
mongoose.connect(uri, { dbName: "stand" });

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/stand", require("./routes/standRoutes"));

async function seed() {
  const id = new mongoose.Types.ObjectId("60a8f7c9e9b0b4001c8c8c8c");
  await Stand.updateOne(
    { _id: id },
    {
      _id: id,
      serial_number: "ST-14A",
      brand: "Ultimate Support",
      model: "JS-MS70",
      is_new: true,
      price: 25.5,
      final_price: 30.34,
      __v: 0
    },
    { upsert: true }
  );
}

mongoose.connection.once("open", async () => {
  await seed();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
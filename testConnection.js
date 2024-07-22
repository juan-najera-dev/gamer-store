import mongoose from "mongoose";
import colors from "colors";
import "dotenv/config";

const url = process.env.DB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const collectionSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    manufacturer: String,
    serie: String,
    microarchitecture: String,
    socket: String,
    coreCount: Number,
    performanceCoreClock: String,
    performanceCoreBoostClock: String,
    tdp: String,
    integratedGraphics: String,
    price: Number,
    img: String,
  },
  { collection: "cpus" }
);

const Cpu = new mongoose.model("Cpu", collectionSchema);

const cpu = new Cpu({
  id: "BORRAR",
  title: "AMD Ryzen 7 FALSE",
  manufacturer: "FALSE",
  serie: "AMD Ryzen 7",
  microarchitecture: "Zen 4",
  socket: "AM5",
  coreCount: 8,
  performanceCoreClock: "0 GHz",
  performanceCoreBoostClock: "0 GHz",
  tdp: "0 W",
  integratedGraphics: "Radeon",
  price: 7.99,
  img: "cpu_amd_ryzen_7",
});

cpu
  .save()
  .then((result) => {
    console.log(colors.green("Elemento guardado con exito"));
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(colors.red("ERROR ", error));
  });

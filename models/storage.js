import mongoose from "mongoose";
import colors from "colors";

const collectionName = "storage";

mongoose.set("strictQuery", false);

const url = process.env.DB_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log(
      colors.cyan(`Conexión Exitosa con la colección ${collectionName}`)
    );
  })
  .catch((error) => {
    console.log(
      colors.red(
        `ERROR conectando a la colección ${collectionName}: `,
        error.message
      )
    );
  });

const collectionSchema = new mongoose.Schema(
  {
    partNumber: String,
    title: String,
    manufacturer: String,
    capacity: String,
    formFactor: String,
    conection: String,
    price: Number,
    img: String,
  },
  { collection: "storage" }
);

collectionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Storage", collectionSchema);

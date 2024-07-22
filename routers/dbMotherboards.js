import { Router } from "express";
import "dotenv/config";
import colors from "colors";
import Motherboard from "../models/motherboard.js";

let db = Router();
const collectionName = "motherboards";

// Enrutamiento

// GET ALL

db.get("/", (request, response) => {
  Motherboard.find({}).then((modelo) => {
    response.json(modelo);
  });
});

// GET

db.get("/:id", (request, response) => {
  Motherboard.findById(request.params.id)
    .then((model) => {
      response.status(200).json(model);
    })
    .catch((error) => {
      response.status(404).send(error);
    });
});

// POST

db.post("/", (request, response) => {
  const body = request.body;
  if (
    (body.partNumber &&
      body.title &&
      body.manufacturer &&
      body.socket &&
      body.chipset &&
      body.memoryType &&
      body.memorySlots &&
      body.price &&
      body.img) === undefined
  ) {
    return response
      .status(400)
      .send({ Error: "Petición erronea, contenido incompleto" });
  }

  const model = new Motherboard({
    partNumber: body.partNumber,
    title: body.title,
    manufacturer: body.manufacturer,
    socket: body.socket,
    chipset: body.chipset,
    memoryType: body.memoryType,
    memorySlots: body.memorySlots,
    price: body.price,
    img: body.img,
  });

  model
    .save()
    .then((savedModel) => {
      response.json(savedModel);
    })
    .catch((error) => {
      response.status(503).send(error);
    });
});

// PUT

db.put("/:id", (request, response) => {
  const body = request.body;
  if (
    (body.partNumber &&
      body.title &&
      body.manufacturer &&
      body.socket &&
      body.chipset &&
      body.memoryType &&
      body.memorySlots &&
      body.price &&
      body.img) === undefined
  ) {
    return response
      .status(400)
      .send({ Error: "Petición erronea, contenido perdido" });
  }

  const updatedModel = {
    partNumber: body.partNumber,
    title: body.title,
    manufacturer: body.manufacturer,
    socket: body.socket,
    chipset: body.chipset,
    memoryType: body.memoryType,
    memorySlots: body.memorySlots,
    price: body.price,
    img: body.img,
  };

  Motherboard.findByIdAndUpdate(request.params.id, updatedModel)
    .then((model) => {
      response.status(200).json(updatedModel);
    })
    .catch((error) => {
      response.status(404).json(error);
    });
});

// DELETE

db.delete("/:id", (request, response) => {
  Motherboard.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result === null) {
        response
          .status(404)
          .send(`No se encontró el registro en la colección ${collectionName}`);
      } else {
        response.status(200).send("Operación de borrado exitosa");
      }
    })
    .catch((error) => {
      response
        .status(404)
        .send(
          `El id no concuerda con el patrón de la colleción ${collectionName}`
        );
    });
});

const requestLogger = (request, response, next) => {
  console.log(colors.rainbow("Access from API outrange"));
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log(colors.rainbow("---"));
  next();
};

db.use(requestLogger);

// unknownEndpoint se usa para el manejo de las rutas erroneas

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "url desconocida" });
};

db.use(unknownEndpoint);

let dbMotherboard = db;

export default dbMotherboard;

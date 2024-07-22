import express from "express";
import cors from "cors";
import dbCpu from "./routers/dbCpu.js";
import dbAccessory from "./routers/dbAccessory.js";
import dbGpu from "./routers/dbGpu.js";
import dbMotherboard from "./routers/dbMotherboards.js";
import dbRam from "./routers/dbRam.js";
import dbService from "./routers/dbService.js";
import dbSoftware from "./routers/dbSoftware.js";
import dbStorage from "./routers/dbStorage.js";

// Instancia del servidor de express

const server = express();
server.use(express.json());
server.use(express.static("dist"));
server.use(cors());

// APIs Routes

server.use("/api/accessory/", dbAccessory);
server.use("/api/cpu/", dbCpu);
server.use("/api/gpu/", dbGpu);
server.use("/api/motherboard/", dbMotherboard);
server.use("/api/ram/", dbRam);
server.use("/api/service/", dbService);
server.use("/api/software/", dbSoftware);
server.use("/api/storage/", dbStorage);

export default server;

import server from "./server.js";
import colors from "colors";

let port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(colors.green(`Servidor escuchando por el puerto ${port}`));
});

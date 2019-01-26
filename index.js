const express = require("express");
const routes = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

//  Recibe la app de express
routes(app);

const port = process.env.PORT || 3000;

//  Iniciar servidor
const server = app.listen(port, () => {
  console.log("app running on port", server.address().port);
});


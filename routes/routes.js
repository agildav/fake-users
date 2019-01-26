//  NPM Package para generar fake data
const faker = require("faker");
//  NPM Package para paginar sobre arrays
const paginate = require("paginate-array");

//  Recibiendo la app de express, manejo las rutas aqui
const appRouter = app => {
  const getGender = () => {
    return Math.floor(Math.random() * 2) == 0 ? "femenine" : "masculine";
  };

  //  Proposito de persistencia de datos, sin usar una BD como por ejemplo MongoDB
  let users = [];
  //  Home
  app.get("/", (req, res) => {
    res.status(200).send("Hacer uso de /users o /users/#");
  });

  //  Decidir cuantos usuarios crear
  app.post("/users/:num", (req, res) => {
    //  Default para 3
    const numUsers =
      parseInt(req.params.num) >= 0 ? parseInt(req.params.num) : 3;

    if (isFinite(numUsers)) {
      console.log(`Numero de usuarios a crear: ${numUsers}`);

      for (i = 0; i < numUsers; i++) {
        //  Agregar usuarios con fake data
        users.push({
          userID: faker.random.uuid(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          jobArea: faker.name.jobArea(),
          gender: getGender()
        });
      }
    }
    console.log("Usuario creado");
    console.log(`Numero de usuarios existentes: ${users.length}`);

    res.status(200).json(users);
  });

  //  Decidir cuantos y que usuarios mostrar
  app.get("/users", (req, res) => {
    //  Default para 3
    let numUsers = req.query.num;
    numUsers ? (numUsers = parseInt(numUsers)) : (numUsers = 3);

    //  Default para 1
    let numPage = req.query.page;
    numPage ? (numPage = parseInt(numPage)) : (numPage = 1);
    let gender = req.query.gender;
    gender ? (gender = gender.toLowerCase()) : (gender = getGender());

    let filteredUsers = [];
    let counter = 0;
    for (let index = 0; index < users.length; index++) {
      //  Mostrar usuarios acorde a la cantidad
      const element = users[index];
      //  Filtrar por genero
      if (element.gender === gender) {
        filteredUsers.push(element);
        counter++;
      }
      if (counter == numUsers) {
        break;
      }
    }

    console.log(`Numero de usuarios existentes: ${users.length}`);
    console.log(`Buscando usuarios con gender: ${gender}`);
    console.log(`Numero de usuarios a mostrar: ${filteredUsers.length}`);

    const data = paginate(filteredUsers, numPage, numUsers / 2);
    console.log(`Page: ${data.currentPage}/${data.totalPages}`);
    res.status(200).json(data.data);
  });
};

module.exports = appRouter;


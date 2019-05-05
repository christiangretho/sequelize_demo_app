const express = require("express");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _USERS = require("./users.json");

const app = express();
const port = 8001;

const connection = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "db.sqlite",
  operatorsAliases: false,
  define: {
    freezeTableName: true
  }
});

const User = connection.define("User", {
  // attribute qualifiers
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  }
});

app.get("/findall", (req, res) => {
  User.findAll({
      where: {
          name: {
              [Op.like]: 'N%'
          }
      }
  })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    });
});

// app.post('/post', (req, res) => {
//     const newUser = req.body.user;
//     User.create({
//         name: newUser.name,
//         email: newUser.email
//     })
//     User.create({
//         name: 'christian',
//         bio: 'first bio entry'
//     })
//     .then(user => {
//         res.json(user);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(404).send(error);
//     })
// })

connection
  .sync({
    // logging: console.log
  })
  // .then(()=>{
  //     User.bulkCreate(_USERS)
  //     .then(users => {
  //         console.log('Success adding users');
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     })
  // })
  .then(() => {
    console.log("Connection to database established successfully");
  })
  .catch(err => {
    console.log("Unable to connect to the database: ", err);
  });

app.listen(port, () => {
  console.log("Running server on port " + port);
});

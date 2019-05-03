const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8001;

const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorsAliases: false,
    define: {
        freezeTableName: true
    }
});

const User = connection.define('User', {
    // attribute qualifiers
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    full_name: Sequelize.STRING,
    bio: Sequelize.TEXT
    }, {
        hooks: {
            beforeValidate: () => {
                console.log('before validate');
            },
            afterValidate: () => {
                console.log('after validate');
            },
            beforeCreate: (user) => {
                user.full_name = `${user.first} ${user.last}`
            },
            afterCreate: () => {
                console.log('after create');
            }
        } 
    });


    // app.get('/', (req, res) => {
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
        logging: console.log,
        force: true
    })
    .then(()=>{
        User.create({
            first: 'christian',
            last: 'bartley',
            bio: 'first bio entry'
        })
    })
    .then(()=> {
        console.log('Connection to database established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

app.listen(port, () => {
    console.log('Running server on port ' + port);
});


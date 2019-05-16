
  app.get("/findall", (req, res) => {
    User.findAll()
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      });
  });
  
  app.get("/findbyid", (req, res) => {
    User.findByPk('55')
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      });
  });

  app.put("/update", (req, res) => {
    User.update({
        name: 'Michael keaton',
        password: 'password'
    }, {where: {id: 55}})
      .then(rows => {
        res.json(rows);
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      });
  });

  app.delete("/remove", (req, res) => {
    User.destroy({
        where: {id: 50}
    })
      .then(user => {
        res.send('User successfully deleted');
      })
      .catch(error => {
        console.log(error);
        res.status(404).send(error);
      });
  });
  
  app.get("/findallwhere", (req, res) => {
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
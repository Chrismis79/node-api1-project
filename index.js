// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get('api/users', (req, res) => {
    res.send({api: "Up and running..."});
});

//get list of users
server.get("/api/users", (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log("Error on GET /api/users", error);
            res.status(500)
                .json({errorMessage: "Error getting list of users from database"})
        });
});

//get user by id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if(user) {
        res.status(200).json(user);
        }else {
            res.send(404).json({message: "The user with the specified ID does not exist."});
        }
    })
    .catch(error => {
        console.log("error on GET /api/users/:id", error);
        res
            .status(500)
            .json({error: "The user information could not be retrieved."});
    });
});

//add user
server.post('/api/users', (req, res) => {
    const userData = req.body;
    if(!userData.name || !userData.bio){
        res.status(400).json({errorMessage: "Name and bio are both required fields", error})
    }else {
        db.insert(userData)
        .then(user => {
            res.status(201).json(userData);
        })
        .catch(error => {
            console.log('Error on POST /api/users', error);
            res.status(500)
                .json({errorMessage: "Error creating new user"});
        });
    }
});

//delete user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(removed => {
            if(removed) {
                res.status(200).json({message: "User removed successfully", removed});
            }else {
                res.send(404).json({message: "User not found"});
            }
        })
        .catch(error => {
            console.log("Error on DELETE /api/users/:id", error);
            res.status(500).json({error: "The user could not be removed"})
        });
});

//edit user
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    if(!userData.name || !userData.bio){
        res.status(400).json({errormessage: "Name and bio are both required fields", error})
    }else {
        db.update(id, userData)
            .then(user => {
                if(user){
                    db.findById(id)
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(error => {
                        console.log("Error on PUT /api/users", error);
                        res.status(404)
                        .json({message: "The user with the specified ID does not exist."});
                    })
                }else {
                    res.status(404).json({errorMessage: "The user with that specified id is not found"});
                }
              })
              .catch(error => {
                  console.log("Error on PUT api/users", error);
                  res.status(500).json({message: "The user could not be found"})
              });
    }
});


const port = 5000;
server.listen(port, () => 
    console.log(`\n ** API running on ${port} **\n`)
);

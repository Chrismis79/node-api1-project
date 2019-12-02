// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get('api/users', (req, res) => {
    res.send({api: "Up and running..."});
});

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


const port = 5000;
server.listen(port, () => 
    console.log(`\n ** API running on ${port} **\n`)
);

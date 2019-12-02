// implement your API here
const express = require("express");
const server = express();


server.get('api/users', (req, res) => {
    res.send({api: "Up and running..."});
});



const port = 5000;
server.listen(port, () => 
    console.log(`\n ** API running on ${port} **\n`)
);

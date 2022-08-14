const { json } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

let clientsJSON = require("./clients.json");

app.get("/test", function(req, res) {
    res.json({
        success: true,
    })
})

app.get("/clients", function(req, res) {
    res.json(clientsJSON);
});
app.get("/clients/:id", function(req, res) {
    const {id} = req.params;

    const clientResult = clientsJSON.find((client) => client.id == id);

    if(!clientResult){
        return res.status(204).json({
            success: false,
            error: "client not found",
        });
    }

    res.json(clientResult);

});
app.post("/clients", function(req, res) {
    const { name } = req.body;
    const newClient = {
        name: name, 
        id: clientsJSON.length + 1,
    };

    clientsJSON.push(newClient);
    
    res.json(newClient);
});
app.put("/clients/:id", function(req, res) {
    const { id } = req.params;
    const clientFound = clientsJSON.find((client) => client.id == id);

    if(!clienFound){
        return res.status(204).json({
            success: false,
            error: "client not found",
        });
    }

    const { name } = req.body;

    clientFound.name = name;

    clientsJSON = clientsJSON.filter((client) => client.id != id);

    clientsJSON.push(clientFound);

    req.json(clientFound);
});
app.delete("/clients/:id", function(req, res) {});


app.listen(3001, function() {
    console.log("Our server is running!");
});
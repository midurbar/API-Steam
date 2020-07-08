const express = require('express')
const app = express()
const {Steam} = require('./models')
app.use(express.json())

app.get("/", function (req, res) {
    res.json("Esta es la prueba de que la Api Steam funciona");
})
//Corregido poblaciones


//Busca todo
app.get("/steam", function (req, res) {
    Steam.findAll()
    .then(steam => res.json(steam))
    .catch(err => res.json(err))
})

//Busca uno por codigo
app.get("/steam/:codigo", function (req, res) {
    const {codigo} = req.params;
    Steam.findOne({where: {codigo}})
    .then(steam => { 
        if (steam) { 
            res.json(steam)
        }else {
            res.status(404).json("Juego no registrado")
        }
    })
    .catch(err => res.json(err))
})

//Introduce un juego en la BD
app.post("/steam", function (req, res) {
    const steam = req.body;
    Steam.create(steam)
    .then(steam => res.status(201).json(steam))
    .catch(err => res.status(400).json(err))
})

//Edita un juego en la Bd a traves de su codigo
app.put("/steam/:codigo", function (req, res) {
    const {codigo} = req.params;
    const nuevosDatos = req.body;
    Steam.findOne({where: {codigo}})
    .then(steam => {
        if (steam) {
            //copia los campos de nuevosDatos al objeto original
            Object.assign(steam, nuevosDatos);

            //Guarda los datos actualizados y genera respuesta
            steam.save()
            .then(steam => res.json(steam))
        }else {
            res.status(404).json("Juego no registrado")
        }
    })
    .catch(err => res.status(400).json(err))
})

//Elimina un juego de la BD a trsaves de su codigo
app.delete("/steam/:codigo", function (req, res) {
    const {codigo} = req.params;
    Steam.findOne({where: {codigo}})
    .then(steam => {
        if (steam) {
            steam.destroy()
            .then(() => res.status(204))
        }else {
            res.status(404).json("Juego no registrado")
        }
    })
    .catch(err => res.status(400).json(err))
})

app.listen(3000)
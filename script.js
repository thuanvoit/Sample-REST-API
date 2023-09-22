const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const port = process.env.PORT || 8080
app.listen(port, () => console.log('Listening on port ', port))

let electronic_items = csv2json("electronic_items.csv")

app.get('/api/products', (req, res) => {
    res.send(electronic_items)
})

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id
    let foundItem = findItem(id)
    if (foundItem) {
        res.send(foundItem)
    } else {
        res.status(404).send({
            message: 'Cannot find item with id ' + id
        })
    }
})

app.post('/api/products', (req, res) => {
    const { error } = validateItem(req.body)
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        })
        return
    }
    if (req.body.quantity < 0) {
        return res.status(400).send({
            message: 'Quantity must be greater or equal to 0.'
         })
    }
    var newItem = {
        "id": electronic_items.length + 1,
        "name": req.body.name,
        "quantity": req.body.quantity
    }
    electronic_items.push(newItem)
    res.send(newItem)
})

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id
    const { error } = validateItem(req.body)
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        })
        return
    }
    
    let foundItem = findItem(id)

    if (!foundItem) {
        res.status(404).send({
            message: 'Cannot find item with id ' + id
        })
    }
    
    if ((req.body.name).toLowerCase() != "na") {
        foundItem.name = req.body.name
    }
    if (req.body.quantity >= 0) {
        foundItem.quantity = req.body.quantity
    }
    
    res.send(foundItem)
})

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let deleteItem = null

    for (let i = 0; i < electronic_items.length; i++) {
        if (electronic_items[i].id === id) {
            deleteItem = electronic_items.splice(i, 1)
            break
        }
    }
    if (deleteItem) {
        res.send(deleteItem)
    } else {
        res.status(404).send({
            message: 'Cannot find item with id ' + id
        })
    }
})

function validateItem(item) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(), //item name
        quantity: Joi.number().integer().min(-1) // not neccessary
    })
    return schema.validate(item)
}

function findItem(id) {
    id = parseInt(id)
    let foundItem = null
    for (let i = 0; i < electronic_items.length; i++) {
        if (electronic_items[i].id === id) {
            foundItem = electronic_items[i]
            break;
        }
    }
    return foundItem
}

function csv2json(filepath) {
    const fs = require('fs')
    json_data = []
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(error)
            return
        }
        data = data.split(/\r?\n/)
        for (let i = 1; i < data.length; i++) {
            const item = data[i].split(",")
            json_data.push({
                "id": parseInt(item[0]),
                "name": item[1],
                "quantity": parseInt(item[2])
            })
        }
      });
      return json_data
}
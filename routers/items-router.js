const router = require('express').Router();

const Items = require('./items-model');

router.get('/', (req, res) => {
    Items.find()
         .then(items => {
             res.status(200).json({ data: items })
         })
         .catch(error => {
             console.log({ error })
             res.status(500).json({ message: error.message })
         })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Items.findById(id)
         .then(item => {
             if(item) {
                 res.status(200).json({ data: item })
             }else {
                 res.status(404).json({ message: "Item with specified ID not found" })
             }
         })
         .catch(error => {
             console.log({ error })
             res.status(500).json({ message: error.message })
         })
})

router.post('/', validateItem, (req, res) => {
    const { name, durability, enhancement } = req.body;

    Items.add({ name, durability, enhancement })
         .then(newItem => {
             if(newItem) {
                 res.status(201).json({ data: newItem })
             }else {
                 res.status(404).json({ message: "Newly created item not found" })
             }
         })
         .catch(error => {
             console.log({ error })
             res.status(500).json({ message: error.message })
         })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Items.remove(id)
         .then(count => {
             if(count) {
                res.status(204).end()
             }else {
                 res.status(404).json({ message: "Item with specified ID not found" })
             }
         })
         .catch(error => {
             console.log({ error })
             res.status(500).json({ message: error.message })
         })
})

//Custom MiddleWare
function validateItem(req, res, next) {
    const { name, durability, enhancement } = req.body;

    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No Item Data" })
    }else if(!name || !durability || !enhancement) {
        res.status(400).json({ message: "Name, durability, and enhancement are all required fields" })
    }else {
        next()
    }
}

module.exports = router;
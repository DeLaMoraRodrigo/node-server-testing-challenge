const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    remove
}

function find() {
    return db('items')
}

function findById(id) {
    return db('items')
        .where({ id: id })
        .first()
}

function add(item) {
    return db('items')
        .insert(item, 'id')
        .then(([id]) => {
            return findById(id)
        })
}

function remove(id) {
    return db('items')
        .where({ id: id})
        .del()
}
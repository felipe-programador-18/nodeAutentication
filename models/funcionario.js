const mongoose = require('mongoose')

const Employeer = new mongoose.Schema({
    title: String,
    descricao: String,
    numero: Number,
    categoria: String
})

const Funcionario = mongoose.model('Funcionario', Employeer)
module.exports = Funcionario
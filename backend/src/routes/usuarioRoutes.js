/********************************************************************
 *  Objetivo: Arquivo responsável pelas rotas de usuários
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************/

const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controller/usuario/controllerUsuario.js')

router.get('/', async (req, res) => {
    let usuario = await controllerUsuario.listarUsuarios()
    res.status(usuario.status_code).json(usuario)
})

module.exports = router
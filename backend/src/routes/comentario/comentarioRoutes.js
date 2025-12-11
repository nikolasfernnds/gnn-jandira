/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Notícias (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 09/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

/*******************************************************************************************************************
 * Objetivo: Rotas para CRUD de Comentários
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 12/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()

const controllerComentario = require('../../controller/comentario/controllerComentario.js')

router.get('/', async (req, res) => {
    let result = await controllerComentario.listarComentarios()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req, res) => {
    let result = await controllerComentario.buscarComentarioId(req.params.id)
    res.status(result.status_code).json(result)
})

router.post('/', async (req, res) => {
    let result = await controllerComentario.inserirComentario(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.put('/:id', async (req, res) => {
    let result = await controllerComentario.atualizarComentario(req.body, req.params.id, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req, res) => {
    let result = await controllerComentario.excluirComentario(req.params.id)
    res.status(result.status_code).json(result)
})

module.exports = router

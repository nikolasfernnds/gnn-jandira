/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de comentários e notícias (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 12/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()

const controllerComentarioNoticia = require('../../controller/comentario_noticia/controllerComentarioNoticia.js')

router.get('/', async (req, res) => {
    let result = await controllerComentarioNoticia.listarComentariosNoticia()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req, res) => {
    let result = await controllerComentarioNoticia.buscarComentarioNoticiaId(req.params.id)
    res.status(result.status_code).json(result)
})

router.post('/', async (req, res) => {
    let result = await controllerComentarioNoticia.inserirComentarioNoticia(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.put('/:id', async (req, res) => {
    let result = await controllerComentarioNoticia.atualizarComentarioNoticia(req.body, req.params.id, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req, res) => {
    let result = await controllerComentarioNoticia.excluirComentarioNoticia(req.params.id)
    res.status(result.status_code).json(result)
})

module.exports = router

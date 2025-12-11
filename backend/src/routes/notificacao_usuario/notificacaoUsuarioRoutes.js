/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Notícias (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 11/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/


const express = require('express')
const router = express.Router()

const controllerNotificacaoUsuario = require('../../controller/notificacao_usuario/controllerNotificacaoUsuario.js')

router.get('/usuario/:id', async (req, res) => {
    let result = await controllerNotificacaoUsuario.listarNotificacoesUsuario(req.params.id)
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req, res) => {
    let result = await controllerNotificacaoUsuario.buscarNotificacaoUsuarioId(req.params.id)
    res.status(result.status_code).json(result)
})

router.post('/', async (req, res) => {
    let result = await controllerNotificacaoUsuario.inserirNotificacaoUsuario(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

router.patch('/:id/lida', async (req, res) => {
    let result = await controllerNotificacaoUsuario.marcarComoLida(req.params.id)
    res.status(result.status_code).json(result)
})

module.exports = router

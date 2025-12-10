/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Notícias (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 09/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')

const controllerNotificacao = require('../../controller/notificacao/controllerNotificacao.js')

router.get('/', async(req, res) => {
    let notificacao = await controllerNotificacao.listarNotificacoes()
    res.status(notificacao.status_code).json(notificacao)
})

router.get('/:id', async(req, res) => {
    let notificacao = await controllerNotificacao.buscarNotificacoesId(req.params.id)
    res.status(notificacao.status_code).json(notificacao)
})

router.post('/', async(req, res) => {
    let notificacao = await controllerNotificacao.inserirNotificacao(req.body, req.headers['content-type'])
    res.status(notificacao.status_code).json(notificacao)
})

router.put('/:id', async(req, res) => {
    let notificacao = await controllerNotificacao.atualizarNotificacao(req.body, req.params.id, req.headers['content-type'])
    res.status(notificacao.status_code).json(notificacao)
})

router.delete('/:id', async(req, res) => {
    let notificacao = await controllerNotificacao.excluirNotificacao(req.params.id)
    res.status(notificacao.status_code).json(notificacao)
})

module.exports = router
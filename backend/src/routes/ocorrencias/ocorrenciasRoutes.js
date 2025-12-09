/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Ocorrências (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 04/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')

const controllerOcorrencia = require('../../controller/ocorrencia/controllerOcorrencia.js')

router.get('/', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.listarTodasOcorrencias()
    res.status(ocorrencia.status_code).json(ocorrencia)
})

router.get('/:id', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.buscarOcorrenciaId(req.params.id)
    res.status(ocorrencia.status_code).json(ocorrencia)
})

router.get('/tipo/:id', async(req, res) => {
    let ocorrenciaTipo = await controllerOcorrencia.buscarOcorrenciaCategoria(req.params.id)
    res.status(ocorrenciaTipo.status_code).json(ocorrenciaTipo)
})

router.get('/usuario/:id', async(req, res) => {
    let ocorrenciaUsuario = await controllerOcorrencia.buscarOcorrenciaUsuario(req.params.id)
    res.status(ocorrenciaUsuario.status_code).json(ocorrenciaUsuario)
})

router.post('/', async(req, res) => {
    let novaOcorrencia = await controllerOcorrencia.criarNovaOcorrencia(req.body, req.headers['content-type'])
    res.status(novaOcorrencia.status_code).json(novaOcorrencia)
})

router.delete('/:id', async(req, res) => {
    let ocorrencia = await controllerOcorrencia.excluirOcorrencia(req.params.id)
    res.status(ocorrencia.status_code).json(ocorrencia)
})

module.exports = router
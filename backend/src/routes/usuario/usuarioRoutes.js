/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Usuários (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 03/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')

// Importa o controller de Usuários
const controllerUsuario = require('../../controller/usuario/controllerUsuario.js')

// --- ROTAS DE AUTENTICAÇÃO ---

// Autenticação de Usuário (Login)
router.post('/login', cors(), async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let result = await controllerUsuario.autenticarUsuario(contentType, dadosBody)
    response.status(result.status_code).json(result)
})

// --- ROTAS DE CRUD ---

// Retorna a lista de todos os usuários
router.get('/', cors(), async function (request, response) {
    let usuarios = await controllerUsuario.listarUsuarios()
    response.status(usuarios.status_code).json(usuarios)
})

// Retorna um usuário pelo ID
router.get('/perfil/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let usuario = await controllerUsuario.buscarUsuario(idUsuario)
    response.status(usuario.status_code).json(usuario)
})

// Adiciona um novo usuário (Cadastro)
router.post('/cadastro', cors(), async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let novoUsuario = await controllerUsuario.cadastrarUsuario(contentType, dadosBody)
    response.status(novoUsuario.status_code).json(novoUsuario)
})

// Atualiza um usuário existente
router.put('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let usuarioAtualizado = await controllerUsuario.atualizarUsuario(idUsuario, contentType, dadosBody)
    response.status(usuarioAtualizado.status_code).json(usuarioAtualizado)
})

// Exclui (ou desativa) um usuário
router.delete('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id
    let usuarioExcluido = await controllerUsuario.excluirUsuario(idUsuario)
    response.status(usuarioExcluido.status_code).json(usuarioExcluido)
})

module.exports = router
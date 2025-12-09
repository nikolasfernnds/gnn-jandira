/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Notícias (GNN Jandira)
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 09/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')

// Importa o Controller de Notícia
const controllerNoticia = require('../../controller/noticia/controllerNoticia.js')

router.use(cors())

// GET /v1/gnn/noticias/categoria/:id (Buscar notícias por ID de Categoria)
router.get('/categoria/:id', async(req, res) => {
    let noticiasCategoria = await controllerNoticia.buscarNoticiaCategoria(req.params.id)
    res.status(noticiasCategoria.status_code).json(noticiasCategoria)
})

// GET /v1/gnn/noticias/autor/:id (Buscar notícias por ID de Autor/Usuário)
router.get('/autor/:id', async(req, res) => {
    let noticiasAutor = await controllerNoticia.buscarNoticiaAutor(req.params.id)
    res.status(noticiasAutor.status_code).json(noticiasAutor)
})


// POST /v1/gnn/noticias (Criar nova notícia)
router.post('/', async(req, res) => {
    // Nota: Removi o id_autor_token daqui pois deve ser injetado via middleware de autenticação
    let novaNoticia = await controllerNoticia.criarNovaNoticia(req.body, req.headers['content-type'])
    res.status(novaNoticia.status_code).json(novaNoticia)
})

// GET /v1/gnn/noticias (Listar todas as notícias)
router.get('/', async(req, res) => {
    // ⚠️ Nome da função no Controller: listarTodasNoticias
    let noticias = await controllerNoticia.listarTodasNoticias() 
    res.status(noticias.status_code).json(noticias)
})

// GET /v1/gnn/noticias/:id (Buscar notícia por ID)
router.get('/:id', async(req, res) => {
    let noticia = await controllerNoticia.buscarNoticiaId(req.params.id)
    res.status(noticia.status_code).json(noticia)
})

// PUT /v1/gnn/noticias/:id (Atualizar notícia)
router.put('/:id', async (req, res) => {
    let dados = req.body;
    let id = req.params.id;
    let contentType = req.headers['content-type'];

    let noticiaAtualizada = await controllerNoticia.atualizarNoticia(dados, id, contentType);
    res.status(noticiaAtualizada.status_code).json(noticiaAtualizada);
});


// DELETE /v1/gnn/noticias/:id (Excluir notícia)
router.delete('/:id', async(req, res) => {
    let noticia = await controllerNoticia.excluirNoticia(req.params.id)
    res.status(noticia.status_code).json(noticia)
})


module.exports = router
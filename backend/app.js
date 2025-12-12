/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API do GNN Jandira
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 03/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    // Define os verbos HTTP permitidos
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    
    response.header('Access-Control-Allow-Headers', 'Content-Type') // Adicione isso

    // Carrega as configurações no CORS da API
    app.use(cors())
    
    next() 
})

app.use(bodyParser.json())

const usuarioRoutes = require('./src/routes/usuario/usuarioRoutes.js')
const enderecoUsuarioRoutes = require('./src/routes/enderecos/enderecoUsuarioRoutes.js')
const ocorrenciaRoutes = require('./src/routes/ocorrencias/ocorrenciasRoutes.js')
const noticiaRoutes = require('./src/routes/noticia/noticiaRoutes.js')
const comentarioRoutes = require('./src/routes/comentario/comentarioRoutes.js')
const comentarioNoticiaRoutes = require('./src/routes/comentario_noticia/comentario_noticiaRoutes.js')
const notificacaoRoutes = require('./src/routes/notificacao/notificacaoRoutes.js')
const notificacaoUsuarioRoutes = require('./src/routes/notificacao_usuario/notificacaoUsuarioRoutes.js')

app.use('/v1/gnn/usuarios', usuarioRoutes)
app.use('/v1/gnn/endereco/usuario', enderecoUsuarioRoutes)
app.use('/v1/gnn/ocorrencia', ocorrenciaRoutes)
app.use('/v1/gnn/noticia', noticiaRoutes)
app.use('/v1/gnn/notificacao', notificacaoRoutes)
app.use('/v1/gnn/notificacao-usuario', notificacaoUsuarioRoutes)
app.use('/v1/gnn/comentario', comentarioRoutes)
app.use('/v1/gnn/comentario-noticia', comentarioNoticiaRoutes)

app.listen(PORT, function () {
    console.log('API GNN Jandira aguardando requisições na porta ' + PORT)
})

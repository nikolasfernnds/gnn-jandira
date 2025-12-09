/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API do GNN Jandira
 * Autor: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Data: 03/12/2025
 * Versão: 1.0
 ******************************************************************************************************************/

// Importando dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Retorna a porta do servidor atual ou coloca uma porta local
const PORT = process.env.PORT || 8080

// Criando uma Instancia de uma classe do express
const app = express()

// Configuração de permissões e CORS
app.use((request, response, next) => {
    // Permite que qualquer origem acesse a API
    response.header('Access-Control-Allow-Origin', '*')
    // Define os verbos HTTP permitidos
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
    response.header('Access-Control-Allow-Headers', 'Content-Type') // Adicione isso

    // Carrega as configurações no CORS da API
    app.use(cors())
    
    next() // Próximo, carregar os proximos endPoints
})

// Configura o body-parser para receber JSON
app.use(bodyParser.json())

// --- Importação dos Arquivos de Rota ---
const usuarioRoutes = require('./src/routes/usuario/usuarioRoutes.js')
const enderecoUsuarioRoutes = require('./src/routes/enderecos/enderecoUsuarioRoutes.js')
const ocorrenciaRoutes = require('./src/routes/ocorrencias/ocorrenciasRoutes.js')
const notificacaoRoutes = require('./src/routes/notificacao/notificacaoRoutes.js')

// --- Definição dos Endpoints com prefixo ---
// Define que todos os endpoints de usuários terão o prefixo '/v1/gnn'
app.use('/v1/gnn/usuarios', usuarioRoutes)
app.use('/v1/gnn/endereco/usuario', enderecoUsuarioRoutes)
app.use('/v1/gnn/ocorrencia', ocorrenciaRoutes)
app.use('/v1/gnn/notificacao', notificacaoRoutes)

// --- Iniciar Servidor ---
app.listen(PORT, function () {
    console.log('API GNN Jandira aguardando requisições na porta ' + PORT)
})

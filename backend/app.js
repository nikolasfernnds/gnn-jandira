/*************************************************************************
 *  Objetivo: Arquivo responsável pelas requisições da API de Ocorrências
 *  Data: 02/12/2025
 *  Versão: 1.0
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const usuarioRoutes = require('./src/routes/usuarioRoutes.js')

const PORT = process.env.PORT || 8080
const app = express()
app.use(bodyParserJSON)

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') 

    app.use(cors())
    next()
})

app.listen(PORT, function(){
    console.log('API aguardando requisições!')
})

app.use('/v1/gnn/usuarios', usuarioRoutes)


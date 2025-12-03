/********************************************************************
 *  Objetivo: Arquivo responsável pelas mensagens de saída da API 
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************/

const { request } = require("express")

const dataAtual = new Date()

// MENSAGEM PADRÃO
const defaultHeader = {
                        development: 'Nicolas dos Santos, Nikolas Fernandes, Gabryel Fillipe',
                        api_description: 'API para registro de ocorrências',
                        status: Boolean,
                        status_code: Number,
                        request_date: dataAtual.toLocaleString(),
                        itens: {}
                    }

// MENSAGENS DE SUCESSO
const successRequest = {
                        status: true,
                        status_code: 200,
                        message: 'Requisição bem sucedida'
                    }

// MENSAGENS DE ERRO

const errorInternalServerController = {
                                        status: false,
                                        status_code: 500,
                                        message: 'Não foi possível processar a requisição por erros internos da Controller'
                                    }

const errorInternalServerModel = {
                                        status: false,
                                        status_code: 500,
                                        message: 'Não foi possível processar a requisição por erros internos da Model'
                                    }

const errorNotFound = {
                        status: false,
                        status_code: 404,
                        message: 'Não foi possível encontrar dados de retorno'
                    }

module.exports = {
    defaultHeader,
    errorInternalServerController,
    errorInternalServerModel,
    successRequest,
    errorNotFound
}
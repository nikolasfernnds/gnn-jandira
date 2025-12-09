/********************************************************************
 * Objetivo: Arquivo responsável pelas mensagens de saída da API 
 * Data: 03/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.1
 ********************************************************************/

const { request } = require("express")

const dataAtual = new Date()

// MENSAGEM PADRÃO
const DEFAULT_HEADER = {
    development: 'Nicolas dos Santos, Nikolas Fernandes, Gabryel Fillipe',
    api_description: 'API para registro de ocorrências',
    // 🎯 CORREÇÃO: Usar valores (false, 500) em vez dos tipos (Boolean, Number)
    status: false,
    status_code: 500,
    request_date: dataAtual.toLocaleString(),
    itens: {}
}

// MENSAGENS DE SUCESSO
const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida'
}

const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item criado com sucesso'
}

const SUCCESS_DELETED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item deletado com sucesso'
}

// MENSAGENS DE ERRO

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição por erros internos da Controller'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição por erros internos da Model'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foi possível encontrar dados de retorno'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: "O Content-Type da requisição não é suportado. Utilize application/json."
}

const ERROR_ACESS_DENIED = {
    status: false,
    status_code: 401,
    message: "Senha incorreta."
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: "Campos obrigatórios não foram preenchidos ou estão incorretos."
}

const ERROR_INVALID_ID = {
    status: false,
    status_code: 400,
    message: "O ID informado não é válido."
}

const ERROR_CONFLICT = {
    status: false,
    status_code: 409, 
    message: "Já existe um usuário cadastrado com este E-mail ou Nickname."
}

module.exports = {
    DEFAULT_HEADER,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_ACESS_DENIED,
    ERROR_REQUIRED_FIELDS,
    ERROR_INVALID_ID,
    ERROR_CONFLICT
}
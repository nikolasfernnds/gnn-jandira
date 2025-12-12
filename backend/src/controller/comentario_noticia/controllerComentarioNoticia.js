/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 * Data: 12/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ********************************************************************************/


const comentarioNoticiaDAO = require('../../model/DAO/comentario_noticia/comentario_noticia.js')
const defaultMessages = require('../modulo/configMessages.js')

const listarComentariosNoticia = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let result = await comentarioNoticiaDAO.getSelectAllComentarioNoticia()

        if (result && result.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.itens.comentarios = result
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_NOT_FOUND

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarComentarioNoticiaId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (isNaN(id) || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let result = await comentarioNoticiaDAO.getSelectComentarioNoticiaById(id)

        if (result && result.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.itens.comentarios = result
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_NOT_FOUND

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirComentarioNoticia = async function(dados, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() !== "APPLICATION/JSON")
            return MESSAGES.ERROR_CONTENT_TYPE

        if (!dados.id_noticia || !dados.id_usuario || !dados.id_comentario) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Campos obrigatórios: id_noticia, id_usuario, id_comentario}"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let result = await comentarioNoticiaDAO.setInsertComentarioNoticia(dados)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
            MESSAGES.DEFAULT_HEADER.itens = dados
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarComentarioNoticia = async function(dados, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() !== "APPLICATION/JSON")
            return MESSAGES.ERROR_CONTENT_TYPE

        if (!dados.id_noticia || !dados.id_usuario || !dados.id_comentario) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Campos obrigatórios: id_noticia, id_usuario, id_comentario}"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let validar = await buscarComentarioNoticiaId(id)
        if (validar.status_code !== 200)
            return validar

        dados.id_comentario_noticia = Number(id)

        let result = await comentarioNoticiaDAO.setUpdateComentarioNoticia(dados)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
            MESSAGES.DEFAULT_HEADER.itens = dados
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirComentarioNoticia = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (isNaN(id) || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let validar = await buscarComentarioNoticiaId(id)
        if (validar.status_code !== 200)
            return validar

        let result = await comentarioNoticiaDAO.setDeleteComentarioNoticia(id)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarComentariosNoticia,
    buscarComentarioNoticiaId,
    inserirComentarioNoticia,
    atualizarComentarioNoticia,
    excluirComentarioNoticia
}

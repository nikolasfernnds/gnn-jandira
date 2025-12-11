/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 * Data: 11/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ********************************************************************************/

/********************************************************************************
 *  Objetivo: Controller de Comentários
 *  Data: 12/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const comentarioDAO = require('../../model/DAO/comentario/comentario.js')
const defaultMessages = require('../modulo/configMessages.js')


const validarDadosComentario = async function (comentario) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if (!comentario.conteudo || comentario.conteudo.trim() === "") {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Conteúdo é obrigatório}"
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!comentario.data_comentario || comentario.data_comentario.length !== 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{data_comentario inválida (use YYYY-MM-DD)}"
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    return false
}

const listarComentarios = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let result = await comentarioDAO.getSelectAllComments()

        if (result.length > 0) {
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

const buscarComentarioId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (!isNaN(id) && id > 0) {
            let result = await comentarioDAO.getSelectCommentById(id)

            if (result && result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.comentario = result[0]
                return MESSAGES.DEFAULT_HEADER
            }

            return MESSAGES.ERROR_NOT_FOUND
        }

        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Id inválido}"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirComentario = async function (comentario, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() === "APPLICATION/JSON") {

            let validar = await validarDadosComentario(comentario)
            if (validar)
                return validar

            let result = await comentarioDAO.setInsertComment(comentario)

            if (result) {
                let lastId = await comentarioDAO.getSelectLastId()
                comentario.id = lastId

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                MESSAGES.DEFAULT_HEADER.itens = comentario

                return MESSAGES.DEFAULT_HEADER
            }

            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        return MESSAGES.ERROR_CONTENT_TYPE

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarComentario = async function (comentario, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() === "APPLICATION/JSON") {

            let validar = await validarDadosComentario(comentario)
            if (validar)
                return validar

            let validarId = await buscarComentarioId(id)
            if (validarId.status_code != 200)
                return validarId

            comentario.id = Number(id)

            let result = await comentarioDAO.setUpdateComment(comentario)

            if (result) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                MESSAGES.DEFAULT_HEADER.itens.comentario = comentario

                return MESSAGES.DEFAULT_HEADER
            }

            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        return MESSAGES.ERROR_CONTENT_TYPE

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirComentario = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (isNaN(id) || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Id inválido}"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let validar = await buscarComentarioId(id)
        if (validar.status_code != 200)
            return validar

        let result = await comentarioDAO.setDeleteComment(id)

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
    listarComentarios,
    buscarComentarioId,
    inserirComentario,
    atualizarComentario,
    excluirComentario,
    validarDadosComentario
}

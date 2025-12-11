/********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 11/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const notificacaoUsuarioDAO = require('../../model/DAO/notificacao_usuario/notificacaoUsuario.js')
const defaultMessages = require('../modulo/configMessages.js')

const listarNotificacoesUsuario = async function (idUsuario) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (!isNaN(idUsuario) && idUsuario > 0) {
            let result = await notificacaoUsuarioDAO.getNotificationsByUser(idUsuario)

            if (result && result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.notificacao = result
                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id de usuário inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarNotificacaoUsuarioId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (!isNaN(id) && id > 0) {
            let result = await notificacaoUsuarioDAO.getNotificationUserById(id)

            if (result && result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.notificacao = result[0]
                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirNotificacaoUsuario = async function (dados, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() === "APPLICATION/JSON") {

            if (!dados.id_notificacao || !dados.id_usuario) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Campos obrigatórios: id_notificacao, id_usuario}"
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }

            let result = await notificacaoUsuarioDAO.setInsertNotificationUser(dados)

            if (result) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                MESSAGES.DEFAULT_HEADER.itens = dados

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const marcarComoLida = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (isNaN(id) || id <= 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let validar = await buscarNotificacaoUsuarioId(id)

        if (validar.status_code != 200) {
            return validar
        }

        let result = await notificacaoUsuarioDAO.setMarkAsRead(id)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = "Notificação marcada como lida"
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarNotificacoesUsuario,
    buscarNotificacaoUsuarioId,
    inserirNotificacaoUsuario,
    marcarComoLida
}

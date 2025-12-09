 /********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 09/12/2025
 *  Autores: Nicolas dos Santos,, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const notificacaoDAO = require('../../model/DAO/notificacao/notificacao.js')
 const defaultMessages = require('../modulo/configMessages.js')

const listarNotificacoes = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let result = await notificacaoDAO.getSelectAllNotification()

        if(result){

            if(result.length > 0){
                defaultMessages.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                defaultMessages.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                defaultMessages.DEFAULT_HEADER.itens.notificacao =  result

                return defaultMessages.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarNotificacoesId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if(!isNaN(id) && id != "" && id != null && id > 0){
            let result = await notificacaoDAO.getSelectNotificationById(Number(id))

            if(result){
                if(result.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.notificacao = result

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_NOT_FOUND;
               } 
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosNotificacao = async function (notificacao) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    if (
        !notificacao.conteudo ||
        notificacao.conteudo == "" ||
        notificacao.conteudo == undefined ||
        notificacao.conteudo == null
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Conteúdo da notificação é obrigatório}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (notificacao.conteudo.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Conteúdo ultrapassa 255 caracteres}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    return false; 
}

module.exports = {
    listarNotificacoes,
    buscarNotificacoesId,
    validarDadosNotificacao
}
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

const inserirNotificacao = async function(notificacao, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosNotificacao(notificacao)

            if(!validar){
                let result = await notificacaoDAO.setInsertNotification(notificacao)

                if(result){
                    let lastId = await notificacaoDAO.getSelectLastId()

                    if(lastId){
                        notificacao.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.itens = notificacao

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarNotificacao = async function(notificacao, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
       if (String(contentType).toUpperCase() == "APPLICATION/JSON") {
             let validar = await validarDadosNotificacao(notificacao);
       
             if (!validar) {
               let validarId = await buscarNotificacoesId(id)
       
               if (validarId.status_code == 200) {

                 notificacao.id = Number(id)
                 let result = await notificacaoDAO.setUpdateNotification(notificacao)
       
                 if (result) {
                   MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                   MESSAGES.DEFAULT_HEADER.status_code =MESSAGES.SUCESS_CREATED_ITEM.status_code
                   MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                   MESSAGES.DEFAULT_HEADER.itens.notificacao = notificacao
    
                   return MESSAGES.DEFAULT_HEADER
                 } else {
                   return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                 }
               } else {
                 return validarId 
               }
             } else {
               return validar;
             }
           } else {
             return MESSAGES.ERROR_CONTENT_TYPE;
           }
    } catch (error) {
       return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirNotificacao = async function(id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

  try {
    if (!contentType || String(contentType).toUpperCase() == "APPLICATION/JSON") {
      
      if (!isNaN(id) && id > 0) {

        let validarId = await buscarNotificacoesId(id);

        if (validarId.status_code == 200) {
          let result = await notificacaoDAO.setDeleteNotification(id)

          if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message;

            return MESSAGES.DEFAULT_HEADER; 
          } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; 
          }
        } else {
          return validarId; 
        }

      } else {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Id incorreto]";
        return MESSAGES.ERROR_REQUIRED_FIELDS; 
      }

    } else {
      return MESSAGES.ERROR_CONTENT_TYPE; 
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; 
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
    inserirNotificacao,
    atualizarNotificacao,
    excluirNotificacao,
    validarDadosNotificacao
}
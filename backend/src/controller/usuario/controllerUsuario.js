/*****************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e Model
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 *****************************************************************************/

const usuarioDao = require('../../model/DAO/usuario.js')
const defaultMessages = require('../modulo/configMessages.js')

const listarUsuarios = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let resultUsers = await usuarioDao.getSelectAllUsers()

        if(resultUsers){
            if(resultUsers.length > 0){
                defaultMessages.defaultHeader.status = defaultMessages.successRequest.status
                defaultMessages.defaultHeader.status_code = defaultMessages.successRequest.status_code
                defaultMessages.defaultHeader.itens.usuarios = resultUsers

                return defaultMessages.defaultHeader
            } else {
                return MESSAGES.errorNotFound
            }
        } else {
            return MESSAGES.errorInternalServerModel            
        }
    } catch (error) {
        return MESSAGES.errorInternalServerController 
    }
}

module.exports = {
    listarUsuarios
}
/********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos,, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

const enderecoUsuarioDAO = require('../../model/DAO/enderecos/enderecoUsuario.js')
const defaultMessages = require('../../controller/modulo/configMessages.js')

const listarEnderecos = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        let resultAddressUsers = await enderecoUsuarioDAO.getSelectAllAddressUsers()

        if(resultAddressUsers){
            if(resultAddressUsers.length > 0){
                defaultMessages.defaultHeader.status = defaultMessages.successRequest.status
                defaultMessages.defaultHeader.status_code = defaultMessages.successRequest.status_code
                defaultMessages.defaultHeader.itens.enderecoUsuario = resultAddressUsers

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

const listarEnderecosPorId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != "" && id != null && id > 0){
            let resultAddresUsers = await enderecoUsuarioDAO.getSelectAllAddressUsersById(Number(id))

            if(resultAddresUsers){
                if(resultAddresUsers.length > 0){
                    MESSAGES.defaultHeader.status = defaultMessages.successRequest.status
                    MESSAGES.defaultHeader.status_code = defaultMessages.successRequest.status_code
                    MESSAGES.defaultHeader.itens.endereco = resultAddresUsers

                    return MESSAGES.defaultHeader
                } else {
                    return MESSAGES.errorNotFound
                }
            } else {
                return MESSAGES.errorInternalServerModel
            }
        } else {
            MESSAGES.errorRequiredFields.message += '[Id incorreto]'
            return MESSAGES.errorRequiredFields
        }
    } catch (error) {
        return MESSAGES.errorInternalServerController
    }
}

module.exports = {
    listarEnderecos,
    listarEnderecosPorId
}
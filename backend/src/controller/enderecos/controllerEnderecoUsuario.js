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
                defaultMessages.DEFAULT_HEADER.status = defaultMessages.SUCESS_REQUEST.status
                defaultMessages.DEFAULT_HEADER.status_code = defaultMessages.SUCESS_REQUEST.status_code
                defaultMessages.DEFAULT_HEADER.itens.enderecoUsuario = resultAddressUsers

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

const listarEnderecosPorId = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != "" && id != null && id > 0){
            let resultAddresUsers = await enderecoUsuarioDAO.getSelectAllAddressUsersById(Number(id))

            if(resultAddresUsers){
                if(resultAddresUsers.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = defaultMessages.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = defaultMessages.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.endereco = resultAddresUsers

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}



module.exports = {
    listarEnderecos,
    listarEnderecosPorId
}
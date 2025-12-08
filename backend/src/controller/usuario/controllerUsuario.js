/*****************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e Model
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 *****************************************************************************/

const usuarioDao = require('../../model/DAO/usuario/usuario.js')
const DEFAULT_MESSAGES = require('../modulo/configMessages.js')
const bcrypt = require('bcrypt')

const listarUsuarios = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultUsers = await usuarioDao.getSelectAllUsers()

        if (resultUsers) {
            if (resultUsers.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.usuarios = resultUsers

                return MESSAGES.DEFAULT_HEADER
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

const autenticarUsuario = async function (contentType, infoUsuario) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toLowerCase() !== 'application/json') {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        if (!infoUsuario.login || !infoUsuario.senha) {
            return {
                status: false,
                status_code: 400,
                MESSAGES: "Os campos login e senha são obrigatórios."
            }
        }

        let resultUser

        if (infoUsuario.login.includes('@')) {

            resultUser = await usuarioDao.getSelectUserByEmail(infoUsuario.login)
        }
        else {
            resultUser = await usuarioDao.getSelectUserByNickname(infoUsuario.login)
        }


        if (resultUser && resultUser.length > 0) {
            let usuario = resultUser[0]

            if (!usuario.senha_hash) {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

            let senhaValida = await bcrypt.compare(infoUsuario.senha, usuario.senha_hash)

            if (senhaValida) {
                delete usuario.senha_hash

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.MESSAGES = MESSAGES.SUCESS_REQUEST.MESSAGES
                MESSAGES.DEFAULT_HEADER.itens = usuario

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_ACESS_DENIED
            }
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }



    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const cadastrarUsuario = async function (contentType, usuario) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    try {

        if (String(contentType).toLowerCase() === 'application/json') {

            let validar = await validarDadosUsuario(usuario, false)

            if (validar === false) {

                let senhaHash = await bcrypt.hash(usuario.senha, 10)

                delete usuario.senha

                usuario.senha_hash = senhaHash

                let usuarioJson = JSON.stringify(usuario)



                let result = await usuarioDao.setInsertNewUser(usuarioJson)

                if (result) {
                    let lastId = await usuarioDao.getSelectLastID()

                    if (lastId) {

                        delete usuario.senhaHash
                        usuario.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.MESSAGES = MESSAGES.SUCESS_CREATED_ITEM.MESSAGES
                        MESSAGES.DEFAULT_HEADER.items = usuario
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

const atualizarUsuario = async function (id, contentType, usuario) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        if (id == '' || id == undefined || isNaN(id)) {
            return MESSAGES.ERROR_INVALID_ID
        }

        let validar = validarDadosUsuario(usuario, true)

        if (validar === false) {

            if (usuario.senha && usuario.senha !== '') {
                let senhaHash = await bcrypt.hash(usuario.senha, 10)
                usuario.senha_hash = senhaHash
                delete usuario.senha
                delete usuario.confirmar_senha
            }

            let usuarioJson = JSON.stringify(usuario)

            let result = await usuarioDao.setUpdateUser(id, usuarioJson)

            if (result) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.itens = usuario

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return validar
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirUsuario = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return MESSAGES.ERROR_INVALID_ID
        }

        let result = await usuarioDao.setDeleteUser(id)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.message = "Usuário excluído com sucesso."

            delete MESSAGES.DEFAULT_HEADER.itens

            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarUsuario = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return MESSAGES.ERROR_INVALID_ID
        }

        let dadosUsuario = await usuarioDao.getSelectUserById(id)

        if (dadosUsuario) {
            delete dadosUsuario.senha_hash

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.itens = dadosUsuario

            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}



const validarDadosUsuario = function (dadosBody, isUpdate = false) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (!dadosBody.nome_completo || dadosBody.nome_completo.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!dadosBody.nickname || dadosBody.nickname.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nickname inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!dadosBody.email || dadosBody.email.length > 150 || !dadosBody.email.includes('@')) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!isUpdate) {
        if (!dadosBody.senha || dadosBody.senha === '') {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Senha obrigatória]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    }

    return false
}
module.exports = {
    listarUsuarios,
    autenticarUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario,
    buscarUsuario
}
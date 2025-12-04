/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllUsers = async function () {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE status_conta = 1 ORDER BY id_usuario DESC`
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const getSelectLastID = async function () {
    try {
        let sql = `SELECT id_usuario FROM tbl_usuario ORDER BY id_usuario DESC LIMIT 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result && result.length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectUserByNickname = async function (nickname) {
    try {
        let sql = `CALL sp_buscar_usuario_nickname('${nickname}')`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result && result.length > 0) {

            let userRaw = result[0];

            let usuarioFormatado = {
                id_usuario: userRaw.f0,
                id_endereco_usuario: userRaw.f1,
                nome_completo: userRaw.f2,
                nickname: userRaw.f3,
                perfil: userRaw.f4,
                email: userRaw.f5,
                senha_hash: userRaw.f6,
                status_conta: userRaw.f7
            }

            return [usuarioFormatado]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectUserByEmail = async function (email) {
    try {
        let sql = `CALL sp_autenticar_usuario('${email}')`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result && result[0] && result[0].length > 0)
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertNewUser = async function (user) {
    try {
        let sql = `CALL sp_cadastrar_usuario('${user}')`
        
        await prisma.$executeRawUnsafe(sql)

        return true 

    } catch (error) {
        return false
    }
}

const setUpdateUser = async function (id, user) {
    try {
        let sql = `CALL sp_atualizar_perfil(${id}, '${user}')`
        
        let result = await prisma.$executeRawUnsafe(sql)

        return true

    } catch (error) {
        return false
    }
}

const setDeleteUser = async function (id) {
    try {
        let sql = `UPDATE tbl_usuario SET status_conta = 0 WHERE id_usuario = ${id}`
        
        let result = await prisma.$executeRawUnsafe(sql)

        if (result > 0)
            return true
        else
            return false 

    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllUsers,
    getSelectUserByNickname,
    getSelectUserByEmail,
    getSelectLastID,
    setInsertNewUser,
    setUpdateUser,
    setDeleteUser
}
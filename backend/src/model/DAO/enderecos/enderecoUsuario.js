/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllAddressUsers = async function () {
    try {
        let sql = `SELECT * FROM tbl_endereco_usuario ORDER BY id_endereco_usuario DESC`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else    
            return false
    } catch (error) {
        return false
    }
}

const getSelectAllAddressUsersById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_endereco_usuario WHERE id_endereco_usuario = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastId = async function() {
    try {
        let sql = `SELECT * FROM tbl_endereco_usuario ORDER BY id_enderco_usuario DESC LIMIT 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllAddressUsers,
    getSelectAllAddressUsersById,
    getSelectLastId
}
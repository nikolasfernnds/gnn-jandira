/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 03/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllUsers = async function() {
    try {
        let sql = `SELECT * FROM tbl_usuario ORDER BY id_usuario DESC`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllUsers
}
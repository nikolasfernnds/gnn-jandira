/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 09/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllNotification = async function() {
    try {
        let sql = `SELECT * FROM tbl_notificacao`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectNotificationById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_notificacao WHERE id_notificacao = ${id}`
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
        let sql = `SELECT * FROM tbl_notificacao ORDER BY id_notificacao DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_notificacao)
        else
            return false
    } catch (error) {
        return false
    }
}


const setInsertNotification = async function(notificacao) {
    try {
        let sql = `INSERT INTO tbl_notificacao (conteudo)
                    VALUES ("${notificacao.conteudo}")`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else    
            return false
    } catch (error) {
        return false
    }
}

const setUpdateNotification = async function(notificacao) {
    try {
        let sql = `UPDATE tbl_notificacao SET conteudo = '${notificacao.conteudo}
                    WHERE id_notificacao = ${notificacao.id_notificacao}'`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteNotification = async function(id) {
    try {
        let sql = `DELETE from tbl_notificacao WHERE id_notificacao = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        
    }
}


module.exports = {
    getSelectAllNotification,
    getSelectNotificationById,
    getSelectLastId,
    setInsertNotification,
    setUpdateNotification,
    setDeleteNotification
}
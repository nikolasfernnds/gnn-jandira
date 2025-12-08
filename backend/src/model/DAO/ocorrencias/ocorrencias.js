/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 05/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllOccurrences = async function() {
    try {
        let sql = `SELECT * FROM tbl_ocorrencia`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        //console.log(error)
        return false
    }
} 

const getSelectOccurencesById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_ocorrencia WHERE id_ocorrencia = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectOccurencesByCategory = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_ocorrencia WHERE id_categoria_ocorrencia = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectOccurencesByUser = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_ocorrencia WHERE id_usuario = ${id}`
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
        let sql = `SELECT * FROM tbl_ocorrencia ORDER BY id_ocorrencia DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

const setInsertOccurences = async function (ocorrencia) {
    try {
        const jsonData = JSON.stringify(ocorrencia)
        const sql = `CALL sp_criar_ocorrencia('${jsonData}')`
        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result) && result[0]) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        //console.log(error)
        return false
    }
}

const setDeleteOccurences = async function(id) {
    try {
        let sql = `DELETE from tbl_ocorrencia WHERE id_ocorrencia = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return true
        else    
            return false
    } catch (error) {
    }
}

module.exports = {
    getSelectAllOccurrences,
    getSelectOccurencesById,
    getSelectOccurencesByCategory,
    getSelectOccurencesByUser,
    getSelectLastId,
    setInsertOccurences,
    setDeleteOccurences
}
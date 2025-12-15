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
        let sql = `SELECT * FROM view_ocorrencias`
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

const getSelectOccurencesById = async function (id) {
    try {
        const sql = `CALL sp_buscar_ocorrencia_unica(${id})`
        const rs = await prisma.$queryRawUnsafe(sql)

        if (!Array.isArray(rs)) {
            return []
        }

        // 🔥 NORMALIZA RESULTADOS
        const dadosOcorrencia = Array.isArray(rs[0]) && rs[0].length > 0
            ? rs[0]
            : []

        const midias = Array.isArray(rs[1]) ? rs[1] : []
        const historico = Array.isArray(rs[2]) ? rs[2] : []

        if (dadosOcorrencia.length === 0) {
            return []
        }

        // 🛡️ garante objeto válido
        const ocorrencia = { ...dadosOcorrencia[0] }

        ocorrencia.midias = midias
        ocorrencia.historico = historico

        return [ocorrencia]

    } catch (error) {
        console.error("ERRO DAO getSelectOccurencesById:", error)
        return false
    }
}


const getSelectOccurencesByCategory = async function(id) {
    try {
        let sql = `SELECT * FROM view_ocorrencias WHERE id_categoria_ocorrencia = ${id}`
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
        let sql = `SELECT * FROM view_ocorrencias WHERE id_usuario = ${id}`
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
        let jsonData = JSON.stringify(ocorrencia)
        let sql = `CALL sp_criar_ocorrencia('${jsonData}')`
        let result = await prisma.$queryRawUnsafe(sql)

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

const setUpdateStatusOccurences = async function(idOcorrencia, idStatus, idUsuario) {
    try {
        let sql = `CALL sp_atualizar_status_ocorrencia(${idOcorrencia}, ${idStatus}, ${idUsuario})`
        await prisma.$queryRawUnsafe(sql)

        return true
    } catch (error) {
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
        return false
    }
}

module.exports = {
    getSelectAllOccurrences,
    getSelectOccurencesById,
    getSelectOccurencesByCategory,
    getSelectOccurencesByUser,
    getSelectLastId,
    setInsertOccurences,
    setUpdateStatusOccurences,
    setDeleteOccurences
}
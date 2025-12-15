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
        const sqlPrincipal = `SELECT * FROM view_ocorrencias WHERE id_ocorrencia = ${id}`
        const rsPrincipal = await prisma.$queryRawUnsafe(sqlPrincipal)

        if (!Array.isArray(rsPrincipal) || rsPrincipal.length === 0) {
            return []
        }

        const ocorrencia = { ...rsPrincipal[0] }

        const sqlMidias = `SELECT url_arquivo FROM tbl_midia_ocorrencia WHERE id_ocorrencia = ${id}`
        const rsMidias = await prisma.$queryRawUnsafe(sqlMidias)
        ocorrencia.midias = Array.isArray(rsMidias) ? rsMidias : []

        const sqlHistorico = `
            SELECT 
                h.observacao,
                h.data_mudanca,
                s.nome_status AS status_anterior,
                u.nickname AS usuario_modificacao_nickname
            FROM tbl_historico_ocorrencia AS h
            INNER JOIN tbl_status AS s ON h.id_status = s.id_status
            LEFT JOIN tbl_usuario AS u ON h.id_usuario = u.id_usuario
            WHERE h.id_ocorrencia = ${id}
            ORDER BY h.data_mudanca DESC
        `
        const rsHistorico = await prisma.$queryRawUnsafe(sqlHistorico)
        ocorrencia.historico = Array.isArray(rsHistorico) ? rsHistorico : []

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
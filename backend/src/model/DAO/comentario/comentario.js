/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 * Data: 11/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ******************************************************************************/


const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllComments = async function () {
    try {
        let sql = `SELECT * FROM tbl_comentario`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCommentById = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_comentario WHERE id_comentario = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastId = async function () {
    try {
        let sql = `SELECT id_comentario FROM tbl_comentario ORDER BY id_comentario DESC LIMIT 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id_comentario)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertComment = async function (comentario) {
    try {
        let sql = `
            INSERT INTO tbl_comentario (conteudo, data_comentario)
            VALUES ("${comentario.conteudo}", "${comentario.data_comentario}")
        `
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateComment = async function (comentario) {
    try {
        let sql = `
            UPDATE tbl_comentario
            SET conteudo = "${comentario.conteudo}",
                data_comentario = "${comentario.data_comentario}"
            WHERE id_comentario = ${comentario.id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteComment = async function (id) {
    try {
        let sql = `DELETE FROM tbl_comentario WHERE id_comentario = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllComments,
    getSelectCommentById,
    getSelectLastId,
    setInsertComment,
    setUpdateComment,
    setDeleteComment
}

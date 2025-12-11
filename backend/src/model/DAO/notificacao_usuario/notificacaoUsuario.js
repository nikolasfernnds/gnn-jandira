/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 11/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

// Buscar todas as notificações de um usuário
const getNotificationsByUser = async function (idUsuario) {
    try {
        let sql = `
            SELECT 
                nu.id_notificacao_usuario,
                nu.lida,
                n.id_notificacao,
                n.conteudo,
                n.data_envio,
                u.id_usuario,
                u.nome_completo
            FROM tbl_notificacao_usuario nu
            INNER JOIN tbl_notificacao n
                ON nu.id_notificacao = n.id_notificacao
            INNER JOIN tbl_usuario u
                ON nu.id_usuario = u.id_usuario
            WHERE nu.id_usuario = ${idUsuario};
        `

        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Buscar uma notificação específica do usuário
const getNotificationUserById = async function (id) {
    try {
        let sql = `
            SELECT 
                nu.id_notificacao_usuario,
                nu.lida,
                n.id_notificacao,
                n.conteudo,
                n.data_envio,
                u.id_usuario,
                u.nome_completo
            FROM tbl_notificacao_usuario nu
            INNER JOIN tbl_notificacao n
                ON nu.id_notificacao = n.id_notificacao
            INNER JOIN tbl_usuario u
                ON nu.id_usuario = u.id_usuario
            WHERE nu.id_notificacao_usuario = ${id};
        `

        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Inserir notificação para um usuário
const setInsertNotificationUser = async function (notificacao) {
    try {
        let sql = `
            INSERT INTO tbl_notificacao_usuario (id_notificacao, id_usuario)
            VALUES (${notificacao.id_notificacao}, ${notificacao.id_usuario});
        `
        const result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

// Atualizar status "lida"
const setMarkAsRead = async function (id) {
    try {
        let sql = `
            UPDATE tbl_notificacao_usuario
            SET lida = TRUE
            WHERE id_notificacao_usuario = ${id};
        `

        const result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    getNotificationsByUser,
    getNotificationUserById,
    setInsertNotificationUser,
    setMarkAsRead
}

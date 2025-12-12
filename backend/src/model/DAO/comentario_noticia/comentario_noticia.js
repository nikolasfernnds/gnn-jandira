/*****************************************************************************
 *  Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 *  Data: 12/12/2025
 *  Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

const getSelectAllComentarioNoticia = async function() {
    try {
        let sql = `
            SELECT 
                cn.id_comentario_noticia,
                cn.id_noticia,
                cn.id_usuario,
                cn.id_comentario,
                n.titulo AS titulo_noticia,
                u.nome_completo AS nome_usuario,
                c.conteudo AS comentario
            FROM tbl_comentario_noticia cn
            INNER JOIN tbl_noticia n
                ON cn.id_noticia = n.id_noticia
            INNER JOIN tbl_usuario u
                ON cn.id_usuario = u.id_usuario
            INNER JOIN tbl_comentario c
                ON cn.id_comentario = c.id_comentario;
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectComentarioNoticiaById = async function(id) {
    try {
        let sql = `
            SELECT 
                cn.id_comentario_noticia,
                cn.id_noticia,
                cn.id_usuario,
                cn.id_comentario,
                n.titulo AS titulo_noticia,
                u.nome_completo AS nome_usuario,
                c.conteudo AS comentario
            FROM tbl_comentario_noticia cn
            INNER JOIN tbl_noticia n
                ON cn.id_noticia = n.id_noticia
            INNER JOIN tbl_usuario u
                ON cn.id_usuario = u.id_usuario
            INNER JOIN tbl_comentario c
                ON cn.id_comentario = c.id_comentario
            WHERE cn.id_comentario_noticia = ${id};
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectComentarioNoticiaByNoticia = async function(idNoticia) {
    try {
        let sql = `
            SELECT 
                cn.id_comentario_noticia,
                cn.id_noticia,
                cn.id_usuario,
                cn.id_comentario,
                u.nome_completo,
                c.conteudo
            FROM tbl_comentario_noticia cn
            INNER JOIN tbl_usuario u
                ON cn.id_usuario = u.id_usuario
            INNER JOIN tbl_comentario c
                ON cn.id_comentario = c.id_comentario
            WHERE cn.id_noticia = ${idNoticia};
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectComentarioNoticiaByUsuario = async function(idUsuario) {
    try {
        let sql = `
            SELECT 
                cn.id_comentario_noticia,
                cn.id_noticia,
                cn.id_usuario,
                cn.id_comentario,
                c.conteudo,
                n.titulo
            FROM tbl_comentario_noticia cn
            INNER JOIN tbl_comentario c
                ON cn.id_comentario = c.id_comentario
            INNER JOIN tbl_noticia n
                ON cn.id_noticia = n.id_noticia
            WHERE cn.id_usuario = ${idUsuario};
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertComentarioNoticia = async function(dados) {
    try {
        let sql = `
            INSERT INTO tbl_comentario_noticia (id_noticia, id_usuario, id_comentario)
            VALUES (${dados.id_noticia}, ${dados.id_usuario}, ${dados.id_comentario});
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}


const setUpdateComentarioNoticia = async function(dados) {
    try {
        let sql = `
            UPDATE tbl_comentario_noticia
            SET id_noticia = ${dados.id_noticia},
                id_usuario = ${dados.id_usuario},
                id_comentario = ${dados.id_comentario}
            WHERE id_comentario_noticia = ${dados.id_comentario_noticia};
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

const setDeleteComentarioNoticia = async function(id) {
    try {
        let sql = `
            DELETE FROM tbl_comentario_noticia
            WHERE id_comentario_noticia = ${id};
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

module.exports = {
    getSelectAllComentarioNoticia,
    getSelectComentarioNoticiaById,
    getSelectComentarioNoticiaByNoticia,
    getSelectComentarioNoticiaByUsuario,
    setInsertComentarioNoticia,
    setUpdateComentarioNoticia,
    setDeleteComentarioNoticia
}

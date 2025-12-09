/*****************************************************************************
 * Objetivo: Arquivo responsável pela integração pelo CRUD de dados do MySQL
 * para a entidade Notícia (tbl_noticia).
 * Data: 09/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../../../generated/prisma')
const prisma = new PrismaClient()

// Listar todas as notícias
const getSelectAllNoticias = async function() {
    try {
        let sql = `SELECT * FROM tbl_noticia ORDER BY data_publicacao DESC`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        
        return false
    }
}

// Buscar notícia por ID
const getSelectNoticiaById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_noticia WHERE id_noticia = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Buscar notícia por ID de Categoria
const getSelectNoticiaByCategory = async function(idCategoria) {
    try {
        let sql = `SELECT * FROM tbl_noticia WHERE id_categoria_noticia = ${idCategoria}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Buscar notícia por ID de Autor (Usuário)
const getSelectNoticiaByAuthor = async function(idAutor) {
    try {
        let sql = `SELECT * FROM tbl_noticia WHERE id_autor = ${idAutor}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Buscar o ID da última notícia inserida
const getSelectLastId = async function() {
    try {
        let sql = `SELECT * FROM tbl_noticia ORDER BY id_noticia DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result) && result.length > 0)
            return Number(result[0].id_noticia) 
        else
            return false
    } catch (error) {
        return false
    }
}

// Inserir Notícia
const setInsertNoticia = async function (noticia) {
    try {

        const jsonData = JSON.stringify(noticia) 
        
        const sql = `CALL sp_criar_noticia('${jsonData}')`
        const result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result) && result[0]) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// Atualizar Notícia
const setUpdateNoticia = async function (id, dadosNoticia) {
    try {
        const { id_categoria_noticia, titulo, conteudo, foto_capa } = dadosNoticia;

        let sql = `UPDATE tbl_noticia SET 
                        id_categoria_noticia = ${id_categoria_noticia},
                        titulo = '${titulo.replace(/'/g, "''")}',
                        conteudo = '${conteudo.replace(/'/g, "''")}',
                        foto_capa = '${foto_capa}'
                   WHERE id_noticia = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {

        return false
    }
}

// Deletar Notícia
const setDeleteNoticia = async function(id) {
    try {
        let sql = `DELETE from tbl_noticia WHERE id_noticia = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else    
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllNoticias,
    getSelectNoticiaById,
    getSelectNoticiaByCategory,
    getSelectNoticiaByAuthor,
    getSelectLastId,
    setInsertNoticia,
    setUpdateNoticia,
    setDeleteNoticia
}
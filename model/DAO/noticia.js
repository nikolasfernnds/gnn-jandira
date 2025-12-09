// Arquivo: src/models/NoticiaDAO.js
// Adaptação da sua estrutura usando as Stored Procedures (SPs) que criamos.

const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// R - READ (Listar Todas)
const getSelectAllNoticias = async () => {
    try {
        // Chama a SP que lista todas as notícias
        const sql = `CALL sp_listar_noticias()`; 
        const rsNoticias = await prisma.$queryRawUnsafe(sql);
        
        // Em muitas implementações, o Prisma ou o driver MySQL retorna o resultado em [0]
        return rsNoticias[0]; 
    } catch (error) {
        console.error("Erro no getSelectAllNoticias:", error);
        return false;
    }
};

// R - READ (Buscar por ID)
const getSelectByIdNoticia = async (id) => {
    try {
        // Chama a SP que busca a notícia e seus detalhes (mídia, histórico)
        const sql = `CALL sp_buscar_noticia_unica(${id})`; 
        const rsNoticia = await prisma.$queryRawUnsafe(sql);
        
        // Retorna o primeiro conjunto de resultados (os dados principais da notícia)
        return rsNoticia[0].length ? rsNoticia[0][0] : null; 
    } catch (error) {
        console.error("Erro no getSelectByIdNoticia:", error);
        return false;
    }
};

// C - CREATE (Inserir)
const setInsertNoticia = async (dadosNoticia) => {
    try {
        const { id_autor, id_categoria_noticia, titulo, conteudo, data_publicacao, foto_capa } = dadosNoticia;

        // Chama a SP que insere a notícia e dispara o TRG_NOTICIA_NOTIFICACAO
        const sql = `CALL sp_criar_noticia(
            ${id_autor}, 
            ${id_categoria_noticia}, 
            '${titulo}', 
            '${conteudo}', 
            '${data_publicacao}', 
            '${foto_capa}'
        )`;
        
        const result = await prisma.$queryRawUnsafe(sql);
        // A SP retorna o ID da notícia inserida: result[0][0].id_noticia
        return result[0].length ? result[0][0] : false; 
    } catch (error) {
        console.error("Erro no setInsertNoticia:", error);
        return false;
    }
};

// U - UPDATE (Atualizar)
const setUpdateNoticia = async (dadosNoticia) => {
    // ATENÇÃO: Esta função pressupõe que a SP 'sp_atualizar_noticia' foi criada.
    try {
        const { id, id_categoria_noticia, titulo, conteudo, foto_capa } = dadosNoticia;
        
        const sql = `
            CALL sp_atualizar_noticia(
                ${id}, 
                ${id_categoria_noticia}, 
                '${titulo}', 
                '${conteudo}', 
                '${foto_capa}'
            )
        `;
        const result = await prisma.$executeRawUnsafe(sql);
        return result; // Retorna o número de linhas afetadas (1 se sucesso).
    } catch (error) {
        console.error("Erro no setUpdateNoticia:", error);
        return false;
    }
};

// D - DELETE (Deletar)
const setDeleteNoticia = async (id) => {
    // ATENÇÃO: Esta função pressupõe que a SP 'sp_deletar_noticia' foi criada.
    try {
        // Chama a SP que deleta a notícia e suas dependências (notificações, comentários)
        const sql = `CALL sp_deletar_noticia(${id})`; 
        const result = await prisma.$executeRawUnsafe(sql);
        return result; // Retorna o número de linhas afetadas.
    } catch (error) {
        console.error("Erro no setDeleteNoticia:", error);
        return false;
    }
};

module.exports = {
    getSelectAllNoticias,
    getSelectByIdNoticia,
    setInsertNoticia,
    setUpdateNoticia,
    setDeleteNoticia
};
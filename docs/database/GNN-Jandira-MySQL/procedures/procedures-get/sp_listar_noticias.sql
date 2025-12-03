USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_listar_noticias()
/*
    Função: Lista todas as notícias publicadas (com resumo para a listagem).
    Rota API: GET /v1/gnn/noticias
*/
BEGIN
    SELECT
        n.id_noticia,
        n.titulo,
        LEFT(n.conteudo, 200) AS resumo_conteudo,
        n.data_publicacao,
        n.foto_capa,
        c.nome_categoria AS categoria_nome,
        u.nickname AS autor_nickname
    FROM
        tbl_noticia AS n
    INNER JOIN
        tbl_categoria_noticia AS c ON n.id_categoria_noticia = c.id_categoria_noticia
    INNER JOIN
        tbl_usuario AS u ON n.id_autor = u.id_usuario
    ORDER BY
        n.data_publicacao DESC;

END$$

DELIMITER ;
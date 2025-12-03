USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_buscar_noticia_unica(
    IN p_id_noticia INT
)
/*
    Função: Retorna o conteúdo completo de uma única notícia.
    Rota API: GET /v1/gnn/noticias/:id
*/
BEGIN
    SELECT
        n.id_noticia,
        n.titulo,
        n.conteudo,
        n.data_publicacao,
        n.foto_capa,
        c.nome_categoria AS categoria_nome,
        u.nome_completo AS autor_nome,
        u.nickname AS autor_nickname
    FROM
        tbl_noticia AS n
    INNER JOIN
        tbl_categoria_noticia AS c ON n.id_categoria_noticia = c.id_categoria_noticia
    INNER JOIN
        tbl_usuario AS u ON n.id_autor = u.id_usuario
    WHERE
        n.id_noticia = p_id_noticia;
END$$

DELIMITER ;
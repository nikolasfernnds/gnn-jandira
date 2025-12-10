CREATE VIEW view_noticias AS
SELECT 
    n.id_noticia,
    n.id_autor,
    u.nome_completo AS autor,
    n.id_categoria_noticia,
    c.nome_categoria as categoria_noticia,
    n.titulo,
    n.conteudo,
    n.data_publicacao,
    n.foto_capa
FROM tbl_noticia n
INNER JOIN tbl_usuario u 
    ON n.id_autor = u.id_usuario
INNER JOIN tbl_categoria_noticia c
    ON n.id_categoria_noticia = c.id_categoria_noticia;
USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_listar_ocorrencias()
/*
    Função: Lista todas as ocorrências para a Home/Listagem pública.
    Rota API: GET /v1/gnn/ocorrencias
*/
BEGIN
    SELECT
        o.id_ocorrencia,
        o.titulo,
        o.descricao,
        o.nivel_ocorrencia,
        o.data_registro,
        s.nome_status AS status_nome,
        c.nome_categoria AS categoria_nome,
        e.logradouro,
        e.bairro,
        u.nickname AS denunciante_nickname
    FROM
        tbl_ocorrencia AS o
    INNER JOIN
        tbl_status AS s ON o.id_status = s.id_status
    INNER JOIN
        tbl_categoria_ocorrencia AS c ON o.id_categoria_ocorrencia = c.id_categoria_ocorrencia
    INNER JOIN
        tbl_endereco_ocorrencia AS e ON o.id_endereco_ocorrencia = e.id_endereco_ocorrencia
    LEFT JOIN
        tbl_usuario AS u ON o.id_usuario = u.id_usuario
    ORDER BY
        o.data_registro DESC;
END$$

DELIMITER ;
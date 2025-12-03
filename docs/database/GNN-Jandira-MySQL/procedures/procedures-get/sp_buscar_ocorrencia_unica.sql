USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_buscar_ocorrencia_unica(
    IN p_id_ocorrencia INT
)
/*
    Função: Retorna os detalhes de uma única ocorrência (Multi-result set).
    Rota API: GET /v1/gnn/ocorrencias/:id
    Requisito: Retorna dados principais, mídias e histórico.
*/
BEGIN
    -- Resultado 1: Dados Principais
    SELECT
        o.id_ocorrencia,
        o.titulo,
        o.descricao,
        o.nivel_ocorrencia,
        o.data_registro,
        s.nome_status AS status_nome,
        c.nome_categoria AS categoria_nome,
        -- Denunciante
        u.nome_completo AS denunciante_nome,
        u.nickname AS denunciante_nickname,
        -- Endereço
        e.logradouro,
        e.bairro,
        e.numero,
        e.ponto_referencia
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
    WHERE
        o.id_ocorrencia = p_id_ocorrencia;

    -- Resultado 2: Mídias
    SELECT
        m.url_arquivo,
        m.tipo,
        m.data_upload
    FROM
        tbl_midia_ocorrencia AS m
    WHERE
        m.id_ocorrencia = p_id_ocorrencia;

    -- Resultado 3: Histórico de Status (Auditoria)
    SELECT
        h.observacao,
        h.data_mudanca,
        s.nome_status AS status_anterior,
        u.nickname AS usuario_modificacao_nickname
    FROM
        tbl_historico_ocorrencia AS h
    INNER JOIN
        tbl_status AS s ON h.id_status = s.id_status
    LEFT JOIN
        tbl_usuario AS u ON h.id_usuario = u.id_usuario
    WHERE
        h.id_ocorrencia = p_id_ocorrencia
    ORDER BY
        h.data_mudanca DESC;

END$$

DELIMITER ;
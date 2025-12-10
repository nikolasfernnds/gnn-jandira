CREATE VIEW view_ocorrencias AS
SELECT
    o.id_ocorrencia,
    o.id_usuario,
    u.nome_completo AS usuario,
    o.id_status,
    s.nome_status AS status,
    o.id_categoria_ocorrencia,
    c.nome_categoria AS categoria,
    o.titulo,
    o.descricao,
    o.nivel_ocorrencia,
    o.data_registro,

    e.cep,
    e.logradouro,
    e.bairro,
    e.numero,
    e.ponto_referencia
FROM tbl_ocorrencia o
LEFT JOIN tbl_usuario u
    ON o.id_usuario = u.id_usuario
INNER JOIN tbl_status s
    ON o.id_status = s.id_status
INNER JOIN tbl_categoria_ocorrencia c
    ON o.id_categoria_ocorrencia = c.id_categoria_ocorrencia
INNER JOIN tbl_endereco_ocorrencia e
    ON o.id_endereco_ocorrencia = e.id_endereco_ocorrencia;
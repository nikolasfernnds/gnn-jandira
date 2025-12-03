USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_criar_ocorrencia(
    IN p_json_data JSON
)
/*
    Função: Cria uma nova ocorrência e seu endereço vinculado.
    Rota API: POST /v1/gnn/ocorrencias
    Requisito: Transação Endereço + Ocorrência.
*/
BEGIN
    DECLARE v_id_endereco INT;
    DECLARE v_id_ocorrencia INT;
    DECLARE v_usuario_id INT;

    SET v_usuario_id = NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_usuario')), 'null');

    START TRANSACTION;

    INSERT INTO tbl_endereco_ocorrencia (
        cep,
        logradouro,
        bairro,
        numero,
        ponto_referencia
    ) VALUES (
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.cep')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.logradouro')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.bairro')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.numero')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.ponto_referencia'))
    );

    SET v_id_endereco = LAST_INSERT_ID();

    INSERT INTO tbl_ocorrencia (
        id_usuario,
        id_status,
        id_categoria_ocorrencia,
        id_endereco_ocorrencia,
        titulo,
        descricao,
        nivel_ocorrencia
    ) VALUES (
        v_usuario_id,
        1,
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.id_categoria_ocorrencia')),
        v_id_endereco,
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.titulo')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.descricao')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nivel_ocorrencia'))
    );

    SET v_id_ocorrencia = LAST_INSERT_ID();

    SELECT v_id_ocorrencia AS id_ocorrencia;

    COMMIT;
END$$

DELIMITER ;
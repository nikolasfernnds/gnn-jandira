USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_cadastrar_usuario(
    IN p_json_data JSON
)
/*
    Função: Cadastra um novo usuário Cidadão (registro inicial).
    Rota API: POST /v1/gnn/auth/register
    Requisito: Inserir perfil padrão 'cidadao'.
*/
BEGIN
    DECLARE v_id_usuario INT;
    
    START TRANSACTION;

    INSERT INTO tbl_usuario (
        nome_completo,
        nickname,
        perfil,
        email,
        senha_hash,
        data_nascimento,
        telefone
    ) VALUES (
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nome_completo')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nickname')),
        'cidadao', -- Perfil padrão
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.email')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.senha_hash')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.data_nascimento')),
        JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.telefone'))
    );

    SET v_id_usuario = LAST_INSERT_ID();

    SELECT v_id_usuario AS id_usuario;

    COMMIT;
END$$

DELIMITER ;
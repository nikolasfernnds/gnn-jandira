USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_perfil(
    IN p_id_usuario INT,
    IN p_json_data JSON
)
/*
    Função: Atualiza os dados do perfil do usuário e seu endereço (se fornecido).
    Rota API: PUT /v1/gnn/usuarios/perfil
    Requisito: Transação: (INSERT/UPDATE Endereço) + (UPDATE Usuário).
*/
BEGIN
    DECLARE v_id_endereco_usuario INT;

    START TRANSACTION;

    -- Pega o ID do endereço atual do usuário
    SELECT id_endereco_usuario INTO v_id_endereco_usuario
    FROM tbl_usuario
    WHERE id_usuario = p_id_usuario;

    -- Lógica para atualização do endereço
    IF JSON_EXTRACT(p_json_data, '$.endereco.cep') IS NOT NULL THEN
        
        IF v_id_endereco_usuario IS NULL THEN
            -- Caso 1: Usuário não tem endereço cadastrado -> INSERT
            INSERT INTO tbl_endereco_usuario (
                cep, logradouro, bairro, cidade, uf, numero, complemento
            ) VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.cep')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.logradouro')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.bairro')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.cidade')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.uf')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.numero')),
                JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.complemento'))
            );
            
            SET v_id_endereco_usuario = LAST_INSERT_ID();
            
            UPDATE tbl_usuario
            SET id_endereco_usuario = v_id_endereco_usuario
            WHERE id_usuario = p_id_usuario;

        ELSE
            -- Caso 2: Usuário já tem endereço cadastrado -> UPDATE
            UPDATE tbl_endereco_usuario
            SET
                cep = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.cep')),
                logradouro = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.logradouro')),
                bairro = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.bairro')),
                cidade = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.cidade')),
                uf = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.uf')),
                numero = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.numero')),
                complemento = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.endereco.complemento'))
            WHERE
                id_endereco_usuario = v_id_endereco_usuario;

        END IF;

    END IF;

    -- Atualiza os dados do perfil do usuário
    UPDATE tbl_usuario
    SET
        nome_completo = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nome_completo')), ''), nome_completo),
        nickname = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.nickname')), ''), nickname),
        email = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.email')), ''), email),
        data_nascimento = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.data_nascimento')), ''), data_nascimento),
        foto_perfil = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.foto_perfil')), ''), foto_perfil),
        telefone = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, '$.telefone')), ''), telefone)
    WHERE
        id_usuario = p_id_usuario;

    COMMIT;
    
    SELECT 'Perfil atualizado com sucesso' AS status;

END$$

DELIMITER ;
USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_autenticar_usuario(
    IN p_email VARCHAR(150)
)
/*
    Função: Busca dados do usuário, incluindo a senha_hash, para validação de login.
    Rota API: POST /v1/gnn/auth/login
    Observação: A comparação de hash é feita no Back-End (Node.js).
*/
BEGIN
    SELECT
        id_usuario,
        id_endereco_usuario,
        nome_completo,
        nickname,
        perfil,
        email,
        senha_hash
    FROM
        tbl_usuario
    WHERE
        email = p_email;
END$$

DELIMITER ;
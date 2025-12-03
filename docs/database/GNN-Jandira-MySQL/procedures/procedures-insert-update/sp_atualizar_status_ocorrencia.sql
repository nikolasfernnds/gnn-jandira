USE gnn_jandira;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_status_ocorrencia(
    IN p_id_ocorrencia INT,
    IN p_id_status INT,
    IN p_id_usuario INT
)
/*
    Função: Atualiza o status de uma ocorrência.
    Rota API: PATCH /v1/gnn/ocorrencias/:id/status
    Permissão: Apenas Admin/Gestor.
    Observação: Dispara TRG_LOG_STATUS_OCORRENCIA e TRG_NOTIFICACAO_OCORRENCIA_RESOLVIDA.
*/
BEGIN
    START TRANSACTION;

    UPDATE tbl_ocorrencia
    SET
        id_status = p_id_status,
        -- Atualiza qual usuário (Admin) fez a última modificação no registro
        id_usuario = p_id_usuario 
    WHERE
        id_ocorrencia = p_id_ocorrencia;

    COMMIT;
END$$

DELIMITER ;
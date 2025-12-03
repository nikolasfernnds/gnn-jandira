USE gnn_jandira;

DELIMITER $$

CREATE TRIGGER trg_notificacao_ocorrencia_resolvida
AFTER UPDATE ON tbl_ocorrencia
FOR EACH ROW
BEGIN
    DECLARE v_id_notificacao INT;

    IF NEW.id_status = 3 AND OLD.id_status != 3 AND NEW.id_usuario IS NOT NULL THEN
        
        INSERT INTO tbl_notificacao (conteudo)
        VALUES (CONCAT('Sua ocorrência "', NEW.titulo, '" foi resolvida! ID: ', NEW.id_ocorrencia));
        
        SET v_id_notificacao = LAST_INSERT_ID();
        
        INSERT INTO tbl_notificacao_ocorrencia (id_ocorrencia, id_notificacao)
        VALUES (NEW.id_ocorrencia, v_id_notificacao);

        INSERT INTO tbl_notificacao_usuario (id_notificacao, id_usuario, lida)
        VALUES (v_id_notificacao, NEW.id_usuario, FALSE);
        
    END IF;
END$$

DELIMITER ;
use gnn_jandira;

DELIMITER $$

CREATE TRIGGER trg_log_status_ocorrencia
AFTER UPDATE ON tbl_ocorrencia
FOR EACH ROW
BEGIN
    IF OLD.id_status != NEW.id_status THEN
        INSERT INTO tbl_historico_ocorrencia (
            id_ocorrencia, 
            id_usuario, 
            id_status, 
            observacao, 
            data_mudanca
        )
        VALUES (
            NEW.id_ocorrencia, 
            NEW.id_usuario,
            NEW.id_status, 
            CONCAT('Status alterado automaticamente de ', OLD.id_status, ' para ', NEW.id_status),
            current_date());
	END IF;
END$$

DELIMITER ;
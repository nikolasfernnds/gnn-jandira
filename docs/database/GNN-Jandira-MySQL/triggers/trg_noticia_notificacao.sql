USE gnn_jandira;

DELIMITER $$

CREATE TRIGGER trg_noticia_notificacao
AFTER INSERT ON tbl_noticia
FOR EACH ROW
BEGIN
    DECLARE v_id_notificacao INT;
    
    INSERT INTO tbl_notificacao (conteudo)
    VALUES (CONCAT('Nova Notícia Publicada: ', NEW.titulo));
    
    SET v_id_notificacao = LAST_INSERT_ID();
    
    INSERT INTO tbl_notificacao_noticia (id_noticia, id_notificacao)
    VALUES (NEW.id_noticia, v_id_notificacao);

    INSERT INTO tbl_notificacao_usuario (id_notificacao, id_usuario, lida)
    SELECT 
        v_id_notificacao, 
        u.id_usuario, 
        FALSE
    FROM 
        tbl_usuario AS u;
END$$

DELIMITER ;
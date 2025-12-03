USE gnn_jandira;

-- Inserção de Status Padrões (Usados na tbl_ocorrencia e tbl_historico_ocorrencia)
INSERT INTO tbl_status (id_status, nome_status, descricao_status) VALUES
(1, 'Pendente', 'Ocorrência recém-registrada, aguardando triagem.'),
(2, 'Em Andamento', 'Ocorrência em análise ou com equipe de resposta enviada.'),
(3, 'Resolvido', 'Ocorrência concluída e problema solucionado.');

-- Inserção de Categorias de Ocorrência Padrões (Usadas no filtro de GET /v1/gnn/ocorrencias/tipos)
INSERT INTO tbl_categoria_ocorrencia (nome_categoria) VALUES
('Buraco/Asfalto'),
('Iluminação Pública'),
('Árvore Caída'),
('Vazamento de Água/Esgoto'),
('Lixo e Entulho'),
('Pichação/Vandalismo'),
('Outros Problemas de Infraestrutura');

-- Inserção de Categorias de Notícia Padrões
INSERT INTO tbl_categoria_noticia (nome_categoria) VALUES
('Geral'),
('Infraestrutura'),
('Segurança');

USE gnn_jandira;

-- Criação de Usuários
INSERT INTO tbl_usuario (nome_completo, nickname, perfil, email, senha_hash, data_nascimento, telefone) VALUES
('Admin GNN Jandira', 'admin.jandira', 'admin', 'admin@email.com', 'admin123', NULL, NULL),
('Maria Silva', 'maria.silva', 'cidadao', 'maria@email.com', 'maria123', '1990-05-15', '11988887777');

-- Criação de Endereços de Ocorrência (ID 1 e ID 2)
INSERT INTO tbl_endereco_ocorrencia (cep, logradouro, bairro, numero, ponto_referencia) VALUES
('06600-000', 'Rua das Flores', 'Centro', '123', 'Em frente ao mercado.'),
('06600-010', 'Avenida da Luz', 'Jardim Novo', 'S/N', 'Próximo à escola.');

-- 3. Criação de Ocorrências (ID 1 e ID 2)
INSERT INTO tbl_ocorrencia (id_usuario, id_status, id_categoria_ocorrencia, id_endereco_ocorrencia, titulo, descricao, nivel_ocorrencia) VALUES
(2, 2, 1, 1, 'Buraco Perigoso na Rua Principal', 'O buraco está muito grande e causou acidentes. Precisa de reparo urgente.', 'alta'),
(NULL, 1, 2, 2, 'Poste sem luz há 3 dias', 'A rua está muito escura à noite, aumentando a insegurança.', 'media');

-- Criação de Mídia para Ocorrência
INSERT INTO tbl_midia_ocorrencia (id_ocorrencia, url_arquivo, tipo, data_upload) VALUES
(1, 'https://storage.gnn.com/buraco_rua_flores.jpg', 'foto', NOW());

-- Criação de Notícia
INSERT INTO tbl_noticia (id_autor, id_categoria_noticia, titulo, conteudo, data_publicacao, foto_capa) VALUES
(1, 1, 'Iniciativa Varre-Rua: Moradores se unem pela limpeza', 'Em um esforço conjunto, moradores do bairro Jardim Novo organizaram um mutirão de limpeza... (Conteúdo longo da notícia)', NOW(), 'https://storage.gnn.com/capa_limpeza_bairro.jpg');

-- Criação de Comentários

USE gnn_jandira;

INSERT INTO tbl_comentario (conteudo, data_comentario) VALUES
('Excelente iniciativa, parabéns aos envolvidos!', CURDATE()),
('A administração precisa agir mais rápido nessa ocorrência!', CURDATE());

-- Vincula Comentários às Entidades
INSERT INTO tbl_comentario_noticia (id_noticia, id_usuario, id_comentario) VALUES (1, 2, 1);
INSERT INTO tbl_comentario_ocorrencia (id_ocorrencia, id_usuario, id_comentario) VALUES (1, 2, 2);

-- Teste de Trigger: Simula atualização para "Resolvido" (ID 3) (Chama SP)
CALL sp_atualizar_status_ocorrencia(1, 3, 1);

-- Vincula Comentário 2 à Ocorrência 1
INSERT INTO tbl_comentario_ocorrencia (id_ocorrencia, id_usuario, id_comentario) VALUES
(1, 2, 2);

-- Teste de Trigger: Simula a atualização do status da Ocorrência 1 para "Resolvido" (ID 3)
CALL sp_atualizar_status_ocorrencia(1, 3, 1);
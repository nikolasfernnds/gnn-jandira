USE gnn_jandira;

-- #################################################
-- # GNN JANDIRA: SCRIPT DE CRIAÇÃO DE TABELAS     #
-- # SGBD ALVO: MySQL 8.0+ (InnoDB)                #
-- #################################################

-- -------------------------------------------------

CREATE TABLE tbl_status (
    id_status INT PRIMARY KEY AUTO_INCREMENT,
    nome_status VARCHAR(50) NOT NULL UNIQUE,
    descricao_status VARCHAR(255)
);

CREATE TABLE tbl_categoria_ocorrencia (
    id_categoria_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(80) NOT NULL
);

CREATE TABLE tbl_categoria_noticia (
    id_categoria_noticia INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(80) NOT NULL
);

-- -------------------------------------------------

CREATE TABLE tbl_endereco_usuario (
    id_endereco_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    bairro VARCHAR(80) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    numero VARCHAR(120),
    complemento VARCHAR(100) NULL
);

CREATE TABLE tbl_endereco_ocorrencia (
    id_endereco_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    bairro VARCHAR(80) NOT NULL,
    numero VARCHAR(120) NOT NULL,
    ponto_referencia VARCHAR(200) NULL
);

-- -------------------------------------------------

CREATE TABLE tbl_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_endereco_usuario INT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    perfil ENUM('cidadao', 'admin') NOT NULL DEFAULT 'cidadao',
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    data_nascimento DATE NULL,
    foto_perfil VARCHAR(255) NULL,
    telefone VARCHAR(20) NULL,
    FOREIGN KEY (id_endereco_usuario) REFERENCES tbl_endereco_usuario(id_endereco_usuario)
);

CREATE TABLE tbl_ocorrencia (
    id_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NULL,
    id_status INT NOT NULL,
    id_categoria_ocorrencia INT NOT NULL,
    id_endereco_ocorrencia INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT NOT NULL,
    nivel_ocorrencia ENUM('baixa', 'media', 'alta') NOT NULL DEFAULT 'media',
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    FOREIGN KEY (id_status) REFERENCES tbl_status(id_status),
    FOREIGN KEY (id_categoria_ocorrencia) REFERENCES tbl_categoria_ocorrencia(id_categoria_ocorrencia),
    FOREIGN KEY (id_endereco_ocorrencia) REFERENCES tbl_endereco_ocorrencia(id_endereco_ocorrencia)
);

CREATE TABLE tbl_noticia (
    id_noticia INT PRIMARY KEY AUTO_INCREMENT,
    id_autor INT NOT NULL,
    id_categoria_noticia INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    conteudo TEXT NOT NULL,
    data_publicacao DATETIME NOT NULL,
    foto_capa VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES tbl_usuario(id_usuario),
    FOREIGN KEY (id_categoria_noticia) REFERENCES tbl_categoria_noticia(id_categoria_noticia)
);

-- -------------------------------------------------

CREATE TABLE tbl_historico_ocorrencia (
    id_historico_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    id_ocorrencia INT NOT NULL,
    id_usuario INT NULL,
    id_status INT NOT NULL,
    observacao TEXT,
    data_mudanca DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ocorrencia) REFERENCES tbl_ocorrencia(id_ocorrencia),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    FOREIGN KEY (id_status) REFERENCES tbl_status(id_status)
);

CREATE TABLE tbl_midia_ocorrencia (
    id_midia_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    id_ocorrencia INT NOT NULL,
    url_arquivo VARCHAR(255) NOT NULL,
    tipo ENUM('foto', 'video') NOT NULL,
    data_upload DATETIME NOT NULL,
    FOREIGN KEY (id_ocorrencia) REFERENCES tbl_ocorrencia(id_ocorrencia)
);

CREATE TABLE tbl_comentario (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    data_comentario DATE NOT NULL
);

CREATE TABLE tbl_comentario_ocorrencia (
    id_comentario_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    id_ocorrencia INT NOT NULL,
    id_usuario INT NOT NULL,
    id_comentario INT NOT NULL,
    FOREIGN KEY (id_ocorrencia) REFERENCES tbl_ocorrencia(id_ocorrencia),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    FOREIGN KEY (id_comentario) REFERENCES tbl_comentario(id_comentario)
);

CREATE TABLE tbl_comentario_noticia (
    id_comentario_noticia INT PRIMARY KEY AUTO_INCREMENT,
    id_noticia INT NOT NULL,
    id_usuario INT NOT NULL,
    id_comentario INT NOT NULL,
    FOREIGN KEY (id_noticia) REFERENCES tbl_noticia(id_noticia),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    FOREIGN KEY (id_comentario) REFERENCES tbl_comentario(id_comentario)
);

CREATE TABLE tbl_notificacao (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    conteudo VARCHAR(255) NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_notificacao_usuario (
    id_notificacao_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_notificacao INT NOT NULL,
    id_usuario INT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_notificacao) REFERENCES tbl_notificacao(id_notificacao),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario)
);

CREATE TABLE tbl_notificacao_ocorrencia (
    id_notificacao_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    id_notificacao INT NOT NULL,
    id_ocorrencia INT NOT NULL,
    FOREIGN KEY (id_notificacao) REFERENCES tbl_notificacao(id_notificacao),
    FOREIGN KEY (id_ocorrencia) REFERENCES tbl_ocorrencia(id_ocorrencia)
);

CREATE TABLE tbl_notificacao_noticia (
    id_notificacao_noticia INT PRIMARY KEY AUTO_INCREMENT,
    id_noticia INT NOT NULL,
    id_notificacao INT NOT NULL,
    FOREIGN KEY (id_noticia) REFERENCES tbl_noticia(id_noticia),
    FOREIGN KEY (id_notificacao) REFERENCES tbl_notificacao(id_notificacao)
);
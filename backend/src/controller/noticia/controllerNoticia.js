/********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 * para a entidade Notícia (tbl_noticia).
 * Data: 09/12/2025
 * Autores: Nicolas dos Santos, Nikolas Fernandes e Gabryel Fillipe
 * Versão: 1.0
 ********************************************************************************/

const noticiaDAO = require('../../model/DAO/noticia/noticia.js');
const defaultMessages = require('../modulo/configMessages.js');

// Função de Validação
const validarDadosNoticia = async function (dados) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    if (
        !dados.id_autor ||
        isNaN(dados.id_autor)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{O Id do autor é inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        !dados.id_categoria_noticia ||
        isNaN(dados.id_categoria_noticia)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{O Id da categoria de notícia é inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        !dados.titulo ||
        dados.titulo.length > 200
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Título inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        !dados.conteudo
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Conteúdo inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        !dados.foto_capa ||
        dados.foto_capa.length > 255
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{URL da Foto de Capa inválida}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    return false; // Retorna false se a validação for bem-sucedida
};

// Listar Todas (GET /noticias)
const listarTodasNoticias = async function() {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        let resultNoticias = await noticiaDAO.getSelectAllNoticias();

        if (resultNoticias) {
            if (resultNoticias.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                MESSAGES.DEFAULT_HEADER.itens.noticias = resultNoticias;

                return MESSAGES.DEFAULT_HEADER;
            } else {
                return MESSAGES.ERROR_NOT_FOUND;
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        console.error("Erro no Controller listarTodasNoticias:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Buscar por ID
const buscarNoticiaId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (!isNaN(id) && id != null && id != "" && id > 0) {
            let resultNoticias = await noticiaDAO.getSelectNoticiaById(Number(id));

            if (resultNoticias) {
                if (resultNoticias.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                    MESSAGES.DEFAULT_HEADER.itens.noticia = resultNoticias[0]; // Retorna apenas o objeto

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_NOT_FOUND;
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]";
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro no Controller buscarNoticiaId:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Buscar por Categoria
const buscarNoticiaCategoria = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (!isNaN(id) && id != null && id != "" && id > 0) {
            let resultNoticias = await noticiaDAO.getSelectNoticiaByCategory(Number(id));

            if (resultNoticias) {
                if (resultNoticias.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                    MESSAGES.DEFAULT_HEADER.itens.noticias = resultNoticias;

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_NOT_FOUND;
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id da Categoria incorreto]";
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro no Controller buscarNoticiaCategoria:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Buscar por Autor
const buscarNoticiaAutor = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (!isNaN(id) && id != null && id != "" && id > 0) {
            let resultNoticias = await noticiaDAO.getSelectNoticiaByAuthor(Number(id));

            if (resultNoticias) {
                if (resultNoticias.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                    MESSAGES.DEFAULT_HEADER.itens.noticias = resultNoticias;

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_NOT_FOUND;
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id do Autor incorreto]";
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro no Controller buscarNoticiaAutor:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Inserir Notícia
const criarNovaNoticia = async function (noticia, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            let validar = await validarDadosNoticia(noticia);

            if (!validar) {
                noticia.data_publicacao = new Date().toISOString().slice(0, 19).replace('T', ' ');

                let result = await noticiaDAO.setInsertNoticia(noticia);

                if (result) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code;
                    MESSAGES.DEFAULT_HEADER.message = 'Notícia criada com sucesso.';
                    MESSAGES.DEFAULT_HEADER.itens = result;

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
                }

            } else {
                return validar;
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE;
        }

    } catch (error) {
        console.error("Erro no Controller criarNovaNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Atualizar Notícia
const atualizarNoticia = async function(dadosNoticia, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            
            if (!isNaN(id) && id > 0) {
                let validar = await validarDadosNoticia(dadosNoticia);
                
                if (!validar) {
                    let validarId = await buscarNoticiaId(id);

                    if (validarId.status_code === MESSAGES.SUCESS_REQUEST.status_code) {
                        let result = await noticiaDAO.setUpdateNoticia(Number(id), dadosNoticia);

                        if (result) {
                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                            MESSAGES.DEFAULT_HEADER.message = 'Notícia atualizada com sucesso.';
                            MESSAGES.DEFAULT_HEADER.itens.noticia = dadosNoticia; 

                            return MESSAGES.DEFAULT_HEADER;

                        } else {
                            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
                        }
                    } else {
                        return validarId;
                    }
                } else {
                    return validar;
                }
            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Id incorreto]";
                return MESSAGES.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.error("Erro no Controller atualizarNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Excluir Notícia
const excluirNoticia = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    try {
        if (!isNaN(id) && id > 0) {
            let validarId = await buscarNoticiaId(id);

            if (validarId.status_code === MESSAGES.SUCESS_REQUEST.status_code) {
                let result = await noticiaDAO.setDeleteNoticia(Number(id));

                if (result) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code;
                    MESSAGES.DEFAULT_HEADER.message = 'Notícia excluída com sucesso.';

                    return MESSAGES.DEFAULT_HEADER;
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return validarId;
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " [Id incorreto]";
            return MESSAGES.ERROR_REQUIRED_FIELDS;
        }
    } catch (error) {
        console.error("Erro no Controller excluirNoticia:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports = {
    listarTodasNoticias,
    buscarNoticiaId,
    buscarNoticiaCategoria,
    buscarNoticiaAutor,
    criarNovaNoticia,
    atualizarNoticia,
    excluirNoticia
}
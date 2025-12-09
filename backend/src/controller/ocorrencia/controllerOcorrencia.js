 /********************************************************************************
 *  Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model
 *  Data: 05/12/2025
 *  Autores: Nicolas dos Santos,, Nikolas Fernandes e Gabryel Fillipe
 *  Versão: 1.0
 ********************************************************************************/

 const ocorrenciaDAO = require('../../model/DAO/ocorrencias/ocorrencias.js')
 const defaultMessages = require('../modulo/configMessages.js')

const listarTodasOcorrencias = async function() {
    try {
        let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

        let resultOcorrencias = await ocorrenciaDAO.getSelectAllOccurrences()

        if(resultOcorrencias){
            if (resultOcorrencias.length > 0){
                defaultMessages.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                defaultMessages.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                defaultMessages.DEFAULT_HEADER.itens.ocorrencia = resultOcorrencias

                return defaultMessages.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarOcorrenciaId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != null && id != "" && id > 0){
            let resultOcorrencias = await ocorrenciaDAO.getSelectOccurencesById(Number(id))

            if(resultOcorrencias){
                if(resultOcorrencias.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.ocorrencia = resultOcorrencias

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarOcorrenciaCategoria = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != null && id != "" && id > 0){
            let resultOcorrencias = await ocorrenciaDAO.getSelectOccurencesByCategory(Number(id))

            if(resultOcorrencias){
                if(resultOcorrencias.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.ocorrencia = resultOcorrencias

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarOcorrenciaUsuario = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(id) && id != null && id != "" && id > 0){
            let resultOcorrencias = await ocorrenciaDAO.getSelectOccurencesByUser(Number(id))

            if(resultOcorrencias){
                if(resultOcorrencias.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.ocorrencia = resultOcorrencias

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[Id incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const criarNovaOcorrencia = async function (ocorrencia, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            let validar = await validarDadosOcorrencia(ocorrencia)

            if (!validar) {

                let result = await ocorrenciaDAO.setInsertOccurences(ocorrencia)

                if (result) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.itens = result

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return validar
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        //console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirOcorrencia = async function(id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

  try {
    if (!contentType || String(contentType).toUpperCase() == "APPLICATION/JSON") {
      
      if (!isNaN(id) && id > 0) {

        let validarId = await buscarOcorrenciaId(id);

        if (validarId.status_code == 200) {
          let result = await ocorrenciaDAO.setDeleteOccurences(id)

          if (result) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message;

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

    } else {
      return MESSAGES.ERROR_CONTENT_TYPE; 
    }

  } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; 
  }
}

const validarDadosOcorrencia = async function (ocorrencia) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages));

    if (
        ocorrencia.id_usuario !== undefined &&
        ocorrencia.id_usuario !== null &&
        isNaN(ocorrencia.id_usuario)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{O Id do usuário é inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    if (
        ocorrencia.id_categoria_ocorrencia == "" ||
        ocorrencia.id_categoria_ocorrencia == undefined ||
        ocorrencia.id_categoria_ocorrencia == null ||
        isNaN(ocorrencia.id_categoria_ocorrencia)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{O Id da categoria de ocorrência é inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    if (
        ocorrencia.titulo == "" ||
        ocorrencia.titulo == undefined ||
        ocorrencia.titulo == null ||
        ocorrencia.titulo.length > 200
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Título inválido}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    if (
        ocorrencia.descricao == "" ||
        ocorrencia.descricao == undefined ||
        ocorrencia.descricao == null
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Descrição inválida}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    const niveisValidos = ["baixa", "media", "alta"];
    if (
        ocorrencia.nivel_ocorrencia == undefined ||
        !niveisValidos.includes(ocorrencia.nivel_ocorrencia)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message +=
            "{nivel_ocorrencia inválido: use baixa, media ou alta}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    if (!ocorrencia.cep || !ocorrencia.logradouro || !ocorrencia.bairro || !ocorrencia.numero) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += "{Dados de endereço incompletos}";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }
    
    return false; 
};

module.exports = {
    listarTodasOcorrencias,
    buscarOcorrenciaId,
    buscarOcorrenciaCategoria,
    buscarOcorrenciaUsuario,
    criarNovaOcorrencia,
    excluirOcorrencia,
    validarDadosOcorrencia
}

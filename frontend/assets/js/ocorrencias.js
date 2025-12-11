'use strict'

export async function listarOcorrencias() {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia`
    const response = await fetch(url)
    
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`) // Verifica se deu 404 ou 500
    return response.json()
}

export async function listarOcorrenciaPeloId(id) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/${id}`
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return response.json()
}

export async function listarOcorrenciasDoUsuario(usuarioId) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/usuario/${usuarioId}`
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return response.json()
}

export async function listarOcorrenciaPeloTipo(tipoOcorrencia) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/tipo/${tipoOcorrencia}`
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return response.json()
}

export async function criarOcorrencia(ocorrencia) {
    
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia`

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ocorrencia)
    }
    const response = await fetch(url, options)
    return response.json()

}

export async function atualizarStatusOcorrencia(idOcorrencia, idStatus, idUsuario) {
    const url = `http://localhost:8080/v1/gnn/ocorrencia/${idOcorrencia}/status`
    
    const dados = {
        id_status: parseInt(idStatus),
        id_usuario: idUsuario
    }

    const options = {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    try {
        const response = await fetch(url, options)
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`)
        }
        
        return await response.json()
    } catch (error) {
        console.error('Erro ao atualizar status:', error)
        return false
    }
}
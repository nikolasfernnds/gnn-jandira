'use strict'

export async function listarOcorrencias() {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia`
    //const url = `http://localhost:8080/v1/gnn/ocorrencia`
    const response = await fetch(url)
    
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`) // Verifica se deu 404 ou 500
    return response.json()
}

export async function listarOcorrenciaPeloId(id) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/${id}`
    //const url = `http://localhost:8080/v1/gnn/ocorrencia/${id}`
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return response.json()
}

export async function listarOcorrenciasDoUsuario(usuarioId) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/usuario/${usuarioId}`
    //const url = `http://localhost:8080/v1/gnn/ocorrencia/usuario/${usuarioId}`
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

export async function criarOcorrencia(formData) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia`
    //const url = `http://localhost:8080/v1/gnn/ocorrencia`

    const options = {
        method: 'POST',
        body: formData
    }

    try {
        const response = await fetch(url, options)
        
        if (!response.ok) {
            const erroTexto = await response.text()
            throw new Error(`Erro na API: ${response.status} - ${erroTexto}`)
        }
        
        return await response.json()
    } catch (error) {
        console.error('Erro ao criar ocorrência:', error)
        return false // ou throw error se preferir tratar na tela
    }
}

export async function atualizarStatusOcorrencia(idOcorrencia, idStatus, idUsuario) {
    // const url = `http://localhost:8080/v1/gnn/ocorrencia/${idOcorrencia}/status`
    const url = `https://gnn-jandira.onrender.com/v1/gnn/ocorrencia/${idOcorrencia}/status`
    
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
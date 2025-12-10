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
'use strict'

const BASE_URL = 'https://gnn-jandira.onrender.com/v1/gnn/comentario'

export async function listarComentarios() {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return await response.json()
}

export async function listarComentarioPorId(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return await response.json()
}

export async function criarComentario(comentario) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentario)
    }

    const response = await fetch(BASE_URL, options)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return await response.json()
}

export async function atualizarComentario(id, comentario) {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentario)
    }

    const response = await fetch(`${BASE_URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return await response.json()
}

export async function deletarComentario(id) {
    const options = { method: 'DELETE' }

    const response = await fetch(`${BASE_URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`)
    return await response.json()
}

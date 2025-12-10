'use strict'

export async function listarTodasNoticias() {

    const url = `https://gnn-jandira.onrender.com/v1/gnn/noticia`
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`) // Verifica se deu 404 ou 500
    const dados = response.json()

    return dados

}

export async function listarNoticiaPeloId(id) {

    const url = `https://gnn-jandira.onrender.com/v1/gnn/noticia/${id}`
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`) // Verifica se deu 404 ou 500
    const dados = response.json()

    return dados

}

export async function cadastrarNovaNoticia(noticia){

    const url = `https://gnn-jandira.onrender.com/v1/gnn/noticia`

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticia)
    }
    const response = await fetch(url, options)
    
    const dados = response.json()

    return dados

}

export async function atualizarNoticia(idNoticia, noticia) {
    
    const url = `https://gnn-jandira.onrender.com/v1/gnn/noticia/${idNoticia}`

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticia)
    }
    const response = await fetch(url, options)
    
    const dados = response.json()

    return dados

}
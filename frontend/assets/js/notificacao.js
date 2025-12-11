'use strict'

export async function listarNotificacao() {
    
    const url = `http://localhost:8080/v1/gnn/notificacao`

    const response = await fetch(url)
    if(!response.ok) throw new Error(`Erro na API: ${response.status}`)
    const dados = await response.json()

    return dados
}

export async function listarNotificacaoPeloId(id) {
    
    const url = `http://localhost:8080/v1/gnn/notificacao/${id}`

    const response = await fetch(url)
    if(!response.ok) throw new Error(`Erro na API: ${response.status}`)
    const dados = await response.json()

    return dados
}

export async function listarNotificacoesDoUsuario(idUsuario) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/notificacao-usuario/usuario/${idUsuario}`

    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Erro na API: ${response.status}`)
        return await response.json()
    } catch (error) {
        console.error('Erro ao buscar notificações do usuário:', error)
        return false
    }
}

export async function criarNotificacao(notificacao) {

    const url = `https://gnn-jandira.onrender.com/v1/gnn/notificacao`

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificacao)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Erro na API: ${response.status}`)
    const dados = await response.json()
    return dados
}

export async function atualizarNotificacao(idNotificacao, notificacao) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/notificacao/${idNotificacao}`

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificacao)
    }
    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Erro na API: ${response.status}`)
    const dados = await response.json()
    return dados
}

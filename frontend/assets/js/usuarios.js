'use strict'

export async function autenticarUsuario(login, senha) {

    const url = `https://corsproxy.io/?url=https://gnn-jandira.onrender.com/v1/gnn/usuarios/login`
    const dados = {
        login: login,
        senha: senha
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    const response = await fetch(url, options)
    return response.json()

}

export async function cadastrarUsuario(usuario) {
    const url = `https://corsproxy.io/?url=https://gnn-jandira.onrender.com/v1/gnn/usuarios/cadastro`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }
    const response = await fetch(url, options)
    return response.json()

}

export async function listarUsuario(id) {
    const url = `https://gnn-jandira.onrender.com/v1/gnn/usuarios/perfil/${id}`
    // const url = `http://localhost:8080/v1/gnn/usuarios/perfil/${id}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    return response.json()
}

export async function atualizarUsuario(id, dados) {
    // const url = `http://localhost:8080/v1/gnn/usuarios/${id}`
    const url = `https://corsproxy.io/?url=https://gnn-jandira.onrender.com/v1/gnn/usuarios/${id}`
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    const response = await fetch(url, options)
    console.log(response)
    return response.json()
}



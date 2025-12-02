'use strict'

export async function buscarEndereco(cep) {
    try {
        if (!cep || cep.length !== 8) {
            throw new Error('CEP inválido.')
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        if (!response.ok) {
            throw new Error('Erro na conexão com o serviço.')
        }

        const data = await response.json()

        if (data.erro) {
            throw new Error('CEP não encontrado.')
        }

        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}
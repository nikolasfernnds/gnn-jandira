'use strict'

import { listarUsuario } from '../../assets/js/usuarios.js'
import { atualizarUsuario } from '../../assets/js/usuarios.js'
import { buscarEndereco } from '../../assets/js/viacep.js'

const inputFoto = document.getElementById('input-foto')
const imgPreview = document.getElementById('img-preview')
const containerFoto = document.getElementById('container-foto-perfil')

const inputs = document.querySelectorAll('.informacao-usuario input')
const btnEditar = document.getElementById('btn-editar')
const btnCancelar = document.getElementById('btn-cancelar')
const btnSalvar = document.getElementById('btn-salvar')
const containerEditar = document.getElementById('btn-editar-container')
const containerAcoes = document.getElementById('btns-salvar-cancelar')

const inputCep = document.getElementById('input-cep')
const inputLogradouro = document.getElementById('input-endereco')
const inputNumero = document.getElementById('input-numero')
const inputBairro = document.getElementById('input-bairro')
const inputCidade = document.getElementById('input-cidade')
const inputUf = document.getElementById('input-uf')

let valoresOriginais = {}
let fotoOriginalSrc = ''

function toggleEdicao(ativo) {
    inputs.forEach(input => {
        input.disabled = !ativo
    })

    if (inputFoto) inputFoto.disabled = !ativo

    if (ativo) {
        containerEditar.classList.add('hidden')
        containerAcoes.classList.remove('hidden')

        if (containerFoto) containerFoto.classList.add('editavel')
        if (imgPreview) fotoOriginalSrc = imgPreview.src

        inputs.forEach(input => {
            valoresOriginais[input.id] = input.value
        })
    } else {
        containerEditar.classList.remove('hidden')
        containerAcoes.classList.add('hidden')

        if (containerFoto) containerFoto.classList.remove('editavel')
    }
}

if (inputFoto) {
    inputFoto.addEventListener('change', (e) => {
        const arquivo = e.target.files[0]

        if (arquivo) {
            const leitor = new FileReader()

            leitor.onload = (eventoLoad) => {
                imgPreview.src = eventoLoad.target.result
            }

            leitor.readAsDataURL(arquivo)
        }
    })
}

if (btnEditar) {
    btnEditar.addEventListener('click', () => toggleEdicao(true))
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        inputs.forEach(input => {
            if (valoresOriginais[input.id] !== undefined) {
                input.value = valoresOriginais[input.id]
            }
        })

        if (imgPreview && fotoOriginalSrc) {
            imgPreview.src = fotoOriginalSrc
        }
        
        if (inputFoto) inputFoto.value = ''

        toggleEdicao(false)
    })
}

if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
        toggleEdicao(false)
    })
}

if (inputCep) {
    inputCep.addEventListener('input', (e) => {
        let valor = e.target.value
        valor = valor.replace(/\D/g, '')

        if (valor.length > 8) {
            valor = valor.slice(0, 8)
        }

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2')
        }

        e.target.value = valor
    })

    inputCep.addEventListener('focusout', async () => {
        const cepValor = inputCep.value.replace(/\D/g, '')

        if (cepValor) {
            try {
                const endereco = await buscarEndereco(cepValor)

                if (inputLogradouro) inputLogradouro.value = endereco.logradouro
                if (inputBairro) inputBairro.value = endereco.bairro
                if (inputCidade) inputCidade.value = endereco.localidade
                if (inputUf) inputUf.value = endereco.uf

                if (inputNumero) inputNumero.focus()

            } catch (erro) {
                alert('CEP não encontrado ou inválido.')
                
                if (inputLogradouro) inputLogradouro.value = ''
                if (inputBairro) inputBairro.value = ''
                if (inputCidade) inputCidade.value = ''
                if (inputUf) inputUf.value = ''
            }
        }
    })
}

if (btnSalvar) {
    btnSalvar.addEventListener('click', async () => {
        
        const jsonUser = localStorage.getItem('user')
        const usuarioLogado = JSON.parse(jsonUser)
        const id = usuarioLogado.id_usuario 
        console.log(id)
        const dadosAtualizados = {
            nome_completo: document.getElementById('input-nome').value,
            nickname: usuarioLogado.nickname,
            email: document.getElementById('input-email').value,
            data_nascimento: document.getElementById('input-nasc').value,
            senha: "", 

            endereco: {
                cep: document.getElementById('input-cep').value,
                logradouro: document.getElementById('input-endereco').value,
                numero: document.getElementById('input-numero').value,
                bairro: document.getElementById('input-bairro').value,
                cidade: document.getElementById('input-cidade').value,
                uf: document.getElementById('input-uf').value || "SP"
            }
        }

        
        try {
            const resultado = await atualizarUsuario(id, dadosAtualizados)

            if (resultado.status) {
                alert('Perfil atualizado com sucesso!')
                
                usuarioLogado.nome_completo = dadosAtualizados.nome_completo
                localStorage.setItem('user', JSON.stringify(usuarioLogado))

                toggleEdicao(false) 
            } else {
                alert('Erro ao atualizar: ' + resultado.message)
            }
        } catch (error) {
            console.error(error)
            alert('Erro de comunicação com o servidor.')
        }
    })
}

async function carregarDadosPerfil() {
    const jsonUser = localStorage.getItem('user')
    
    if (!jsonUser) {
        window.location.href = '../login/index.html'
        return
    }

    const usuarioLogado = JSON.parse(jsonUser)
    const id = usuarioLogado.id_usuario

    const resultado = await listarUsuario(id)
    console.log(resultado)

    if (resultado.status) {
        const dados = resultado.itens

        if(document.getElementById('input-nome')) 
            document.getElementById('input-nome').value = dados.nome_completo || ''
        
        if(document.getElementById('input-email')) 
            document.getElementById('input-email').value = dados.email || ''

        if (dados.data_nascimento && document.getElementById('input-nasc')) {
            document.getElementById('input-nasc').value = dados.data_nascimento.split('T')[0]
        }

        if (dados.foto_perfil && document.getElementById('img-preview')) {
            document.getElementById('img-preview').src = dados.foto_perfil
        }
        if (dados.telefone && document.getElementById('input-telefone')){
            document.getElementById('input-telefone').value = dados.telefone || ''
        }

        if(document.getElementById('input-cep')) document.getElementById('input-cep').value = dados.cep || ''
        if(document.getElementById('input-endereco')) document.getElementById('input-endereco').value = dados.logradouro || ''
        if(document.getElementById('input-numero')) document.getElementById('input-numero').value = dados.numero || ''
        if(document.getElementById('input-bairro')) document.getElementById('input-bairro').value = dados.bairro || ''
        if(document.getElementById('input-cidade')) document.getElementById('input-cidade').value = dados.cidade || ''
        if(document.getElementById('input-uf')) document.getElementById('input-uf').value = dados.uf || 'SP'

    } else {
        alert.error("Erro ao buscar dados do perfil:", resultado.message)
    }
}


carregarDadosPerfil()
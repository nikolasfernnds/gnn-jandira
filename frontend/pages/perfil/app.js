'use strict'

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
        console.log('Dados salvos') 
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
                console.error(erro)
                alert('CEP não encontrado ou inválido.')
                
                if (inputLogradouro) inputLogradouro.value = ''
                if (inputBairro) inputBairro.value = ''
                if (inputCidade) inputCidade.value = ''
                if (inputUf) inputUf.value = ''
            }
        }
    })
}
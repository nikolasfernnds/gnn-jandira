'use strict'

import { autenticarUsuario } from '../../assets/js/usuarios.js'
import { cadastrarUsuario } from '../../assets/js/usuarios.js'

function togglePasswordVisibility(inputElement, iconElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text'
        iconElement.classList.replace('fa-eye', 'fa-eye-slash')
    } else {
        inputElement.type = 'password'
        iconElement.classList.replace('fa-eye-slash', 'fa-eye')
    }
}

function createPasswordInput(placeholder, id) {
    const container = document.createElement('div')
    container.classList.add('password-container')

    const input = document.createElement('input')
    input.classList.add('input-cadastro')
    input.placeholder = placeholder
    input.type = 'password'
    input.id = id

    const btnEye = document.createElement('button')
    btnEye.classList.add('btn-eye')
    btnEye.type = 'button'

    const icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-eye')
    btnEye.appendChild(icon)

    btnEye.addEventListener('click', () => togglePasswordVisibility(input, icon))

    container.appendChild(input)
    container.appendChild(btnEye)

    return container
}

function criarModalCadastro() {
    const main = document.getElementById('main')

    const modalCadastroOverlay = document.createElement('div')
    modalCadastroOverlay.classList.add('modal-cadastro-overlay')
    modalCadastroOverlay.id = 'modalCadastroOverlay'

    const modalCadastro = document.createElement('div')
    modalCadastro.classList.add('modal-cadastro')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Criar Conta'
    titulo.style.color = 'var(--text-white)'
    modalCadastro.appendChild(titulo)

    modalCadastroOverlay.appendChild(modalCadastro)
    main.appendChild(modalCadastroOverlay)

    return modalCadastro
}

function criarAreaCadastro(modal) {
    const containerInput = document.createElement('div')
    containerInput.classList.add('container-input')

    const inputsConfig = [
        { placeholder: "Nome completo", type: "text", id: 'nome' },
        { placeholder: "Nome de usuário", type: "text", id: 'nickname' },
        { placeholder: "Email", type: "email", id: 'email' },
        { placeholder: "Data de nascimento", type: "date", id: 'data-nascimento' },
        { placeholder: "Senha", type: "password", id: 'senha' },
        { placeholder: "Confirme a senha", type: "password", id: 'confimacao-senha' }
    ]

    inputsConfig.forEach(dados => {
        if (dados.type === 'password') {

            containerInput.appendChild(createPasswordInput(dados.placeholder, dados.id))
        } else {
            const input = document.createElement('input')
            input.classList.add('input-cadastro')
            input.placeholder = dados.placeholder
            input.type = dados.type
            input.id = dados.id
            containerInput.appendChild(input)
        }
    })

    const containerBotoes = document.createElement('div')
    containerBotoes.classList.add('container-botao')

    const btnCancelar = document.createElement('button')
    btnCancelar.classList.add('btn-cancelar')
    btnCancelar.textContent = 'Cancelar'
    btnCancelar.id = 'btn-cancelar'

    btnCancelar.addEventListener('click', () => {
        const overlay = document.getElementById('modalCadastroOverlay')
        if (overlay) {
            overlay.remove()
        }
    })

    const btnConfirmar = document.createElement('button')
    btnConfirmar.classList.add('btn-cadastre')
    btnConfirmar.textContent = 'Criar Conta'
    btnConfirmar.id = 'btn-confirmar'

    containerBotoes.appendChild(btnCancelar)
    containerBotoes.appendChild(btnConfirmar)

    modal.appendChild(containerInput)
    modal.appendChild(containerBotoes)
}

const btnCadastro = document.getElementById('cadastrar')

if (btnCadastro) {
    btnCadastro.addEventListener('click', (e) => {
        e.preventDefault()
        const modal = criarModalCadastro()
        criarAreaCadastro(modal)
    })
}

const loginSenhaInput = document.getElementById('login-senha')
const loginEyeBtn = document.getElementById('btn-eye-login')

if (loginEyeBtn && loginSenhaInput) {
    const iconLogin = document.createElement('i')
    iconLogin.classList.add('fa-solid', 'fa-eye')
    loginEyeBtn.appendChild(iconLogin)

    loginEyeBtn.addEventListener('click', () => togglePasswordVisibility(loginSenhaInput, iconLogin))
}

const botaoEntrar = document.getElementById('btn-entrar')

botaoEntrar.addEventListener('click', async () => {
    const login = document.getElementById('input-login').value
    const senha = document.getElementById('login-senha').value

    if (!login || !senha) {
        alert('Preencha todos os campos')
        return
    }

    const resultado = await autenticarUsuario(login, senha)

    if (resultado.status) {
        localStorage.setItem('user', JSON.stringify(resultado.itens))
        window.location.href = ('../home/index.html')
    } else {
        alert(resultado.message || 'Erro ao entrar')
    }
})

document.addEventListener('click', async function (e) {
    if (e.target && e.target.id === 'btn-confirmar') {

        const nomeInput = document.getElementById('nome').value
        const nicknameInput = document.getElementById('nickname').value
        const emailInput = document.getElementById('email').value
        const dataNascimentoInput = document.getElementById('data-nascimento').value
        const senhaInput = document.getElementById('senha').value
        const confirmacaoSenhaInput = document.getElementById('confimacao-senha').value

        const usuario = {
            nome_completo: nomeInput,
            nickname: nicknameInput,
            email: emailInput,
            senha: senhaInput,
            data_nascimento: dataNascimentoInput,
        }

        const resultado = await cadastrarUsuario(usuario)

        if (resultado.status) {
        localStorage.setItem('user', JSON.stringify(resultado.itens))
        window.location.href = ('../home/index.html')
    } else {
        alert(resultado.message || 'Erro ao entrar')
    }
    }
})

'use strict'

function criarModalCadastro(){

    const main = document.getElementById('main')

    const modalCadastro = document.createElement('div')
    modalCadastro.classList.add('modal-cadastro')

    console.log('hjklfjksmjk')

    const teste = document.createElement('p')
    teste.textContent = '12323jnf'


    main.appendChild(modalCadastro)

}

// criarModalCadastro()
const btnCadastro = document.getElementById('cadastrar')

btnCadastro.addEventListener('click', () => {
    criarModalCadastro()
})
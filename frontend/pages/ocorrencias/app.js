'use strict'

const btnFeed = document.getElementById('btn-feed')
const btnMinhas = document.getElementById('btn-minhas')
const viewFeed = document.getElementById('view-feed')
const viewMinhas = document.getElementById('view-minhas')

function mostrarFeed() {
    btnFeed.classList.add('active')
    btnMinhas.classList.remove('active')

    viewFeed.classList.remove('hidden')
    viewMinhas.classList.add('hidden')
}

function mostrarMinhas() {
    btnMinhas.classList.add('active')
    btnFeed.classList.remove('active')

    viewMinhas.classList.remove('hidden')
    viewFeed.classList.add('hidden')
}


const modalOverlay = document.getElementById('modal-ocorrencia-overlay')
const btnNovaOcorrencia = document.getElementById('btn-nova-ocorrencia')
const btnFecharModal = document.getElementById('btn-fechar-modal')

if(btnNovaOcorrencia) {
    btnNovaOcorrencia.addEventListener('click', () => {
        modalOverlay.classList.add('active')
    })
}

if(btnFecharModal) {
    btnFecharModal.addEventListener('click', (e) => {
        e.preventDefault() 
        modalOverlay.classList.remove('active')
    })
}

if(modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active')
        }
    })
}

const btnCancelar = document.getElementById('btn-cancelar');

if(btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        modalOverlay.classList.remove('active')
    })
}

btnFeed.addEventListener('click', mostrarFeed)
btnMinhas.addEventListener('click', mostrarMinhas)
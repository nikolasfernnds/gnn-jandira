'use strict'

import { buscarEndereco } from '../../assets/js/viacep.js'
import {
    listarOcorrencias,
    listarOcorrenciasDoUsuario,
    listarOcorrenciaPeloId,
    criarOcorrencia
} from '../../assets/js/ocorrencias.js'

const botaoFeed = document.getElementById('btn-feed')
const botaoMinhas = document.getElementById('btn-minhas')
const containerFeed = document.getElementById('view-feed')
const containerMinhas = document.getElementById('view-minhas')
const containerListaMinhas = document.getElementById('container-lista-minhas')

const btnFiltroTodas = document.getElementById('btn-filtro-todas')
const btnFiltroAtivas = document.getElementById('btn-filtro-ativas')
const btnFiltroEncerradas = document.getElementById('btn-filtro-encerradas')

const entradaCep = document.getElementById('input-cep')
const entradaLogradouro = document.getElementById('input-logradouro')
const entradaBairro = document.getElementById('input-bairro')
const entradaCidade = document.getElementById('input-cidade')
const entradaUf = document.getElementById('input-uf')
const entradaNumero = document.getElementById('input-numero')

const modalOverlay = document.getElementById('modal-ocorrencia-overlay')
const btnOpenModal = document.getElementById('btn-nova-ocorrencia')
const btnCloseModal = document.getElementById('btn-fechar-modal')
const btnCancelModal = document.getElementById('btn-cancelar')
const fileInput = document.getElementById('file-input')
const imgPreview = document.getElementById('image-preview')
const previewLabel = document.getElementById('preview-label')

const modalDetalhesOverlay = document.getElementById('modal-detalhes-overlay')
const btnFecharDetalhes = document.getElementById('btn-fechar-detalhes')
const detalheTitulo = document.getElementById('detalhe-titulo')
const detalheStatus = document.getElementById('detalhe-status')
const detalheData = document.getElementById('detalhe-data')
const detalheDescricao = document.getElementById('detalhe-descricao')
const detalheEndereco = document.getElementById('detalhe-endereco')
const detalheImgContainer = document.getElementById('detalhe-img-container')
const detalheFoto = document.getElementById('detalhe-foto')
const listaHistorico = document.getElementById('lista-historico')
const painelHistorico = document.getElementById('painel-historico')
const painelComentarios = document.getElementById('painel-comentarios')
const tabHistorico = document.getElementById('tab-historico')
const tabComentarios = document.getElementById('tab-comentarios')
const inputComentario = document.getElementById('input-comentario')

let minhasOcorrenciasCache = []

const mapaCategorias = {
    1: 'Pavimentação / Buraco',
    2: 'Iluminação Pública',
    3: 'Limpeza / Lixo',
    4: 'Água e Esgoto'
}

const mapaStatus = {
    1: 'status-vermelho',
    2: 'status-amarelo',
    3: 'status-verde'
}

const mapaStatusTexto = {
    1: 'Pendente',
    2: 'Em Análise',
    3: 'Resolvido'
}

function criarElemento(tag, classe, texto = '') {
    const elemento = document.createElement(tag)
    if (classe) elemento.classList.add(classe)
    if (texto) elemento.textContent = texto
    return elemento
}

function criarMensagemErro(mensagem) {
    const div = criarElemento('div', 'erro-container')
    div.style.color = 'var(--text-white)'
    div.style.textAlign = 'center'
    div.style.padding = '20px'
    div.style.width = '100%'
    div.style.gridColumn = '1 / -1'
    div.textContent = mensagem
    return div
}

function formatarData(dataIso) {
    if (!dataIso) return 'DATA INDISP.'
    const data = new Date(dataIso)
    if (isNaN(data.getTime())) return 'DATA INVÁLIDA'
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function obterClasseStatus(idStatus) {
    return mapaStatus[idStatus] || 'status-amarelo'
}

function obterTextoStatus(idStatus) {
    return mapaStatusTexto[idStatus] || 'Desconhecido'
}

function obterTextoTipo(idCategoria) {
    return mapaCategorias[idCategoria] || 'Ocorrência Geral'
}

function criarItemHistorico(data, texto) {
    const li = criarElemento('li', 'timeline-item')
    const spanData = criarElemento('span', 'timeline-data', data)
    const pTexto = criarElemento('p', 'timeline-texto', texto)

    li.append(spanData, pTexto)
    return li
}

function criarCardOcorrencia(ocorrencia) {
    const card = criarElemento('article', 'card-ocorrencia')

    card.addEventListener('click', () => abrirModalDetalhes(ocorrencia.id_ocorrencia))

    const divStatus = criarElemento('div', 'status-indicator')
    divStatus.classList.add(obterClasseStatus(ocorrencia.id_status))

    const divContent = criarElemento('div', 'card-content')

    const divHeader = criarElemento('div', 'card-header')
    const spanTag = criarElemento('span', 'card-tag', obterTextoTipo(ocorrencia.id_categoria_ocorrencia))
    const spanDate = criarElemento('span', 'card-date', formatarData(ocorrencia.data_registro))
    divHeader.append(spanTag, spanDate)

    const h3Title = criarElemento('h3', 'card-title', ocorrencia.titulo || 'Sem título')
    const pLocation = criarElemento('p', 'card-location', ocorrencia.bairro || ocorrencia.cidade || 'Localização não informada')

    divContent.append(divHeader, h3Title, pLocation)
    card.append(divStatus, divContent)

    return card
}

async function carregarFeed() {
    try {
        const resposta = await listarOcorrencias()
        const listaOcorrencias = resposta.itens?.ocorrencia || []

        if (!Array.isArray(listaOcorrencias)) throw new Error('Dados inválidos')

        const fragmento = document.createDocumentFragment()
        listaOcorrencias.forEach(oc => {
            fragmento.appendChild(criarCardOcorrencia(oc))
        })

        containerFeed.replaceChildren(fragmento)

    } catch (erro) {
        containerFeed.replaceChildren(criarMensagemErro('Não foi possível carregar o feed.'))
    }
}

async function carregarMinhasOcorrencias() {
    let idUsuario = null
    try {
        const userStorage = localStorage.getItem('user')
        if (userStorage) idUsuario = JSON.parse(userStorage).id_usuario
    } catch (erro) { }

    if (!idUsuario) {
        containerListaMinhas.replaceChildren(criarMensagemErro('Faça login para ver suas ocorrências.'))
        return
    }

    try {
        const resposta = await listarOcorrenciasDoUsuario(idUsuario)
        minhasOcorrenciasCache = resposta.itens?.ocorrencia || []

        if (!Array.isArray(minhasOcorrenciasCache)) throw new Error('Dados inválidos')

        if (minhasOcorrenciasCache.length === 0) {
            containerListaMinhas.replaceChildren(criarMensagemErro('Nenhuma ocorrência encontrada.'))
            return
        }

        filtrarEExibirMinhas('todas')

    } catch (erro) {
        containerListaMinhas.replaceChildren(criarMensagemErro('Erro ao buscar suas ocorrências ou nenhuma encontrada.'))
    }
}

function filtrarEExibirMinhas(filtro) {
    let listaFiltrada = []

    if (filtro === 'todas') {
        listaFiltrada = minhasOcorrenciasCache
    } else if (filtro === 'ativas') {
        listaFiltrada = minhasOcorrenciasCache.filter(o => o.id_status === 1 || o.id_status === 2)
    } else if (filtro === 'encerradas') {
        listaFiltrada = minhasOcorrenciasCache.filter(o => o.id_status === 3)
    }

    [btnFiltroTodas, btnFiltroAtivas, btnFiltroEncerradas].forEach(btn => btn.classList.remove('active'))

    if (filtro === 'todas') btnFiltroTodas.classList.add('active')
    if (filtro === 'ativas') btnFiltroAtivas.classList.add('active')
    if (filtro === 'encerradas') btnFiltroEncerradas.classList.add('active')

    if (listaFiltrada.length === 0) {
        containerListaMinhas.replaceChildren(criarMensagemErro('Nenhuma ocorrência neste filtro.'))
    } else {
        const fragmento = document.createDocumentFragment()
        listaFiltrada.forEach(oc => {
            fragmento.appendChild(criarCardOcorrencia(oc))
        })
        containerListaMinhas.replaceChildren(fragmento)
    }
}

async function abrirModalDetalhes(id) {
    try {
        const resposta = await listarOcorrenciaPeloId(id)
        const dados = resposta.itens?.ocorrencia?.[0] || resposta.itens?.ocorrencia || resposta

        detalheTitulo.textContent = dados.titulo
        detalheDescricao.textContent = dados.descricao
        detalheData.textContent = formatarData(dados.data_registro)

        detalheStatus.textContent = obterTextoStatus(dados.id_status)
        detalheStatus.className = 'tag-status'
        detalheStatus.classList.add(obterClasseStatus(dados.id_status))
        detalheStatus.style.backgroundColor = `var(--${obterClasseStatus(dados.id_status)})`

        const enderecoCompleto = `${dados.logradouro}, ${dados.numero} - ${dados.bairro}, ${dados.cidade}`
        detalheEndereco.textContent = enderecoCompleto



        if (dados.imagem_url) {
            detalheFoto.src = dados.imagem_url
            detalheImgContainer.classList.remove('hidden')
        } else {
            detalheFoto.src = ''
            detalheImgContainer.classList.add('hidden')
        }

        const itemCriacao = criarItemHistorico(formatarData(dados.data_registro), 'Ocorrência registrada no sistema.')
        listaHistorico.replaceChildren(itemCriacao)



        modalDetalhesOverlay.classList.add('active')
        document.body.classList.add('no-scroll')

    } catch (erro) {
        alert('Erro ao carregar detalhes.')
    }
}

function fecharModalDetalhes() {
    modalDetalhesOverlay.classList.remove('active')
    document.body.classList.remove('no-scroll')
}

function abrirModalRegistrar() {
    modalOverlay.classList.add('active')
    document.body.classList.add('no-scroll')
}

function fecharModalRegistrar() {
    modalOverlay.classList.remove('active')
    document.body.classList.remove('no-scroll')

    const inputs = document.querySelectorAll('.modal-form input, .modal-form select')
    inputs.forEach(input => input.value = '')
    imgPreview.src = ''
    imgPreview.classList.add('hidden')
    previewLabel.style.display = 'flex'
}

function exibirFeed() {
    botaoFeed.classList.add('active')
    botaoMinhas.classList.remove('active')
    containerFeed.classList.remove('hidden')
    containerMinhas.classList.add('hidden')
}

function exibirMinhas() {
    botaoMinhas.classList.add('active')
    botaoFeed.classList.remove('active')
    containerMinhas.classList.remove('hidden')
    containerFeed.classList.add('hidden')
    carregarMinhasOcorrencias()
}

function handleImagePreview(e) {
    const arquivo = e.target.files[0]
    if (arquivo) {
        const leitor = new FileReader()
        leitor.onload = (eventoLoad) => {
            imgPreview.src = eventoLoad.target.result
            imgPreview.classList.remove('hidden')
            previewLabel.style.display = 'none'
        }
        leitor.readAsDataURL(arquivo)
    }
}

function formatarEntradaCep(e) {
    let valor = e.target.value.replace(/\D/g, '')
    if (valor.length > 8) valor = valor.slice(0, 8)
    if (valor.length > 5) valor = valor.replace(/^(\d{5})(\d)/, '$1-$2')
    e.target.value = valor
}

async function buscarCepAoSairDoFoco() {
    const cepValor = entradaCep.value.replace(/\D/g, '')
    if (cepValor.length === 8) {
        try {
            const endereco = await buscarEndereco(cepValor)
            if (entradaLogradouro) entradaLogradouro.value = endereco.logradouro
            if (entradaBairro) entradaBairro.value = endereco.bairro
            if (entradaCidade) entradaCidade.value = endereco.localidade
            if (entradaUf) entradaUf.value = endereco.uf
            if (entradaNumero) entradaNumero.focus()
        } catch (erro) {
            alert('CEP não encontrado ou inválido.')
        }
    }
}

if (botaoFeed) botaoFeed.addEventListener('click', exibirFeed)
if (botaoMinhas) botaoMinhas.addEventListener('click', exibirMinhas)

if (btnOpenModal) btnOpenModal.addEventListener('click', abrirModalRegistrar)
if (btnCloseModal) btnCloseModal.addEventListener('click', (e) => { e.preventDefault(); fecharModalRegistrar() })
if (btnCancelModal) btnCancelModal.addEventListener('click', fecharModalRegistrar)
if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) fecharModalRegistrar() })
if (fileInput) fileInput.addEventListener('change', handleImagePreview)

if (entradaCep) {
    entradaCep.addEventListener('input', formatarEntradaCep)
    entradaCep.addEventListener('focusout', buscarCepAoSairDoFoco)
}

if (btnFecharDetalhes) btnFecharDetalhes.addEventListener('click', fecharModalDetalhes)
if (modalDetalhesOverlay) modalDetalhesOverlay.addEventListener('click', (e) => { if (e.target === modalDetalhesOverlay) fecharModalDetalhes() })

if (btnFiltroTodas) btnFiltroTodas.addEventListener('click', () => filtrarEExibirMinhas('todas'))
if (btnFiltroAtivas) btnFiltroAtivas.addEventListener('click', () => filtrarEExibirMinhas('ativas'))
if (btnFiltroEncerradas) btnFiltroEncerradas.addEventListener('click', () => filtrarEExibirMinhas('encerradas'))

if (tabHistorico) {
    tabHistorico.addEventListener('click', () => {
        tabHistorico.classList.add('active')
        tabComentarios.classList.remove('active')
        painelHistorico.classList.remove('hidden')
        painelComentarios.classList.add('hidden')
    })
}
if (tabComentarios) {
    tabComentarios.addEventListener('click', () => {
        inputComentario.classList.remove('hidden')
        tabComentarios.classList.add('active')
        tabHistorico.classList.remove('active')
        painelComentarios.classList.remove('hidden')
        painelHistorico.classList.add('hidden')
    })
}

document.addEventListener('DOMContentLoaded', carregarFeed)
'use strict'

import {
    listarTodasNoticias,
    listarNoticiaPeloId,
    cadastrarNovaNoticia,
    atualizarNoticia
} from '../../assets/js/noticias.js'

const containerNoticia = document.getElementById('grid-noticia')
const modalDetalhesOverlay = document.getElementById('modal-detalhes-overlay')
const detalheTitulo = document.getElementById('detalhe-titulo')
const detalheDescricao = document.getElementById('detalhe-descricao')
const detalheData = document.getElementById('detalhe-data')
const detalheEndereco = document.getElementById('detalhe-endereco')
const detalheImgContainer = document.getElementById('detalhe-img-container')
const detalheFoto = document.getElementById('detalhe-foto')
const btnFecharDetalhes = document.getElementById('btn-fechar-detalhes')

const destaqueContainer = document.getElementById('destaque-container')
const destaqueTitulo = document.getElementById('destaque-titulo')
const destaqueData = document.getElementById('destaque-data')
const destaqueImagem = document.getElementById('destaque-imagem')
const destaqueTexto = document.getElementById('destaque-texto')

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

async function abrirModalDetalhes(id) {
    try {
        const resposta = await listarNoticiaPeloId(id)
        const dados = resposta.itens?.noticia?.[0] || resposta.itens?.noticia || resposta

        detalheTitulo.textContent = dados.titulo
        detalheDescricao.textContent = dados.conteudo
        detalheData.textContent = formatarData(dados.data_publicacao)
        detalheData.classList.add('detalhe-data')

        if (dados.imagem_url) {
            detalheFoto.src = '../../assets/img/teste.webp'
            detalheImgContainer.classList.remove('hidden')
        } else {
            detalheFoto.src = '../../assets/img/teste.webp'
            detalheImgContainer.classList.add('hidden')
        }



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

function criarCardNoticia(noticia) {

    const card = criarElemento('article', 'card-noticia')

    card.addEventListener('click', () => abrirModalDetalhes(noticia.id_noticia))

    const divImg = criarElemento('div', 'card-img')

    const divInfoCard = criarElemento('div', 'info-card-noticia')

    const spanData = criarElemento('span', 'data-badge-card', formatarData(noticia.data_publicacao))
    const imgNoticia = criarElemento('img')
    imgNoticia.src = '../../assets/img/teste.webp'
    divImg.appendChild(spanData)
    divImg.appendChild(imgNoticia)

    const tituloNoticia = criarElemento('h3', 'card-noticia-titulo', noticia.titulo || 'Erro ao carregar o titulo')
    const textoOriginal = noticia.conteudo || noticia.descricao || 'Sem conteúdo'
    const textoResumido = textoOriginal.length > 100 ? textoOriginal.substring(0, 100) + '...' : textoOriginal

    const textoNoticia = criarElemento('p', 'noticia', textoResumido)

    divInfoCard.appendChild(tituloNoticia)
    divInfoCard.appendChild(textoNoticia)

    card.appendChild(divImg)
    card.appendChild(divInfoCard)

    return card
}

async function carregarNoticias() {

    try {
        const resposta = await listarTodasNoticias()
        const todasNoticias = resposta.itens?.noticias || resposta.itens?.noticia || []
        console.log(todasNoticias)
        if (!Array.isArray(todasNoticias)) throw new Error('Dados inválidos')

        if (todasNoticias.length === 0) {
            containerNoticia.replaceChildren(criarMensagemErro('Nenhuma notícia encontrada.'))
            const sessaoPrincipal = document.getElementById('noticia-principal')
            if(sessaoPrincipal) sessaoPrincipal.style.display = 'none'
            return
        }

        
        const indiceAleatorio = Math.floor(Math.random() * todasNoticias.length)
        
        const noticiaDestaque = todasNoticias[indiceAleatorio]
        
        preencherNoticiaPrincipal(noticiaDestaque)

        const listaGrid = todasNoticias.filter(n => n !== noticiaDestaque)

        const fragmento = document.createDocumentFragment()
        listaGrid.forEach(noticia => {
            fragmento.appendChild(criarCardNoticia(noticia))
        })

        containerNoticia.replaceChildren(fragmento)

    } catch (erro) {
        console.error(erro)
        containerNoticia.replaceChildren(criarMensagemErro('Não foi possível carregar o feed.'))
    }

}

function preencherNoticiaPrincipal(noticia){

    if(!noticia)
        return

    if (destaqueTitulo)
        destaqueTitulo.textContent = noticia.titulo
    if (destaqueData)
        destaqueData.textContent = formatarData(noticia.data_publicacao)
    if(destaqueImagem)
        destaqueImagem.src = '../../assets/img/teste.webp'

    if (destaqueTexto) {
        const textoOriginal = noticia.conteudo || noticia.descricao || ''
        const textoResumido = textoOriginal.length > 200 ? textoOriginal.substring(0, 200) + '...' : textoOriginal
        destaqueTexto.textContent = textoResumido
    }

    if (destaqueContainer) {
        const novoContainer = destaqueContainer.cloneNode(true)
        destaqueContainer.parentNode.replaceChild(novoContainer, destaqueContainer)
        
        novoContainer.addEventListener('click', () => abrirModalDetalhes(noticia.id_noticia))
        
    }

}

if (btnFecharDetalhes) btnFecharDetalhes.addEventListener('click', fecharModalDetalhes)
if (modalDetalhesOverlay) modalDetalhesOverlay.addEventListener('click', (e) => { if (e.target === modalDetalhesOverlay) fecharModalDetalhes() })


document.addEventListener('DOMContentLoaded', carregarNoticias)
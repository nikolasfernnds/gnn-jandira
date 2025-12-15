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

const modalNoticia = document.getElementById('modal-noticia-overlay')
const btnAbrirModal = document.getElementById('btn-nova-noticia')
const btnFecharModal = document.getElementById('btn-fechar-noticia')
const btnCancelar = document.getElementById('btn-cancelar-noticia')
const btnPublicar = document.getElementById('btn-publicar-noticia')

const fileInput = document.getElementById('file-input-noticia')
const imgPreview = document.getElementById('image-preview-noticia')
const labelPreview = document.getElementById('preview-label-noticia')
const inputTitulo = document.getElementById('noticia-titulo')
const selectCategoria = document.getElementById('noticia-categoria')
const inputConteudo = document.getElementById('noticia-conteudo')

const destaqueContainer = document.getElementById('destaque-container')
const destaqueTitulo = document.getElementById('destaque-titulo')
const destaqueData = document.getElementById('destaque-data')
const destaqueImagem = document.getElementById('destaque-imagem')
const destaqueTexto = document.getElementById('destaque-texto')

function verificarAdmin() {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
        const user = JSON.parse(userStorage)
        if (user.perfil === 'admin') {
            const adminControls = document.getElementById('admin-controls')
            if (adminControls) adminControls.classList.remove('hidden')
        }
    }
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

async function abrirModalDetalhes(id) {
    try {
        const resposta = await listarNoticiaPeloId(id)
        const dados = resposta.itens?.noticia?.[0] || resposta.itens?.noticia || resposta

        detalheTitulo.textContent = dados.titulo
        detalheDescricao.textContent = dados.conteudo 
        detalheData.textContent = formatarData(dados.data_publicacao)
        detalheData.classList.add('detalhe-data')

        const foto = dados.foto_capa || dados.imagem_capa || dados.imagem_url

        if (foto) {
            detalheFoto.src = foto
            detalheImgContainer.classList.remove('hidden')
        } else {
            detalheFoto.src = '../../assets/img/teste.webp'
        }

        const elemConteudo = document.getElementById('detalhe-conteudo')
        if (elemConteudo) elemConteudo.textContent = dados.conteudo

        const containerComentarios = document.getElementById('area-comentarios-noticia')
        renderizarAvisoEmBreve(containerComentarios)

        modalDetalhesOverlay.classList.add('active')
        document.body.classList.add('no-scroll')

    } catch (erro) {
        console.error(erro) 
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
    imgNoticia.src = noticia.foto_capa || noticia.imagem_capa || '../../assets/img/teste.webp'
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
        if (!Array.isArray(todasNoticias)) throw new Error('Dados inválidos')

        if (todasNoticias.length === 0) {
            containerNoticia.replaceChildren(criarMensagemErro('Nenhuma notícia encontrada.'))
            const sessaoPrincipal = document.getElementById('noticia-principal')
            if (sessaoPrincipal) sessaoPrincipal.style.display = 'none'
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

function preencherNoticiaPrincipal(noticia) {

    if (!noticia)
        return

    if (destaqueTitulo)
        destaqueTitulo.textContent = noticia.titulo
    if (destaqueData)
        destaqueData.textContent = formatarData(noticia.data_publicacao)
    if (destaqueImagem)
        destaqueImagem.src = noticia.foto_capa || noticia.imagem_capa || '../../assets/img/teste.webp'
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

function abrirModal() {
    modalNoticia.classList.add('active')
    document.body.classList.add('no-scroll')
}

function fecharModal(e) {
    if (e) e.preventDefault()

    if (modalNoticia) {
        modalNoticia.classList.remove('active')
        document.body.classList.remove('no-scroll')
    }

    try {
        limparFormulario();
    } catch (erro) {
        console.warn('Aviso: Não foi possível limpar todos os campos do form.', erro)
    }
}

function limparFormulario() {
    if (inputTitulo) inputTitulo.value = ''
    if (selectCategoria) selectCategoria.value = ''
    if (inputConteudo) inputConteudo.value = ''
    if (fileInput) fileInput.value = ''

    if (imgPreview) {
        imgPreview.src = ''
        imgPreview.classList.add('hidden')
    }
    if (labelPreview) {
        labelPreview.style.display = 'flex'
    }
}

function renderizarAvisoEmBreve(container) {
    if (!container) return

    container.textContent = ''

    const avisoBox = document.createElement('div')
    avisoBox.style.display = 'flex'
    avisoBox.style.flexDirection = 'column'
    avisoBox.style.alignItems = 'center'
    avisoBox.style.justifyContent = 'center'
    avisoBox.style.padding = '30px 10px'
    avisoBox.style.backgroundColor = 'rgba(0,0,0,0.2)'
    avisoBox.style.borderRadius = '8px'
    avisoBox.style.marginTop = '20px'

    const icone = document.createElement('i')
    icone.className = 'fas fa-comments'
    icone.style.fontSize = '2rem'
    icone.style.marginBottom = '15px'
    icone.style.color = 'var(--amarelo-favo)'
    icone.style.opacity = '0.7'

    const titulo = document.createElement('h4')
    titulo.textContent = 'Comentários da Comunidade'
    titulo.style.color = '#fff'
    titulo.style.marginBottom = '8px'
    titulo.style.fontSize = '1.1rem'

    const texto = document.createElement('p')
    texto.textContent = 'A funcionalidade de comentários para notícias está sendo preparada. Em breve você poderá debater este assunto aqui!'
    texto.style.color = '#aaa'
    texto.style.textAlign = 'center'
    texto.style.fontSize = '0.9rem'
    texto.style.maxWidth = '300px'

    avisoBox.appendChild(icone)
    avisoBox.appendChild(titulo)
    avisoBox.appendChild(texto)

    container.appendChild(avisoBox)
}

if (btnAbrirModal) {
    btnAbrirModal.addEventListener('click', () => {
        modalNoticia.classList.add('active')
        document.body.classList.add('no-scroll')
    })
}

if (btnFecharModal) {
    btnFecharModal.addEventListener('click', (e) => {
        e.preventDefault()
        modalDetalhesOverlay.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const arquivo = e.target.files[0]
        if (arquivo) {
            const reader = new FileReader()
            reader.onload = (evt) => {
                imgPreview.src = evt.target.result
                imgPreview.classList.remove('hidden')
                labelPreview.style.display = 'none'
            }
            reader.readAsDataURL(arquivo)
        }
    })
}

if (btnPublicar) {
    btnPublicar.addEventListener('click', async () => {
        if (!inputTitulo.value || !selectCategoria.value || !inputConteudo.value) {
            alert('Preencha todos os campos obrigatórios!')
            return
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Escolha uma imagem de capa para a notícia.')
            return
        }

        const userStorage = JSON.parse(localStorage.getItem('user') || '{}')
        const idUsuario = userStorage.id_usuario || 1

        const formData = new FormData()
        formData.append('id_autor', idUsuario)
        formData.append('titulo', inputTitulo.value)
        formData.append('id_categoria_noticia', selectCategoria.value)
        formData.append('conteudo', inputConteudo.value)
        formData.append('foto_capa', fileInput.files[0])

        const textoOriginal = btnPublicar.textContent
        btnPublicar.textContent = 'Publicando...'
        btnPublicar.disabled = true

        try {
            const resultado = await cadastrarNovaNoticia(formData)

            if (resultado && (resultado.status || resultado.status_code === 201)) {
                alert('Notícia publicada com sucesso!')
                fecharModal()
                window.location.reload()
            } else {
                alert('Erro ao publicar: ' + (resultado.message || 'Erro desconhecido'))
            }
        } catch (error) {
            console.error(error)
            alert('Erro de comunicação com o servidor.')
        } finally {
            btnPublicar.textContent = textoOriginal
            btnPublicar.disabled = false
        }
    })
}

if (btnFecharDetalhes) btnFecharDetalhes.addEventListener('click', fecharModal)
if (btnFecharModal) {
    btnFecharModal.addEventListener('click', fecharModal)
}

if (btnCancelar) {
    btnCancelar.addEventListener('click', fecharModal);
} if (modalDetalhesOverlay) modalDetalhesOverlay.addEventListener('click', (e) => { if (e.target === modalDetalhesOverlay) fecharModalDetalhes() })


document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias()
    verificarAdmin()
})
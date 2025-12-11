'use strict'

import { listarNotificacao, listarNotificacaoPeloId } from "./notificacao.js"

const DEVELOPERS_DATA = [
    {
        nome: 'Gabryel Fillipe',
        funcao: 'Front-end & UI Design',
        github: 'https://github.com/GabryelFillipe',
        linkedin: 'https://www.linkedin.com/in/gabryel-fillipe/'
    },
    {
        nome: 'Nicolas Durão',
        funcao: 'Back-end & API',
        github: 'https://github.com/nicolas16-sd',
        linkedin: 'https://www.linkedin.com/in/nicolas-durao/'
    },
    {
        nome: 'Nikolas Fernandes',
        funcao: 'Database & DevOps',
        github: 'https://github.com/nikolasfernnds',
        linkedin: 'https://www.linkedin.com/in/nikolasfernnds/'
    }
]

const LINKS = [
    { text: 'Início', href: '../../pages/home/index.html' },
    { text: 'Ocorrências', href: '../../pages/ocorrencias/index.html' },
    { text: 'Perfil', href: '../../pages/perfil/index.html' },
    { text: 'Sair', href: '../../pages/login/index.html', style: 'color: var(--status-vermelho)' }
]

const MOCK_NOTIFICACOES = [
    {
        titulo: 'Status Atualizado',
        mensagem: 'Sua ocorrência "Buraco na rua" mudou para "Em Análise".',
        data: 'Hoje, 14:30',
        lida: false
    },
    {
        titulo: 'Comentário Respondido',
        mensagem: 'A prefeitura respondeu ao seu comentário na ocorrência #123.',
        data: 'Ontem',
        lida: true
    },
    {
        titulo: 'Ocorrência Finalizada',
        mensagem: 'A lâmpada da praça foi trocada com sucesso.',
        data: '05/12/2025',
        lida: true
    }
]

function toggleNavbar() {
    const existingNavbar = document.getElementById('navbar')

    if (existingNavbar) {
        existingNavbar.remove()
        return
    }

    const nav = document.createElement('nav')
    nav.id = 'navbar'
    nav.classList.add('sidebar-menu')

    const menuHeader = document.createElement('div')
    menuHeader.classList.add('menu-header')

    const userInfo = document.createElement('div')
    userInfo.classList.add('menu-user-info')

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('menu-avatar-container')

    const userImg = document.createElement('img')
    userImg.src = '../../assets/img/teste.webp'
    userImg.classList.add('menu-avatar')

    imgContainer.appendChild(userImg)

    const userStorage = localStorage.getItem('user')

    const usuario = userStorage ? JSON.parse(userStorage) : null

    const nomeUsuario = usuario ? usuario.nickname : 'Visitante'

    const userName = document.createElement('span')
    userName.textContent = `Olá, ${nomeUsuario}`
    userName.classList.add('menu-username')

    userInfo.appendChild(imgContainer)
    userInfo.appendChild(userName)

    const btnClose = document.createElement('button')
    btnClose.textContent = '✖'
    btnClose.classList.add('btn-close-menu')
    btnClose.addEventListener('click', toggleNavbar)

    menuHeader.appendChild(userInfo)
    menuHeader.appendChild(btnClose)

    const ul = document.createElement('ul')
    ul.classList.add('menu-list')

    LINKS.forEach(link => {
        const li = document.createElement('li')
        const a = document.createElement('a')

        a.textContent = link.text
        a.href = link.href
        a.classList.add('menu-link')

        const caminhoAtual = window.location.pathname

        if (a.pathname === caminhoAtual) {
            a.classList.add('active')
        }

        if (link.style) {
            a.style = link.style
        }

        li.appendChild(a)
        ul.appendChild(li)
    })

    nav.appendChild(menuHeader)
    nav.appendChild(ul)

    document.body.appendChild(nav)
}

function formatarData(dataIso) {
    if (!dataIso) return 'DATA INDISP.'
    const data = new Date(dataIso)
    if (isNaN(data.getTime())) return 'DATA INVÁLIDA'
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function createLink(href, iconSrc, text) {
    const link = document.createElement('a')
    link.classList.add('dev-links')
    link.href = href
    link.target = '_blank'

    const icon = document.createElement('img')
    icon.src = iconSrc
    icon.alt = text

    const span = document.createElement('span')
    span.textContent = text

    link.appendChild(icon)
    link.appendChild(span)

    return link
}

function createHeader() {
    const header = document.getElementById('header')

    const perfilIcons = document.createElement('div')
    perfilIcons.classList.add('perfil-icons')

    const profileImg = document.createElement('img')
    profileImg.classList.add('header-icon')
    profileImg.src = '../../assets/img/profile.svg'
    profileImg.addEventListener('click', () => {
        window.location.href = '../../pages/perfil/index.html'
    })


    const gnnLogo = document.createElement('img')
    gnnLogo.classList.add('header-icon')
    gnnLogo.classList.add('logo-icon')
    gnnLogo.src = '../../assets/img/logoGNNJandira.png'
    gnnLogo.addEventListener('click', () => {
        window.location.href = '../../pages/home/index.html'
    })


    const gnnContainer = document.createElement('div')
    gnnContainer.classList.add('gnn-container')

    const gnn = document.createElement('h1')
    gnn.classList.add('titulo')
    gnn.textContent = 'GNN Jandira'

    const menuIcons = document.createElement('div')
    menuIcons.classList.add('menu-icons')

    const notifyIcon = document.createElement('img')
    notifyIcon.classList.add('header-icon')
    notifyIcon.classList.add('notify-icon')
    notifyIcon.src = '../../assets/img/notificaçãoIcon.png'

    notifyIcon.addEventListener('click', () => {
        const modal = createNotifyModal()
        createModalArea(modal) 
    })

    const menuImg = document.createElement('img')
    menuImg.classList.add('header-icon')
    menuImg.src = '../../assets/img/menuIcon.png'

    menuImg.style.cursor = 'pointer'
    menuImg.addEventListener('click', () => {
        toggleNavbar()
    })

    perfilIcons.appendChild(gnnLogo)
    perfilIcons.appendChild(profileImg)

    gnnContainer.appendChild(gnn)

    menuIcons.appendChild(notifyIcon)
    menuIcons.appendChild(menuImg)

    header.appendChild(perfilIcons)
    header.appendChild(gnnContainer)
    header.appendChild(menuIcons)

}

function createFooter() {
    const footer = document.createElement('footer')
    footer.classList.add('main-footer')

    const sectionApoio = document.createElement('div')
    sectionApoio.classList.add('footer-section')

    const titleApoio = document.createElement('h2')
    titleApoio.classList.add('footer-subtitle')
    titleApoio.textContent = 'Apoio Institucional'

    const textSenai = document.createElement('h3')
    textSenai.classList.add('patrocinador')
    textSenai.textContent = 'SENAI Jandira'

    sectionApoio.appendChild(titleApoio)
    sectionApoio.appendChild(textSenai)

    const sectionDevs = document.createElement('div')
    sectionDevs.classList.add('footer-section')

    const titleDevs = document.createElement('h2')
    titleDevs.classList.add('footer-subtitle')
    titleDevs.textContent = 'Desenvolvedores'

    sectionDevs.appendChild(titleDevs)

    DEVELOPERS_DATA.forEach(dev => {
        const devContainer = document.createElement('div')
        devContainer.classList.add('desenvolvedor')

        const devName = document.createElement('p')
        devName.classList.add('dev-name')
        devName.textContent = dev.nome

        const devRole = document.createElement('span')
        devRole.classList.add('dev-role')
        devRole.textContent = dev.funcao

        const iconsContainer = document.createElement('div')
        iconsContainer.classList.add('dev-icons')

        iconsContainer.appendChild(createLink(dev.github, '../../assets/img/github-icon.svg', 'GitHub'))
        iconsContainer.appendChild(createLink(dev.linkedin, '../../assets/img/linkedin-icon.svg', 'LinkedIn'))

        devContainer.appendChild(devName)
        devContainer.appendChild(devRole)
        devContainer.appendChild(iconsContainer)

        sectionDevs.appendChild(devContainer)
    })

    const sectionCopy = document.createElement('div')
    sectionCopy.classList.add('footer-copy')

    const textCopy = document.createElement('p')
    textCopy.textContent = '© 2025 GNN Jandira | Todos os Direitos Reservados'

    sectionCopy.appendChild(textCopy)

    footer.appendChild(sectionApoio)
    footer.appendChild(sectionDevs)
    footer.appendChild(sectionCopy)

    document.body.appendChild(footer)
}

function createNotifyModal() {

    let idUsuario = null
    const userStorage = localStorage.getItem('user')
    if (userStorage)
        idUsuario = JSON.parse(userStorage).id_usuario

    const main = document.getElementById('main')

    const modalNotifyOverlay = document.createElement('div')
    modalNotifyOverlay.classList.add('modal-notify-overlay')
    modalNotifyOverlay.id = 'modal-notify-overlay'

    modalNotifyOverlay.addEventListener('click', (e) => {
        if (e.target === modalNotifyOverlay) {
            modalNotifyOverlay.remove()
        }
    })

    const modalNotify = document.createElement('div')
    modalNotify.classList.add('modal-notificacao')

    modalNotifyOverlay.appendChild(modalNotify)
    main.appendChild(modalNotifyOverlay)

    return modalNotify
}

function createNotificationItem(notificacao) {
    const article = document.createElement('article')
    article.classList.add('card-notificacao')

    if (!notificacao.lida) {
        article.classList.add('nao-lida')
    }

    const content = document.createElement('div')
    content.classList.add('notificacao-content')

    const headerNote = document.createElement('div')
    headerNote.classList.add('notificacao-header')

    const title = document.createElement('h3')
    title.classList.add('notificacao-titulo')
    title.textContent = 'Nova Notificação'

    const date = document.createElement('span')
    date.classList.add('notificacao-data')
    date.textContent = formatarData(notificacao.data_envio)

    headerNote.appendChild(title)
    headerNote.appendChild(date)

    const message = document.createElement('p')
    message.classList.add('notificacao-mensagem')
    message.textContent = notificacao.conteudo

    content.appendChild(headerNote)
    content.appendChild(message)
    article.appendChild(content)

    return article
}

async function createModalArea(modal) {

    const containerNotify = document.createElement('div')
    containerNotify.classList.add('container-notificacao')

    const headerContainer = document.createElement('div')
    headerContainer.classList.add('header-container')

    const headerNotify = document.createElement('h1')
    headerNotify.textContent = 'Notificações'

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('btn-close')
    buttonClose.id = 'btn-fechar-modal-notificacao'
    buttonClose.textContent = '✖'

    buttonClose.addEventListener('click', () => {
        const overlay = document.getElementById('modal-notify-overlay')
        if (overlay) {
            overlay.remove()
        }
    })

    headerContainer.appendChild(headerNotify)
    headerContainer.appendChild(buttonClose)

    const notificacoes = document.createElement('div')
    notificacoes.classList.add('notificacoes')

    const jsonUser = localStorage.getItem('user')
    const usuarioLogado = JSON.parse(jsonUser)
    const id = usuarioLogado.id_usuario

    const resposta = await listarNotificacaoPeloId(id)
    const listanotificacoes = resposta.itens?.notificacao || []

    listanotificacoes.forEach(notificacao => {
        const card = createNotificationItem(notificacao)
        card.classList.add('carti-notificacao')
        notificacoes.appendChild(card)
    })

    containerNotify.appendChild(headerContainer)
    containerNotify.appendChild(notificacoes)

    modal.appendChild(containerNotify)
}

createHeader()
createFooter()
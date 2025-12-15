'use strict'

import { marcarNotificacaoComoLida, listarNotificacoesDoUsuario } from "./notificacao.js"

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

function toggleNavbar() {
    const existingNavbar = document.getElementById('navbar')

    if (existingNavbar) {
        existingNavbar.remove()
        return
    }

    const userStorage = localStorage.getItem('user')

    const usuario = userStorage ? JSON.parse(userStorage) : null

    const nomeUsuario = usuario ? usuario.nickname : 'Visitante'

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
    userImg.src = usuario && usuario.foto_perfil ? usuario.foto_perfil : '../../assets/img/profile.svg'
    userImg.classList.add('menu-avatar')
    userImg.style.borderRadius = '100%'

    imgContainer.appendChild(userImg)

    

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

    const userStorage = localStorage.getItem('user')
    const usuario = userStorage ? JSON.parse(userStorage) : null

    const perfilIcons = document.createElement('div')
    perfilIcons.classList.add('perfil-icons')

    const profileImg = document.createElement('img')
    profileImg.src = usuario && usuario.foto_perfil ? usuario.foto_perfil : '../../assets/img/profile.svg'
    profileImg.style.borderRadius = '50%' 
    profileImg.style.objectFit = 'cover'
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

    const notificationContainer = document.createElement('div')
    notificationContainer.classList.add('notification-container')

    const notifyIcon = document.createElement('img')
    notifyIcon.classList.add('header-icon')
    notifyIcon.classList.add('notify-icon')
    notifyIcon.src = '../../assets/img/notificaçãoIcon.png'
    notifyIcon.alt = 'Notificações'

    const badge = document.createElement('span')
    badge.classList.add('notification-badge')
    badge.style.display = 'none'

    notificationContainer.appendChild(notifyIcon)
    notificationContainer.appendChild(badge)

    const userJson = localStorage.getItem('user')
    if (userJson) {
        const user = JSON.parse(userJson)
        atualizarBadgeNotificacao(user.id_usuario, badge)
    }

    notificationContainer.addEventListener('click', () => {
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

    menuIcons.appendChild(notificationContainer)
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

    article.addEventListener('click', async () => {
        if (notificacao.lida) return

        try {
            await marcarNotificacaoComoLida(notificacao.id_notificacao_usuario)

            article.classList.remove('nao-lida')
            notificacao.lida = true

            const badge = document.querySelector('.notification-badge')
            if (badge) {
                let count = parseInt(badge.textContent)
                if (!isNaN(count)) {
                    count--
                    if (count <= 0) {
                        badge.style.display = 'none'
                    } else {
                        badge.textContent = count > 9 ? '9+' : count
                    }
                }
            }

        } catch (erro) {
            console.error('Erro ao marcar como lida:', erro)
        }
    })

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

    try {
        const userStorage = localStorage.getItem('user')
        const usuario = userStorage ? JSON.parse(userStorage) : null

        if (!usuario || !usuario.id_usuario) {
            const msgLogin = document.createElement('p')
            msgLogin.textContent = 'Faça login para ver suas notificações.'
            msgLogin.style.color = '#ccc'
            msgLogin.style.padding = '20px'
            msgLogin.style.textAlign = 'center'

            notificacoes.appendChild(msgLogin)
        } else {
            const resposta = await listarNotificacoesDoUsuario(usuario.id_usuario)

            const lista = resposta.itens?.notificacao || resposta.notificacao || []

            if (lista.length === 0) {
                const msgVazia = document.createElement('p')
                msgVazia.textContent = 'Nenhuma notificação nova.'
                msgVazia.style.color = '#ccc'
                msgVazia.style.padding = '20px'
                msgVazia.style.textAlign = 'center'

                notificacoes.appendChild(msgVazia)
            } else {
                lista.forEach(notificacao => {
                    const card = createNotificationItem(notificacao)
                    notificacoes.appendChild(card)
                })
            }
        }
    } catch (error) {
        console.error("Erro ao carregar notificações", error)

        const msgErro = document.createElement('p')
        msgErro.textContent = 'Erro ao carregar.'
        msgErro.style.color = 'var(--status-vermelho)'
        msgErro.style.padding = '20px'
        msgErro.style.textAlign = 'center'

        notificacoes.appendChild(msgErro)
    }

    containerNotify.appendChild(headerContainer)
    containerNotify.appendChild(notificacoes)

    modal.appendChild(containerNotify)
}

async function atualizarBadgeNotificacao(idUsuario, badgeElement) {
    try {
        const dados = await listarNotificacoesDoUsuario(idUsuario)

        if (dados && dados.itens && dados.itens.notificacao) {
            const lista = Array.isArray(dados.itens.notificacao)
                ? dados.itens.notificacao
                : [dados.itens.notificacao]

            const naoLidas = lista.filter(n => !n.lida).length

            if (naoLidas > 0) {
                badgeElement.textContent = naoLidas > 9 ? '9+' : naoLidas
                badgeElement.style.display = 'flex'
            } else {
                badgeElement.style.display = 'none'
            }
        }
    } catch (error) {
        badgeElement.style.display = 'none'
    }
}

createHeader()
createFooter()
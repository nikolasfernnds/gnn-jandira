'use strict'

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
    { text: 'Notícias', href: '../../pages/home/index.html#noticias' },
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

    const nav = document.createElement('nav')
    nav.id = 'navbar'
    nav.classList.add('sidebar-menu') 

    const menuHeader = document.createElement('div')
    menuHeader.classList.add('menu-header')

    const userInfo = document.createElement('div')
    userInfo.classList.add('menu-user-info')

    const userImg = document.createElement('img')
    userImg.src = '../../assets/img/profile.svg'
    userImg.classList.add('menu-avatar')

    const userName = document.createElement('span')
    userName.textContent = 'Olá, Usuário'
    userName.classList.add('menu-username')

    userInfo.appendChild(userImg)
    userInfo.appendChild(userName)

    const btnClose = document.createElement('button')
    btnClose.textContent = '✖'
    btnClose.classList.add('btn-close-menu')
    btnClose.addEventListener('click', toggleNavbar) 

    menuHeader.appendChild(userInfo)
    menuHeader.appendChild(btnClose)

    const ul = document.createElement('ul')
    ul.classList.add('menu-list')

    LINKS.forEach(item => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        
        a.textContent = item.text
        a.href = item.href
        a.classList.add('menu-link')
        
        if (item.style) {
            a.style = item.style
        }

        li.appendChild(a)
        ul.appendChild(li)
    })

    nav.appendChild(menuHeader)
    nav.appendChild(ul)

    document.body.appendChild(nav)
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

    const gnnLogo = document.createElement('img')
    gnnLogo.classList.add('header-icon')
    gnnLogo.classList.add('logo-icon')
    gnnLogo.src = '../../assets/img/logoGNNJandira.png'

    const gnnContainer = document.createElement('div')
    gnnContainer.classList.add('gnn-container')

    const gnn = document.createElement('h1')
    gnn.classList.add('titulo')
    gnn.textContent = 'GNN Jandira'

    const menuIcons = document.createElement('div')
    menuIcons.classList.add('menu-icons')

    const notifyIcon = document.createElement('img')
    notifyIcon.classList.add('header-icon')
    notifyIcon.src = '../../assets/img/notificaçãoIcon.png'

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

createHeader()
createFooter()
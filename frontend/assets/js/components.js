'use strict'

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

    const desenvolvedores = [
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

    desenvolvedores.forEach(dev => {
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

        const linkGit = document.createElement('a')
        linkGit.classList.add('dev-links')
        linkGit.href = dev.github
        linkGit.target = '_blank'

        const iconGit = document.createElement('img')
        iconGit.src = '../../assets/img/github-icon.svg'
        iconGit.alt = 'GitHub'

        const textGit = document.createElement('span')
        textGit.textContent = 'GitHub'

        linkGit.appendChild(iconGit)
        linkGit.appendChild(textGit)

        const linkIn = document.createElement('a')
        linkIn.classList.add('dev-links')
        linkIn.href = dev.linkedin
        linkIn.target = '_blank'

        const iconIn = document.createElement('img')
        iconIn.src = '../../assets/img/linkedin-icon.svg'
        iconIn.alt = 'LinkedIn'

        const textIn = document.createElement('span')
        textIn.textContent = 'LinkedIn'

        linkIn.appendChild(iconIn)
        linkIn.appendChild(textIn)

        iconsContainer.appendChild(linkGit)
        iconsContainer.appendChild(linkIn)

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
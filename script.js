// SIMULATE DATABASE
const users = [
    'admin',
    'descartador',
    'reciclador',
    'organizador',
    'voluntario',
]

const role = {
    admin: 'admin',
    descartador: 'discarder',
    reciclador: 'recycler',
    organizador: 'organizer',
    voluntario: 'volunteer',
}

const password = '123456'

if (!localStorage.getItem('users')) {
    localStorage.setItem(
        'users',
        JSON.stringify(
            users.map((user) => ({
                username: user,
                password,
                role: role[user]
            }))
        )
    )
}

// LOGO
const logo = document.getElementById('logo')
logo.innerHTML = `
    <a href='/'>
        ReciclaJá
    </a>
`

// IF USER IS LOGGED
const nav = document.getElementById('nav')

if (localStorage.getItem('user')) {
    const dbLink = window.location.pathname.
    endsWith('dashboard.html') ? '' : `
        <a href='dashboard.html'>
            Dashboard
        <span class="material-symbols-outlined">
            dashboard
        </span></a>
    `

    nav.innerHTML += `
        ${dbLink}
        <a href='settings.html'><span class="material-symbols-outlined settings">
            settings
        </span></a>
    `
} else {
    nav.innerHTML = `
        <a href="register.html">Registrar-se</a>
        <a href="login.html">Entrar</a>
    `
}
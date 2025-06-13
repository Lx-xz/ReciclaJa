// SIMULATE DATABASE
const users = [
    'admin',
    'descartador',
    'reciclador',
    'organizador',
    'voluntario',
]
const password = '123456'

if (!localStorage.getItem('users')) {
    localStorage.setItem(
        'users',
        JSON.stringify(
            users.map((user) => ({
                username: user,
                password: password,
                isAdmin: false,
                isDiscarter: false,
                isRecycler: false,
                isOrganizer: false,
            }))
        )
    )
}

// IF USER IS LOGGED
const nav = document.getElementById('nav')

if (localStorage.getItem('user')) {
    nav.innerHTML += `
        <a href='dashboard.html'>Dashboard</a>
        <a href='settings.html'>Configurações</a>
    `
} else {
    nav.innerHTML = `
        <a href="login.html">Entrar</a>
        <a href="register.html">Cadastrar</a>
    `
}
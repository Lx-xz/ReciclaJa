// LOGIN
document.getElementById("btLogin")?.addEventListener('click', () => {
    let username = document.getElementById('inUsername').value
    let password = document.getElementById('inPassword').value
    let alert = document.getElementById('alert')

    if (!username || !password) {
        alert.innerHTML = 'Por favor, preencha todos os campos.'
        return
    }

    const users = JSON.parse(localStorage.getItem('users'))
    
    const userFound = users.some(user => user.username === username && user.password === password)

    if (userFound) {
        localStorage.setItem(
            'user', 
            JSON.stringify({ username: username, token: Math.random().toString(36).substr(2) + Date.now().toString(36) })
        )
        window.location.href = 'dashboard.html'
    } else {
        alert.innerHTML = 'Usuário ou senha incorretos.'
    }
})

// LOGOUT
document.getElementById("btLogout")?.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.href = 'index.html'
})

// REGISTER
document.getElementById("btRegister")?.addEventListener('click', () => {
    let username = document.getElementById('inUsername').value
    let password = document.getElementById('inPassword').value
    let alert = document.getElementById('alert')

    if (!username || !password) {
        alert.innerHTML = 'Por favor, preencha todos os campos.'
        return
    }

    let users = JSON.parse(localStorage.getItem('users'))

    if (users.some(user => user.username === username)) {
        alert.innerHTML = 'Nome de usuário já existe.'
        return
    }

    users.push({ username, password })
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('user', JSON.stringify({ username: username, token: Math.random().toString(36).substr(2) + Date.now().toString(36) }))
        window.location.href = 'dashboard.html'
})
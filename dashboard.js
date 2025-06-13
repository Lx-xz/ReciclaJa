const user = JSON.parse(localStorage.getItem('user'))
const rolesPt = {
    admin: 'administrador',
    discarter: 'descartador',
    recycler: 'reciclador',
    organizer: 'organizador',
    volunteer: 'voluntario'
}

const personal = document.getElementById('personal')

personal.innerHTML = `
    <div id="info">
        <div id="picture">
            <span class="material-symbols-outlined icon">
                person
            </span>
        </div>
        ${user.username}
    </div>
    <p>Você é um ${rolesPt[user.role]}!</p>
`
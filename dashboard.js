const menu = document.getElementById('menu')
const menuWidth = menu.offsetWidth
document.documentElement.style.setProperty('--menu-width', `${menuWidth}px`)

const open_close = document.getElementById('open-close')

const dashboard = document.getElementById('content')

open_close.addEventListener('click', () => {
    open_close.classList.toggle('active')

    if (open_close.classList.contains('active')) {
        open_close.innerHTML = `
            <span class="material-symbols-outlined icon">
                close
            </span>
        `

        menu.style.left = '0'
        dashboard.style.marginLeft = `${menuWidth}px`
    } else {
        open_close.innerHTML = `
            <span class="material-symbols-outlined icon">
                menu
            </span>
        `

        menu.style.left = `-${menuWidth}px`
        dashboard.style.marginLeft = `0`
    }
})

const user = JSON.parse(localStorage.getItem('user'))

const rolesPt = {
    'admin': 'administrador',
    'discarder': 'descartador',
    'recycler': 'reciclador',
    'organizer': 'organizador',
    'volunteer': 'voluntário'
}

const personal = document.getElementById('personal')

personal.innerHTML = `
    <div id="info">
        <div id="picture">
            <span class="material-symbols-outlined icon">
                person
            </span>
        </div>
        <div id="name-role">
                ${user.username}
            <span>
                ${rolesPt[user.role]}
            </span>
        </div>
    </div>
`

const locations = JSON.parse(localStorage.getItem('locations'))

if (user.role === 'admin') {
    const users = JSON.parse(localStorage.getItem('users'))
    dashboard.innerHTML += `
        <div id="userControl">
            <h2>Controle de Usuários</h2>
            <ul>
                ${users.map(u => `
                    <li>
                        <span class="username">${u.username}</span>
                        <span class="role">${rolesPt[u.role] || u.role}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `
}

if (user.role === 'admin' || user.role === 'organizer') {
    const wastes = Object.keys(JSON.parse(localStorage.getItem('totalWaste')))
    wastes.forEach((w, idx, arr) => {
        arr[idx] = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })

    const wasteInputs = []

    dashboard.innerHTML += `
        <div id="addDiscard">
            <h2>Adicionar descartes</h2>
            <p>Não funcional</p>
            <form id="addDiscardForm">
                <label for="inDescarderId">
                    Código do Descartador:
                    <input type="text" id="inDescarderId">
                </label>
                <label for="inLocationId">
                    Código do Local:
                    <input type="text" id="inLocationId">
                </label>
                <div id="wasteTypes"> ${
                    wastes.map((w) => {
                        return `
                            <label for="check${w}">
                                ${w}
                                <input type="checkbox" id="check${w}" value="${w}" onchange="toggleWasteInput('${w}')">
                            </label>
                        `
                    }).join('')}
                </div>
            </form>
        </div>
    `

    const form = document.getElementById('addDiscardForm')
    function toggleWasteInput(w) {
        if (wasteInputs.includes(w)) {
            wasteInputs.splice(wasteInputs.indexOf(w), 1)
        } else {
            wasteInputs.push(w)
        }

        Array.from(form.querySelectorAll('.waste-input')).forEach(el => el.remove())

        wasteInputs.forEach((w) => {
            const label = document.createElement('label')
            label.classList.add('waste-input')
            label.setAttribute('for', `in${w}`)
            label.innerHTML = `
            ${w}:
            <input type="text" id="in${w}">
            `
            form.appendChild(label)
        })

        if (form.contains(button)) {
            form.removeChild(button)
        }
        form.appendChild(button)
    }

    const button = document.createElement('button')
    button.id = 'btAddDiscard'
    button.innerHTML = 'Adicionar'
    form.appendChild(button)
}

if (user.role === 'discarder') {
    let discard = JSON.parse(localStorage.getItem('discard'))

    let personalDiscard = discard.filter(
        (i) => i.user === user.id
    )

    dashboard.innerHTML += `
        <div id="discarder">
            <h2>Seus descartes</h2>
            <p>Você pode ver os descartes que você fez, e também os locais onde você fez esses descartes.</p>
            ${personalDiscard.map((i) => {
                const wasteTypes = Object.entries(i.waste)
                    .filter(([type, data]) => data.col > 0)
                    .map(([type, data]) => 
                        `<div class="wasteType">
                            <span class="type">${type}:</span> 
                            <span class="col">coletado: ${data.col}</span> 
                            <span class="rec">reciclado: ${data.rec}</span>
                        </div>`
                    ).join('')
                if (!wasteTypes) return ''
                return `
                    <div class="discardItem">
                        <div class="date">${i.date}</div>
                        <div class="location">${locations[i.location-1].street}</div>
                        <div class="waste">${wasteTypes}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `
}

dashboard.innerHTML += `
    <div id="locations">
        <h2>Locais de descarte</h2>
        <p>Você pode ver os locais onde você pode descartar seus resíduos.</p>
        ${locations.map((location) => `
            <div class="location">
                ${location.street}, ${location.number}, ${location.neighborhood}, ${location.city}
            </div>
        `).join('')}
    </div>
`

const dbHeader = document.getElementById('dbHeader')

const dashboardChildren = Array.from(dashboard.children)
const sectionTitles = dashboardChildren.map(child => {
    const h2 = child.querySelector('h2');
    return h2 ? { title: h2.textContent, id: child.id } : null;
}).filter(Boolean)

dbHeader.innerHTML = sectionTitles.map(({ title, id }) => {
    return `<a href="#${id}">${title}</a>`
}).join(' ')
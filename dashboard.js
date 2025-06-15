const user = JSON.parse(localStorage.getItem('user'))

const rolesPt = {
    'admin': 'administrador',
    'discarder': 'descartador',
    'recycler': 'reciclador',
    'organizer': 'organizador',
    'volunteer': 'voluntario'
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

const dashboard = document.getElementById('content')

const locations = JSON.parse(localStorage.getItem('locations'))

dashboard.innerHTML = `
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

if (user.role === 'admin') {
    dashboard.innerHTML = '1'
}

if (user.role === 'organizer') {
    dashboard.innerHTML = '2'
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
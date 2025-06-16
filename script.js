// SIMULATE DATABASE
const users = [
    'admin',
    'descartador',
    'reciclador',
    'organizador',
    'voluntario',
    'admin@fortes.com.br',
    'coopertativas@fortes.com.br',
]

const role = {
    admin: 'admin',
    descartador: 'discarder',
    reciclador: 'recycler',
    organizador: 'organizer',
    voluntario: 'volunteer',
    'admin@fortes.com.br': 'admin',
    'coopertativas@fortes.com.br': 'organizer',
}

const password = '123456'

if (!localStorage.getItem('users')) {
    let id = 1;
    localStorage.setItem(
        'users',
        JSON.stringify(
            users.map((user) => ({
                id: id++,
                username: user,
                password,
                role: role[user]
            }))
        )
    )
}

const data = {
    locations: [
        {
            street: 'Rua Limeira',
            number: 123,
            neighborhood: 'Itapuã',
            city: 'Vila Velha',
            cep: '29101630',
        },
        {
            street: 'Rua Belo Horizonte',
            number: 456,
            neighborhood: 'Jardim Atlântico',
            city: 'Vila Velha',
            cep: '29101970'
        }
    ],
    totalWaste: {
        plastic: {
            col: 20,
            rec: 10
        },
        paper: {
            col: 20,
            rec: 10
        },
        metal: {
            col: 10,
            rec: 5
        },
        glass: {
            col: 10,
            rec: 0
        },
        eletronic: {
            col: 5,
            rec: 0
        }
    },
    discard: [
        {
            user: 2,
            lacation: 1,
            date: '2025-01-20',
            waste: {
                plastic: {
                    col: 10,
                    rec: 0
                },
                paper: {
                    col: 20,
                    rec: 10
                },
                metal: {
                    col: 0,
                    rec: 0
                },
                glass: {
                    col: 10,
                    rec: 0
                },
                eletronic: {
                    col: 5,
                    rec: 0
                }
            }
        },
        {
            user: 2,
            lacation: 2,
            date: '2025-01-20',
            waste: {
                plastic: {
                    col: 10,
                    rec: 10
                },
                paper: {
                    col: 0,
                    rec: 0
                },
                metal: {
                    col: 10,
                    rec: 5
                },
                glass: {
                    col: 10,
                    rec: 0
                },
                eletronic: {
                    col: 5,
                    rec: 0
                }
            }
        }
    ]
}

if (!localStorage.getItem('locations')) {
    let id = 1;
    localStorage.setItem('locations',
        JSON.stringify(
            data.locations.map((location) => ({
                id: id++,
                street: location.street,
                number: location.number,
                neighborhood: location.neighborhood,
                city: location.city,
                cep: location.cep
            }))
        )
    )
}

if (!localStorage.getItem('totalWaste')) {
    localStorage.setItem('totalWaste',
        JSON.stringify(data.totalWaste)
    )
}

if (!localStorage.getItem('discard')) {
    localStorage.setItem('discard',
        JSON.stringify(
            data.discard.map((discard) => ({
                user: discard.user,
                location: discard.lacation,
                date: discard.date,
                waste: {
                    plastic: {
                        col: discard.waste.plastic.col,
                        rec: discard.waste.plastic.rec
                    },
                    paper: {
                        col: discard.waste.paper.col,
                        rec: discard.waste.paper.rec
                    },
                    metal: {
                        col: discard.waste.metal.col,
                        rec: discard.waste.metal.rec
                    },
                    glass: {
                        col: discard.waste.glass.col,
                        rec: discard.waste.glass.rec
                    },
                    eletronic: {
                        col: discard.waste.eletronic.col,
                        rec: discard.waste.eletronic.rec
                    }
                }
            }))
        )
    )
}

// LOGO
const logo = document.getElementById('logo')
logo.innerHTML = `
    <a href='index.html'>
        ReciclaJá
    </a>
`

// IF USER IS LOGGED
const nav = document.getElementById('nav')

if (localStorage.getItem('user')) {
    nav.innerHTML += `
        ${window.location.pathname.endsWith('dashboard.html') ? '' : `
            <a href='dashboard.html'>
                Dashboard
                <span class="material-symbols-outlined">
                    dashboard
                </span>
            </a>
        `}
        <a href='settings.html' class="settings${window.location.pathname.endsWith('settings.html') ? ' onPage' : ''}">
            ${window.location.pathname.endsWith('dashboard.html') ? 'Settings' : ''}
        <span class="material-symbols-outlined">
            settings
        </span></a>
    `;
} else {
    nav.innerHTML = `
        <a href="register.html" ${window.location.pathname.endsWith('register.html') ? 'class="onPage"' : ''}>Registrar-se</a>
        <a href="login.html" ${window.location.pathname.endsWith('login.html') ? 'class="onPage"' : ''}>Entrar</a>
    `
}
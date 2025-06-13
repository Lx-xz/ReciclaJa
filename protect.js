(function() {
    const user = localStorage.getItem('user')
    const path = window.location.pathname
    const page = path.substring(path.lastIndexOf('/') + 1)

    if (user && (page === 'login.html' || page === 'register.html')) {
        window.location.replace('dashboard.html')
    }

    if (!user && (page === 'dashboard.html' || page === 'settings.html' || page === 'feedback.html')) {
        window.location.replace('index.html')
    }
})()
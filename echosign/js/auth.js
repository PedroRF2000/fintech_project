document.addEventListener('DOMContentLoaded', function() {
    const allowedPages = ['login.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!allowedPages.includes(currentPage)) {
        if (!sessionStorage.getItem('echosignLoggedIn')) {
            window.location.href = 'login.html';
        }
    }
});

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        sessionStorage.setItem('echosignLoggedIn', 'true');
        window.location.href = 'index.html';
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('logout-btn')) {
        e.preventDefault();
        sessionStorage.removeItem('echosignLoggedIn');
        window.location.href = 'login.html';
    }
});
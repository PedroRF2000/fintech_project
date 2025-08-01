document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.signature-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        item.addEventListener('click', function() {
            const docTitle = this.querySelector('h6').textContent;
            sessionStorage.setItem('currentDocument', docTitle);
        });
    });

    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
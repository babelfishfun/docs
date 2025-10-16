// Theme toggle functionality for Babelfish Documentation

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('babelfish-docs-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Update button text based on current theme
    updateThemeButton();
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('babelfish-docs-theme', newTheme);
            
            updateThemeButton();
        });
    }
    
    function updateThemeButton() {
        const currentTheme = html.getAttribute('data-theme');
        if (themeToggle) {
            themeToggle.textContent = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';
        }
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active states to navigation links
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.docs-sidebar a[href]');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === 'getting-started/overview') ||
            (currentPath.endsWith('/') && linkPath === currentPath.slice(0, -1))) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.docs-sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
        
        // Close sidebar when clicking on a link (mobile)
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }
    
    // Add copy functionality to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            color: var(--text-secondary);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: var(--transition);
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
    
    // Add search functionality (simple implementation)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        margin: 1rem 1.5rem;
        border: 1px solid var(--border-light);
        border-radius: 6px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 0.875rem;
    `;
    
    // Insert search at the top of sidebar
    const sidebar = document.querySelector('.docs-sidebar');
    if (sidebar) {
        sidebar.insertBefore(searchInput, sidebar.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const navLinks = sidebar.querySelectorAll('a');
            
            navLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const parentLi = link.parentElement;
                
                if (text.includes(searchTerm) || searchTerm === '') {
                    parentLi.style.display = 'block';
                } else {
                    parentLi.style.display = 'none';
                }
            });
        });
    }
});
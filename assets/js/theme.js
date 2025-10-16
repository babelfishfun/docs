// Theme Toggle Functionality for Babelfish Documentation
// Matches the styling and behavior from babelfish-ui-main

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Setup theme toggle button
    setupThemeToggle();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup mobile navigation
    setupMobileNavigation();
});

function initializeTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('babelfish-theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    // Set the theme attribute on the document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference
    localStorage.setItem('babelfish-theme', theme);
    
    // Update theme toggle button text
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setupSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupMobileNavigation() {
    // Create mobile menu toggle button
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.style.cssText = `
            background: none;
            border: none;
            color: var(--primary-color);
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.style.cssText = `
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid var(--border);
            padding: 1rem;
        `;
        
        // Copy navigation links to mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            mobileMenu.innerHTML = navLinks.outerHTML;
            navLinks.style.display = 'none';
        }
        
        // Add mobile menu to navbar
        navContainer.appendChild(mobileMenuButton);
        navContainer.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = mobileMenu.style.display === 'block';
            mobileMenu.style.display = isOpen ? 'none' : 'block';
            this.innerHTML = isOpen ? '☰' : '✕';
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenu.style.display = 'none';
                mobileMenuButton.innerHTML = '☰';
            }
        });
    }
}

// Add animation classes to elements when they come into view
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .quick-start-card, .content h2, .content h3');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Add copy-to-clipboard functionality for code blocks
function setupCodeCopying() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            position: relative;
            display: inline-block;
            width: 100%;
        `;
        
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-color);
            color: var(--background-dark);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 600;
            transition: var(--transition);
        `;
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
        
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(copyButton);
    });
}

// Initialize code copying
document.addEventListener('DOMContentLoaded', setupCodeCopying);

// Add search functionality for documentation
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search documentation...';
    searchInput.style.cssText = `
        padding: 0.5rem 1rem;
        border: 1px solid var(--border);
        border-radius: 25px;
        background: var(--card-background);
        color: var(--text);
        margin-left: 1rem;
        width: 200px;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const headings = document.querySelectorAll('h1, h2, h3, h4');
            
            headings.forEach(heading => {
                const text = heading.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    heading.style.backgroundColor = 'rgba(225, 166, 64, 0.2)';
                    heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    heading.style.backgroundColor = '';
                }
            });
        });
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', setupSearch);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + / for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Add loading states for external links
function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.textContent = 'Loading...';
        });
    });
}

// Initialize external link handling
document.addEventListener('DOMContentLoaded', setupExternalLinks);

// Add print styles
function setupPrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            .navbar, .theme-toggle, .mobile-menu-toggle, .mobile-menu {
                display: none !important;
            }
            
            body {
                background: white !important;
                color: black !important;
            }
            
            .hero {
                background: white !important;
                color: black !important;
            }
            
            .btn {
                border: 1px solid black !important;
                background: white !important;
                color: black !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// Initialize print styles
document.addEventListener('DOMContentLoaded', setupPrintStyles);

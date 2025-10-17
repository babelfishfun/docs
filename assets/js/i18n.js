// Internationalization (i18n) for Babelfish Documentation
class I18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.defaultLanguage = 'en';
    }

    async loadLanguage(lang) {
        try {
            // Use absolute path from the root of the site
            const fullPath = `/docs/assets/languages/${lang}.json`;
            console.log(`Loading language file: ${fullPath}`);
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`Failed to load language: ${lang} from ${fullPath}`);
            }
            this.translations[lang] = await response.json();
            console.log(`Successfully loaded ${lang} translations:`, this.translations[lang]);
        } catch (error) {
            console.error(`Error loading language ${lang}:`, error);
            // Fallback to default language if available
            if (lang !== this.defaultLanguage && this.translations[this.defaultLanguage]) {
                this.translations[lang] = this.translations[this.defaultLanguage];
            }
        }
    }

    async setLanguage(lang) {
        if (this.currentLanguage === lang) return;

        // Load language if not already loaded
        if (!this.translations[lang]) {
            await this.loadLanguage(lang);
        }

        this.currentLanguage = lang;
        localStorage.setItem('babelfish-docs-language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'th' ? 'th' : 'en';
        
        // Apply translations
        this.translatePage();
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        console.log(`Found ${elements.length} elements to translate`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
                console.log(`Translated ${key}: ${translation}`);
            } else {
                console.warn(`No translation found for key: ${key}`);
            }
        });
        
        // Update last updated date format based on language
        this.updateLastUpdatedDate();
    }

    updateLastUpdatedDate() {
        const lastUpdatedElement = document.getElementById('last-updated-date');
        if (lastUpdatedElement) {
            const now = new Date();
            let lastUpdated;
            
            if (this.currentLanguage === 'th') {
                lastUpdated = now.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else {
                lastUpdated = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            
            lastUpdatedElement.textContent = lastUpdated;
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    async init() {
        // Load default language
        await this.loadLanguage(this.defaultLanguage);
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('babelfish-docs-language');
        const browserLanguage = navigator.language.split('-')[0];
        
        // Determine initial language
        let initialLanguage = this.defaultLanguage;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
            initialLanguage = savedLanguage;
        } else if (browserLanguage === 'th') {
            initialLanguage = 'th';
        }
        
        // Set initial language
        await this.setLanguage(initialLanguage);
        
        // Setup language selector
        this.setupLanguageSelector();
    }

    setupLanguageSelector() {
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            // Set current language
            languageSelect.value = this.currentLanguage;
            
            // Add event listener
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.i18n = new I18n();
    await window.i18n.init();
});

// Export for use in other scripts
window.I18n = I18n;

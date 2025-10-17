# Translation Guide for Babelfish Documentation

This guide explains how to add new languages to the Babelfish documentation site.

## Current Languages
- **English (en)**: Default language
- **Thai (th)**: Full translation available

## Adding a New Language

### 1. Create Translation File
Create a new JSON file in `assets/languages/` with the language code (e.g., `es.json` for Spanish, `ja.json` for Japanese).

### 2. Translation Structure
Copy the structure from `en.json` and translate all values while keeping the same keys:

```json
{
  "hero": {
    "title": "Babelfish",
    "subtitle": "Your translated subtitle here",
    "get_started": "Your translated button text",
    "explore_token": "Your translated button text"
  },
  "what_is": {
    "title": "What is Babelfish?",
    "description": "Your translated description...",
    "core_features": "Core Features"
  }
  // ... continue with all sections
}
```

### 3. Update Language Selector
Add the new language option to the language selector in `index.html`:

```html
<select id="language-select" aria-label="Select language">
    <option value="en">🇺🇸 English</option>
    <option value="th">🇹🇭 ไทย</option>
    <option value="es">🇪🇸 Español</option> <!-- New language -->
</select>
```

### 4. Update i18n.js (if needed)
If the new language requires special date formatting, update the `updateLastUpdatedDate()` function in `assets/js/i18n.js`:

```javascript
if (this.currentLanguage === 'es') {
    lastUpdated = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
```

### 5. Add HTML lang Attribute
Update the `setLanguage()` function in `i18n.js` to handle the new language code:

```javascript
// Update HTML lang attribute
document.documentElement.lang = lang === 'th' ? 'th' : 
                               lang === 'es' ? 'es' : 'en';
```

## Translation Keys Reference

### Main Sections
- `hero.*` - Hero section content
- `what_is.*` - What is Babelfish section
- `features.*` - Feature cards
- `quick_start.*` - Quick start section
- `latest_updates.*` - Latest updates section
- `community.*` - Community section
- `vision.*` - Vision statement
- `footer.*` - Footer content

### Feature Cards
Each feature has two keys:
- `features.[feature_name].title` - Feature title
- `features.[feature_name].description` - Feature description

### Community Links
Each community link has three keys:
- `community.[platform].title` - Platform title
- `community.[platform].description` - Platform description
- `community.[platform].button` - Button text

## Best Practices

1. **Keep Keys Consistent**: Always use the same key structure across all language files
2. **Test Thoroughly**: Test all translations to ensure they fit the UI properly
3. **Cultural Adaptation**: Consider cultural differences, not just direct translations
4. **Length Consideration**: Some languages may be longer/shorter than English
5. **Emojis**: Keep emojis consistent across languages as they're universal

## Testing New Languages

1. Add the new language file
2. Update the language selector
3. Test language switching functionality
4. Verify all content translates correctly
5. Check date formatting if applicable
6. Test on different screen sizes

## File Structure
```
assets/
├── languages/
│   ├── en.json          # English (default)
│   ├── th.json          # Thai
│   └── [new-lang].json  # Your new language
├── js/
│   └── i18n.js          # Internationalization logic
└── css/
    └── style.css        # Styling for language selector
```

## Browser Language Detection

The system automatically detects the user's browser language and sets it as default if:
1. No saved preference exists
2. The detected language is supported
3. Falls back to English if unsupported

## Language Storage

User language preferences are stored in `localStorage` as `babelfish-docs-language` and persist across sessions.

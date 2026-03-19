// Theme Switcher Configuration
const THEME_KEY = 'bizflow-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    updateThemeToggleButton();
    setupSidebarClosing();
});

/**
 * Initialize theme from localStorage or system preference
 */
function initializeTheme() {
    let theme = localStorage.getItem(THEME_KEY);
    
    // If no saved theme, check system preference
    if (!theme) {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? DARK_THEME 
            : LIGHT_THEME;
    }
    
    applyTheme(theme);
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === LIGHT_THEME) {
        root.setAttribute('data-theme', LIGHT_THEME);
    } else {
        root.removeAttribute('data-theme');
    }
    
    localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || DARK_THEME;
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    applyTheme(newTheme);
    updateThemeToggleButton();
}

/**
 * Update theme toggle button icon based on current theme
 */
function updateThemeToggleButton() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem(THEME_KEY) || DARK_THEME;
        themeToggle.textContent = currentTheme === DARK_THEME ? '☀️' : '🌙';
        themeToggle.title = currentTheme === DARK_THEME ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}

/**
 * Toggle sidebar visibility on mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

/**
 * Close sidebar when clicking outside of it (on mobile)
 */
function setupSidebarClosing() {
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (sidebar && sidebar.classList.contains('open')) {
            // Check if click is outside sidebar and not on toggle button
            if (!sidebar.contains(event.target) && event.target !== sidebarToggle) {
                sidebar.classList.remove('open');
            }
        }
    });
}

/**
 * Listen to system theme preference changes
 */
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
            updateThemeToggleButton();
        }
    });
}

// Theme management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Get saved theme from localStorage or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const currentTheme = html.getAttribute('data-theme');
    const icon = themeToggle.querySelector('.theme-icon');
    
    if (currentTheme === 'dark') {
        icon.setAttribute('data-lucide', 'sun');
    } else {
        icon.setAttribute('data-lucide', 'moon');
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize icon on page load
updateThemeIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon();
});

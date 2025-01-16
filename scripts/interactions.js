// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const logoImage = document.querySelector('.navbar-logo img');

// Paths for logos
const lightLogoPath = "assets/alejero.studio-logos/alejero.studio-logo-black.svg";
const darkLogoPath = "assets/alejero.studio-logos/alejero.studio-logo-white.svg";

// Check and apply saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    logoImage.src = darkLogoPath; // Use white logo in dark mode
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Update icon for light mode
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    // Update toggle icon
    darkModeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    // Update logo
    logoImage.src = isDarkMode ? darkLogoPath : lightLogoPath;
});

// Skills Filter Functionality
const skillFilterButtons = document.querySelectorAll('.skills-filter .filter-btn');
const skillBubbles = document.querySelectorAll('.skill-bubble');
let activeSkillFilters = new Set();

skillFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Handle "All" filter
        if (filter === 'all') {
            activeSkillFilters.clear();
            skillFilterButtons.forEach((btn) => btn.classList.remove('active'));
            skillBubbles.forEach((bubble) => bubble.classList.add('highlighted'));
            setTimeout(() => {
                skillBubbles.forEach((bubble) => bubble.classList.remove('highlighted'));
            }, 2000);
            return;
        }

        // Toggle filter button state
        if (activeSkillFilters.has(filter)) {
            activeSkillFilters.delete(filter);
            button.classList.remove('active');
        } else {
            activeSkillFilters.add(filter);
            button.classList.add('active');
        }

        // Update skill bubbles
        skillBubbles.forEach((bubble) => {
            const category = bubble.dataset.category;
            const shouldHighlight = [...activeSkillFilters].includes(category);
            bubble.classList.toggle('highlighted', shouldHighlight);
        });

        // If no filters are active, reset all bubbles
        if (activeSkillFilters.size === 0) {
            skillBubbles.forEach((bubble) => bubble.classList.remove('highlighted'));
        }
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
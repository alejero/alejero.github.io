// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const logoImage = document.querySelector('.navbar-logo img');

// Paths for logos
const lightLogoPath = "assets/alejero.studio/logos/alejero.studio-logo-black.svg";
const darkLogoPath = "assets/alejero.studio/logos/alejero.studio-logo-white.svg";

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
let activeSkillFilters = new Set(['technologies']); // Initialize with 'technologies' instead of 'all'

// Set initial state for first button (technologies)
document.querySelector('.skills-filter [data-filter="technologies"]').classList.add('active');
updateSkillBubbles();

function updateSkillBubbles() {
    skillBubbles.forEach((bubble) => {
        const category = bubble.dataset.category;
        const isHighlighted = activeSkillFilters.has(category);
        bubble.classList.toggle('highlighted', isHighlighted);
    });
}

skillFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Toggle filter button state
        if (!activeSkillFilters.has(filter)) {
            activeSkillFilters.add(filter);
            button.classList.add('active');
        } else if (activeSkillFilters.size > 0) {
            activeSkillFilters.delete(filter);
            button.classList.remove('active');
        }

        updateSkillBubbles();
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

// Portfolio Filter Functionality
const portfolioFilterButtons = document.querySelectorAll('.portfolio-filter .filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');
let activePortfolioFilters = new Set(['all']); // Initialize with 'all'

// Set initial state
document.querySelector('.portfolio-filter [data-filter="all"]').classList.add('active');
updatePortfolioItems();

function updatePortfolioItems() {
    portfolioItems.forEach((item) => {
        const category = item.dataset.category;
        const isVisible = activePortfolioFilters.has('all') || 
                         (activePortfolioFilters.size > 0 && [...activePortfolioFilters].includes(category));
        
        item.style.display = isVisible ? 'block' : 'none';
    });
}

portfolioFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Toggle filter button state
        if (activePortfolioFilters.has(filter)) {
            activePortfolioFilters.delete(filter);
            button.classList.remove('active');
            
            // If no filters are active, set 'all' as default
            if (activePortfolioFilters.size === 0) {
                activePortfolioFilters.add('all');
                document.querySelector('.portfolio-filter [data-filter="all"]').classList.add('active');
            }
        } else {
            if (filter === 'all') {
                // If 'all' is clicked, remove other filters
                activePortfolioFilters.clear();
            } else {
                // If another filter is clicked, remove 'all'
                activePortfolioFilters.delete('all');
                document.querySelector('.portfolio-filter [data-filter="all"]').classList.remove('active');
            }
            activePortfolioFilters.add(filter);
            button.classList.add('active');
        }

        updatePortfolioItems();

        // Update all button states
        portfolioFilterButtons.forEach((btn) => {
            const btnFilter = btn.dataset.filter;
            btn.classList.toggle('active', activePortfolioFilters.has(btnFilter));
        });
    });
});

// Smooth scroll functionality
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Hide/show scroll indicator based on scroll position
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.getElementById('hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (window.scrollY > heroBottom / 4) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '0.8';
    }
});

// Add smooth scroll behavior to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Portfolio Swiper
const portfolioSwiper = new Swiper('.portfolio-swiper', {
    // Enable responsive breakpoints
    breakpoints: {
        // Mobile
        320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: true
        },
        // Tablet
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // Desktop
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    },
    
    // Enable infinite loop
    loop: true,
    loopedSlides: 4,
    centeredSlides: true,
    grabCursor: true,
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Pagination
    pagination: {
        el: '.portfolio-carousel-container .swiper-pagination',
        clickable: true,
    },

    // Auto height
    autoHeight: false,

    // Smooth transitions
    effect: 'slide',
    speed: 800,

    // Auto play (optional)
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }
});

// Update Swiper when filtering
function updatePortfolioSwiper() {
    portfolioSwiper.update();
    portfolioSwiper.slideTo(0);
}

// Add to your existing filter click handler
portfolioFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {       
        // Update swiper after filtering
        updatePortfolioSwiper();
    });
});

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.typed-text');
  const words = ['inspire', 'transform', 'innovate', 'amaze', 'endure'];
  const wait = 3000;
  
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

function updateHeroSpacing() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    // Set the navbar height in the custom property
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

// Run on page load
updateHeroSpacing();

// Run on window resize
window.addEventListener('resize', updateHeroSpacing);
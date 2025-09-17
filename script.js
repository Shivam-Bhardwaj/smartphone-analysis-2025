// Ultra-lightweight JavaScript for Smartphone Analysis 2025
// Maximum speed, minimal overhead

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    const storedTheme = getStoredTheme();
    const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDarkScheme ? 'dark' : 'light');

    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || initialTheme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyTheme(newTheme);
            storeTheme(newTheme);
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    function getStoredTheme() {
        try {
            return window.localStorage.getItem('theme');
        } catch (error) {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            window.localStorage.setItem('theme', theme);
        } catch (error) {
            // Storage may be unavailable (e.g., Safari private browsing)
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Optimized scroll-based navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Ultra-optimized scroll event
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initialize active navigation
    updateActiveNav();
    
    // Animate static charts on scroll (lightweight)
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate bar fills
                const barFills = entry.target.querySelectorAll('.bar-fill');
                barFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
                
                // Animate radar bars
                const radarBars = entry.target.querySelectorAll('.radar-bar');
                radarBars.forEach(bar => {
                    const height = bar.style.height;
                    bar.style.height = '0%';
                    setTimeout(() => {
                        bar.style.height = height;
                    }, 200);
                });
                
                // Animate donut segments
                const donutSegments = entry.target.querySelectorAll('.donut-segment');
                donutSegments.forEach(segment => {
                    const percentage = segment.style.getPropertyValue('--percentage');
                    segment.style.setProperty('--percentage', '0%');
                    setTimeout(() => {
                        segment.style.setProperty('--percentage', percentage);
                    }, 300);
                });
            }
        });
    }, observerOptions);
    
    // Observe all chart cards
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        chartObserver.observe(card);
    });
    
    // Decision tree functionality
    initializeDecisionTree();
    
    // Fixed navigation buttons functionality
    initializeFixedNavButtons();
});

// Decision tree functionality
function initializeDecisionTree() {
    const optionButtons = document.querySelectorAll('.option-btn');
    const recommendationResults = document.querySelectorAll('.recommendation-result');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPath = this.getAttribute('data-path');
            
            // Hide all recommendation results
            recommendationResults.forEach(result => {
                result.style.display = 'none';
            });
            
            // Show the selected recommendation
            const targetResult = document.getElementById(targetPath);
            if (targetResult) {
                targetResult.style.display = 'block';
                
                // Scroll to the result
                targetResult.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update button states
            optionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}


// Fixed navigation buttons functionality
function initializeFixedNavButtons() {
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    const menuToggleBtn = document.getElementById('menu-toggle');
    
    // Scroll up functionality
    scrollUpBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll down functionality
    scrollDownBtn.addEventListener('click', function() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Scroll down by one viewport height
        const nextScroll = Math.min(currentScroll + windowHeight, documentHeight - windowHeight);
        
        window.scrollTo({
            top: nextScroll,
            behavior: 'smooth'
        });
    });
    
    // Menu toggle functionality
    menuToggleBtn.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('mobile-open');
        
        // Toggle hamburger icon
        const icon = this.querySelector('svg');
        if (navMenu.classList.contains('mobile-open')) {
            icon.innerHTML = '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>';
        } else {
            icon.innerHTML = '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
        }
    });
}

// Utility functions (minimal)
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Tab functionality for comparison section
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const targetTab = button.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Initialize Charts
function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'bar',
            data: {
                labels: ['iPhone 17 Pro', 'Galaxy S25 Ultra', 'OnePlus 13', 'Pixel 10 Pro'],
                datasets: [{
                    label: 'AnTuTu Score (Millions)',
                    data: [2.45, 2.385, 2.39, 1.82],
                    backgroundColor: [
                        '#007AFF',
                        '#1F2937',
                        '#FF6B35',
                        '#4285F4'
                    ],
                    borderColor: [
                        '#0056CC',
                        '#111827',
                        '#E55A2B',
                        '#3367D6'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y.toFixed(2) + 'M points';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3,
                        ticks: {
                            callback: function(value) {
                                return value + 'M';
                            }
                        },
                        grid: {
                            color: '#E5E7EB'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Battery Chart
    const batteryCtx = document.getElementById('batteryChart');
    if (batteryCtx) {
        new Chart(batteryCtx, {
            type: 'doughnut',
            data: {
                labels: ['OnePlus 13', 'iPhone 16 Plus', 'Galaxy S25 Ultra', 'Pixel 10'],
                datasets: [{
                    data: [20, 14, 13, 7],
                    backgroundColor: [
                        '#10B981',
                        '#007AFF',
                        '#1F2937',
                        '#4285F4'
                    ],
                    borderColor: [
                        '#059669',
                        '#0056CC',
                        '#111827',
                        '#3367D6'
                    ],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + ' hours';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initializeCharts();
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for animations
    const cards = document.querySelectorAll('.summary-card, .device-card, .ai-feature-card, .recommendation-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Price calculator functionality
function calculateTCO(device, price, depreciation) {
    const years = 5;
    const resaleValue = price * (1 - depreciation);
    const totalCost = price - resaleValue;
    return Math.round(totalCost);
}

// Add price calculator to device cards
document.addEventListener('DOMContentLoaded', () => {
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        const priceElement = card.querySelector('h4');
        if (priceElement && priceElement.textContent.includes('₹')) {
            const priceMatch = priceElement.textContent.match(/₹([\d,]+)/);
            if (priceMatch) {
                const price = parseInt(priceMatch[1].replace(/,/g, ''));
                const depreciation = 0.7; // 70% depreciation over 5 years
                const tco = calculateTCO('device', price, depreciation);
                
                const tcoElement = document.createElement('div');
                tcoElement.className = 'tco-info';
                tcoElement.innerHTML = `
                    <div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981;">
                        <strong style="color: #10b981;">5-Year TCO:</strong> ₹${tco.toLocaleString()}
                        <br><small style="color: #64748b;">Including depreciation and resale value</small>
                    </div>
                `;
                card.appendChild(tcoElement);
            }
        }
    });
});

// Search functionality (if needed)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search devices, features, or specifications...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    // Add search to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.appendChild(searchContainer);
    }
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}

// Add comparison tool
function addComparisonTool() {
    const comparisonContainer = document.createElement('div');
    comparisonContainer.className = 'comparison-tool';
    comparisonContainer.innerHTML = `
        <div class="comparison-tool-header">
            <h3>Device Comparison Tool</h3>
            <p>Select up to 3 devices to compare side by side</p>
        </div>
        <div class="comparison-devices">
            <div class="device-selector">
                <select id="device1">
                    <option value="">Select Device 1</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                </select>
            </div>
            <div class="device-selector">
                <select id="device2">
                    <option value="">Select Device 2</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                </select>
            </div>
            <div class="device-selector">
                <select id="device3">
                    <option value="">Select Device 3</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                </select>
            </div>
        </div>
        <div class="comparison-results" id="comparisonResults">
            <!-- Results will be populated here -->
        </div>
    `;
    
    // Add to comparison section
    const comparisonSection = document.getElementById('comparison');
    if (comparisonSection) {
        comparisonSection.appendChild(comparisonContainer);
    }
    
    // Device data
    const deviceData = {
        iphone17: {
            name: 'iPhone 17 Pro',
            price: '₹1,34,900',
            performance: '95/100',
            camera: '95/100',
            battery: '90/100',
            ai: '85/100'
        },
        galaxy25: {
            name: 'Galaxy S25 Ultra',
            price: '₹1,29,999',
            performance: '92/100',
            camera: '98/100',
            battery: '88/100',
            ai: '80/100'
        },
        pixel10: {
            name: 'Pixel 10 Pro',
            price: '₹1,09,999',
            performance: '65/100',
            camera: '95/100',
            battery: '75/100',
            ai: '95/100'
        },
        oneplus13: {
            name: 'OnePlus 13',
            price: '₹69,999',
            performance: '95/100',
            camera: '82/100',
            battery: '95/100',
            ai: '75/100'
        }
    };
    
    // Comparison functionality
    function updateComparison() {
        const device1 = document.getElementById('device1').value;
        const device2 = document.getElementById('device2').value;
        const device3 = document.getElementById('device3').value;
        const results = document.getElementById('comparisonResults');
        
        const selectedDevices = [device1, device2, device3].filter(d => d);
        
        if (selectedDevices.length === 0) {
            results.innerHTML = '<p>Select at least one device to compare</p>';
            return;
        }
        
        let comparisonHTML = '<div class="comparison-table"><table><thead><tr><th>Feature</th>';
        selectedDevices.forEach(device => {
            comparisonHTML += `<th>${deviceData[device].name}</th>`;
        });
        comparisonHTML += '</tr></thead><tbody>';
        
        const features = ['price', 'performance', 'camera', 'battery', 'ai'];
        const featureLabels = ['Price', 'Performance', 'Camera', 'Battery Life', 'AI Features'];
        
        features.forEach((feature, index) => {
            comparisonHTML += `<tr><td>${featureLabels[index]}</td>`;
            selectedDevices.forEach(device => {
                comparisonHTML += `<td>${deviceData[device][feature]}</td>`;
            });
            comparisonHTML += '</tr>';
        });
        
        comparisonHTML += '</tbody></table></div>';
        results.innerHTML = comparisonHTML;
    }
    
    // Add event listeners
    document.getElementById('device1').addEventListener('change', updateComparison);
    document.getElementById('device2').addEventListener('change', updateComparison);
    document.getElementById('device3').addEventListener('change', updateComparison);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add search functionality
    addSearchFunctionality();
    
    // Add comparison tool
    addComparisonTool();
    
    // Add loading states
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize performance tracking
trackPerformance();

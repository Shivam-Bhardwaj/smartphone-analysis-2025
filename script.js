// Professional Smartphone Analysis 2025 - Interactive Features

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize visual elements
    initializePerformanceChart();
    initializeDeviceModal();
    
    // Initialize comparison tool
    addComparisonTool();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add scroll effects
    addScrollEffects();
});

// Tab Functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.textContent.toLowerCase().replace(/\s+/g, '-');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Show specific tab
function showTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to target
    const targetButton = Array.from(tabButtons).find(btn => 
        btn.textContent.toLowerCase().replace(/\s+/g, '-') === tabName
    );
    const targetContent = document.getElementById(tabName);
    
    if (targetButton) targetButton.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

// Smooth Scrolling
function addSmoothScrolling() {
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
}

// Scroll Effects
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.summary-card, .device-card, .ai-feature-card, .recommendation-card, .use-case-card, .ecosystem-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Interactive Device Comparison Tool
function addComparisonTool() {
    const comparisonContainer = document.createElement('div');
    comparisonContainer.className = 'comparison-tool';
    comparisonContainer.innerHTML = `
        <div class="comparison-tool-header">
            <h3>Interactive Device Comparison Tool</h3>
            <p>Select up to 3 devices to compare side by side with detailed specifications</p>
        </div>
        <div class="comparison-devices">
            <div class="device-selector">
                <label for="device1">Device 1:</label>
                <select id="device1">
                    <option value="">Select Device 1</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                    <option value="xiaomi15">Xiaomi 15</option>
                </select>
            </div>
            <div class="device-selector">
                <label for="device2">Device 2:</label>
                <select id="device2">
                    <option value="">Select Device 2</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                    <option value="xiaomi15">Xiaomi 15</option>
                </select>
            </div>
            <div class="device-selector">
                <label for="device3">Device 3:</label>
                <select id="device3">
                    <option value="">Select Device 3</option>
                    <option value="iphone17">iPhone 17 Pro</option>
                    <option value="galaxy25">Galaxy S25 Ultra</option>
                    <option value="pixel10">Pixel 10 Pro</option>
                    <option value="oneplus13">OnePlus 13</option>
                    <option value="xiaomi15">Xiaomi 15</option>
                </select>
            </div>
        </div>
        <div class="comparison-results" id="comparisonResults">
            <div class="comparison-placeholder">
                <p>Select devices above to see detailed comparison</p>
            </div>
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
            chipset: 'A19 Pro (3nm)',
            display: '6.3" LTPO OLED, 120Hz',
            camera: '48MP main, 12MP ultrawide, 12MP telephoto',
            battery: '3,500mAh, 20W charging',
            performance: 'Single: 4,100 | Multi: 10,200',
            aiScore: '95/100',
            cameraScore: '95/100',
            ecosystemScore: '98/100'
        },
        galaxy25: {
            name: 'Galaxy S25 Ultra',
            price: '₹1,29,999',
            chipset: 'Snapdragon 8 Elite',
            display: '6.8" Dynamic AMOLED 2X, 120Hz',
            camera: '200MP main, 50MP periscope, 12MP ultrawide, 10MP telephoto',
            battery: '5,000mAh, 45W charging',
            performance: 'Single: 3,001 | Multi: 9,381',
            aiScore: '88/100',
            cameraScore: '98/100',
            ecosystemScore: '85/100'
        },
        pixel10: {
            name: 'Pixel 10 Pro',
            price: '₹79,999',
            chipset: 'Google Tensor G5',
            display: '6.2" LTPO OLED, 120Hz',
            camera: '50MP main, 12MP ultrawide, 48MP telephoto',
            battery: '4,500mAh, 30W charging',
            performance: 'Single: 2,333 | Multi: 6,375',
            aiScore: '95/100',
            cameraScore: '95/100',
            ecosystemScore: '82/100'
        },
        oneplus13: {
            name: 'OnePlus 13',
            price: '₹69,999',
            chipset: 'Snapdragon 8 Elite',
            display: '6.8" LTPO OLED, 120Hz',
            camera: '50MP main, 12MP ultrawide, 64MP periscope',
            battery: '5,400mAh, 100W charging',
            performance: 'Single: 2,965 | Multi: 9,271',
            aiScore: '75/100',
            cameraScore: '82/100',
            ecosystemScore: '78/100'
        },
        xiaomi15: {
            name: 'Xiaomi 15',
            price: '₹64,999',
            chipset: 'Snapdragon 8 Elite',
            display: '6.36" LTPO OLED, 120Hz',
            camera: '50MP Leica main, 12MP ultrawide, 50MP telephoto',
            battery: '4,600mAh, 90W charging',
            performance: 'Single: 2,890 | Multi: 8,950',
            aiScore: '70/100',
            cameraScore: '85/100',
            ecosystemScore: '72/100'
        }
    };
    
    // Add event listeners for device selection
    const deviceSelectors = ['device1', 'device2', 'device3'];
    deviceSelectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        if (selector) {
            selector.addEventListener('change', updateComparison);
        }
    });
    
    function updateComparison() {
        const selectedDevices = [];
        deviceSelectors.forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            if (selector && selector.value) {
                selectedDevices.push(selector.value);
            }
        });
        
        const resultsContainer = document.getElementById('comparisonResults');
        if (!resultsContainer) return;
        
        if (selectedDevices.length === 0) {
            resultsContainer.innerHTML = `
                <div class="comparison-placeholder">
                    <p>Select devices above to see detailed comparison</p>
                </div>
            `;
            return;
        }
        
        // Create comparison table
        const table = document.createElement('table');
        table.className = 'comparison-table';
        
        // Table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Specification</th>';
        selectedDevices.forEach(deviceId => {
            const device = deviceData[deviceId];
            headerRow.innerHTML += `<th>${device.name}</th>`;
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Table body
        const tbody = document.createElement('tbody');
        const specs = [
            { label: 'Price', key: 'price' },
            { label: 'Chipset', key: 'chipset' },
            { label: 'Display', key: 'display' },
            { label: 'Camera', key: 'camera' },
            { label: 'Battery', key: 'battery' },
            { label: 'Performance', key: 'performance' },
            { label: 'AI Score', key: 'aiScore' },
            { label: 'Camera Score', key: 'cameraScore' },
            { label: 'Ecosystem Score', key: 'ecosystemScore' }
        ];
        
        specs.forEach(spec => {
            const row = document.createElement('tr');
            row.innerHTML = `<td><strong>${spec.label}</strong></td>`;
            selectedDevices.forEach(deviceId => {
                const device = deviceData[deviceId];
                row.innerHTML += `<td>${device[spec.key]}</td>`;
            });
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        
        // Update results container
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states for better UX
function addLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
    } else {
        element.classList.remove('loading');
    }
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Add analytics tracking for user interactions
function trackInteraction(action, element) {
    // This would integrate with your analytics platform
    console.log(`User interaction: ${action} on ${element}`);
}

// Add click tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="http"]')) {
        trackInteraction('external_link_click', e.target.href);
    }
    
    if (e.target.matches('.device-preview')) {
        trackInteraction('device_preview_click', e.target.textContent);
    }
    
    if (e.target.matches('.tab-button')) {
        trackInteraction('tab_click', e.target.textContent);
    }
});

// Performance Chart Initialization
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Performance', 'Camera', 'AI Features', 'Ecosystem', 'Value', 'Battery'],
            datasets: [{
                label: 'iPhone 17 Pro',
                data: [95, 95, 85, 98, 70, 80],
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                borderWidth: 2
            }, {
                label: 'Galaxy S25 Ultra',
                data: [92, 98, 75, 85, 88, 90],
                borderColor: '#000000',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2
            }, {
                label: 'Pixel 10 Pro',
                data: [65, 95, 95, 82, 85, 85],
                borderColor: '#4285F4',
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderWidth: 2
            }, {
                label: 'OnePlus 13',
                data: [95, 82, 70, 78, 90, 95],
                borderColor: '#EB0029',
                backgroundColor: 'rgba(235, 0, 41, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Device Modal Functionality
function initializeDeviceModal() {
    const modal = document.getElementById('deviceModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show Device Details
function showDeviceDetails(deviceId) {
    const modal = document.getElementById('deviceModal');
    const modalContent = document.getElementById('modalContent');
    
    const deviceData = {
        iphone17: {
            name: 'iPhone 17 Pro',
            price: '₹1,34,900',
            chipset: 'A19 Pro (3nm TSMC N3P)',
            display: '6.3" LTPO OLED, 120Hz ProMotion',
            camera: '48MP main, 12MP ultrawide, 12MP telephoto (3x)',
            battery: '3,500mAh, 20W charging',
            performance: 'Single: 4,100 | Multi: 10,200',
            aiScore: '85/100',
            cameraScore: '95/100',
            ecosystemScore: '98/100',
            highlights: [
                'Best ecosystem integration',
                'Superior video recording',
                'Longest software support',
                'Premium build quality'
            ]
        },
        galaxy25: {
            name: 'Galaxy S25 Ultra',
            price: '₹1,29,999',
            chipset: 'Snapdragon 8 Elite (custom variant)',
            display: '6.8" Dynamic AMOLED 2X, 120Hz',
            camera: '200MP main, 50MP periscope, 12MP ultrawide, 10MP telephoto',
            battery: '5,000mAh, 45W charging',
            performance: 'Single: 3,001 | Multi: 9,381',
            aiScore: '75/100',
            cameraScore: '98/100',
            ecosystemScore: '85/100',
            highlights: [
                'Best camera system overall',
                'S Pen productivity features',
                '7-year software updates',
                'Excellent value proposition'
            ]
        },
        pixel10: {
            name: 'Pixel 10 Pro',
            price: '₹79,999',
            chipset: 'Google Tensor G5 (4nm)',
            display: '6.2" LTPO OLED, 120Hz',
            camera: '50MP main, 12MP ultrawide, 48MP telephoto',
            battery: '4,500mAh, 30W charging',
            performance: 'Single: 2,333 | Multi: 6,375',
            aiScore: '95/100',
            cameraScore: '95/100',
            ecosystemScore: '82/100',
            highlights: [
                'Best AI features and implementation',
                'Superior computational photography',
                '8-year software support',
                'Clean Android experience'
            ]
        },
        oneplus13: {
            name: 'OnePlus 13',
            price: '₹69,999',
            chipset: 'Snapdragon 8 Elite',
            display: '6.8" LTPO OLED, 120Hz',
            camera: '50MP main, 12MP ultrawide, 64MP periscope',
            battery: '5,400mAh, 100W charging',
            performance: 'Single: 2,965 | Multi: 9,271',
            aiScore: '70/100',
            cameraScore: '82/100',
            ecosystemScore: '78/100',
            highlights: [
                'Fastest charging (100W)',
                'Excellent price-performance ratio',
                'Clean, fast software',
                'Good gaming performance'
            ]
        }
    };
    
    const device = deviceData[deviceId];
    if (!device) return;
    
    modalContent.innerHTML = `
        <div class="device-modal-content">
            <div class="modal-header">
                <h2>${device.name}</h2>
                <div class="modal-price">${device.price}</div>
            </div>
            
            <div class="modal-specs">
                <div class="spec-grid">
                    <div class="spec-item">
                        <span class="spec-label">Chipset</span>
                        <span class="spec-value">${device.chipset}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Display</span>
                        <span class="spec-value">${device.display}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Camera</span>
                        <span class="spec-value">${device.camera}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Battery</span>
                        <span class="spec-value">${device.battery}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-scores">
                <h3>Performance Scores</h3>
                <div class="score-grid">
                    <div class="score-item">
                        <span class="score-label">AI Features</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${device.aiScore}"></div>
                        </div>
                        <span class="score-value">${device.aiScore}</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Camera</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${device.cameraScore}"></div>
                        </div>
                        <span class="score-value">${device.cameraScore}</span>
                    </div>
                    <div class="score-item">
                        <span class="score-label">Ecosystem</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${device.ecosystemScore}"></div>
                        </div>
                        <span class="score-value">${device.ecosystemScore}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-highlights">
                <h3>Key Highlights</h3>
                <ul>
                    ${device.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}
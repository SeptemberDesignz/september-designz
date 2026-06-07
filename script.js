// ============================================
// SEPTEMBER DESIGNZ - SINGLE PAGE APP
// All pages in one HTML file
// ============================================

// Default content
const defaultContent = {
    stats: { projects: 156, clients: 98, years: 5, countries: 12 },
    services: [
        { name: "Graphic Design", icon: "fa-palette", description: "Stunning logos, brand identities, and social media visuals.", features: ["Logo Design", "Brand Guidelines", "Social Media Kits", "Flyers & Posters", "Business Cards", "Packaging Design"], price: 25000, featured: false, longDesc: "Our graphic design service delivers professional, eye-catching visuals that communicate your brand's message effectively. From logos to complete brand identities, we ensure every detail is polished and memorable." },
        { name: "Web Development", icon: "fa-code", description: "Custom, responsive websites that load fast and convert visitors into customers.", features: ["Responsive Design", "SEO Optimized", "CMS Integration", "E-commerce", "SSL Security", "Speed Optimization"], price: 350000, featured: true, longDesc: "We build modern, fast, and secure websites tailored to your business needs. Whether it's a portfolio, corporate site, or online store, we deliver exceptional quality with clean code." },
        { name: "UI/UX Design", icon: "fa-mobile-alt", description: "Beautiful, intuitive interfaces that deliver exceptional user experiences.", features: ["Wireframing", "Prototyping", "User Testing", "Mobile App Design", "Dashboard Design", "Interaction Design"], price: 125000, featured: false, longDesc: "Our UI/UX design process ensures your product is not only beautiful but also easy to use. We focus on user-centered design to maximize engagement and satisfaction." }
    ],
    flyers: [
        { image: "images/flyer-1.png", category: "Business Flyer", title: "Corporate Event Flyer", description: "Professional flyer design for corporate events and business promotions. Clean, modern, and effective." },
        { image: "images/flyer-2.jpg", category: "Promotional", title: "Event Promotional Flyer", description: "High-impact promotional flyers for product launches and special events that grab attention." },
        { image: "images/flyer-3.jpg", category: "Transportation", title: "Transportation Flyer", description: "Custom flyers for transport companies, travel agencies, and logistics businesses." },
        { image: "images/flyer-4.png", category: "Store Design", title: "Online Store Flyer", description: "E-commerce flyers to promote online stores, flash sales, and special offers." },
        { image: "images/flyer-5.png", category: "Social Media", title: "Instagram Post Design", description: "Social media graphics optimized for Instagram, Facebook, Twitter, and LinkedIn." },
        { image: "images/flyer-6.jpg", category: "Church", title: "Church Flyer", description: "Event flyers for church programs, conferences, concerts, and community events." }
    ],
    portfolio: [
        { image: "images/portfolio-1.jpg", title: "Brand Identity Package", category: "Graphic Design", description: "Complete brand identity including logo, color palette, typography, and brand guidelines for a tech startup. The client saw a 40% increase in brand recognition." },
        { image: "images/portfolio-2.jpg", title: "E-commerce Website", category: "Web Development", description: "Fully responsive online store with payment integration, product management, and SEO optimization. Increased sales by 150% in first 3 months." },
        { image: "images/portfolio-3.jpg", title: "Mobile Banking App", category: "UI/UX Design", description: "User-friendly mobile banking interface with seamless navigation and modern design. Rated 4.8 stars on app stores." }
    ],
    typingWords: ["Creative Designs.", "Brand Identity.", "Web Solutions.", "UI/UX Magic.", "Digital Success."],
    heroSubtitle: "We transform bold ideas into stunning digital experiences that drive results. Let's build something extraordinary together."
};

// Load content from localStorage
let websiteContent = JSON.parse(localStorage.getItem('websiteContent'));
if (!websiteContent) {
    websiteContent = defaultContent;
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
}

// Current active page
let currentPage = 'home';

// ========== PAGE SWITCHING ==========
function switchPage(page) {
    currentPage = page;
    
    // Hide all page containers
    document.querySelectorAll('.page-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Show selected page
    const activePage = document.getElementById(`${page}Page`);
    if (activePage) {
        activePage.style.display = 'block';
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    // Update browser URL hash (for back button support)
    window.location.hash = page;
    
    // Load page-specific content
    if (page === 'home') {
        renderPreviewServices();
        startTypingAnimation();
        setHeroSubtitle();
        loadStats();
        startCounters();
    } else if (page === 'services') {
        renderServicesPage();
    } else if (page === 'portfolio') {
        renderPortfolioPage();
    } else if (page === 'flyers') {
        renderFlyersPage();
    } else if (page === 'book') {
        populateServiceDropdown();
        initBookingForm();
    }
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'home';
    if (['home', 'services', 'portfolio', 'flyers', 'book'].includes(hash)) {
        switchPage(hash);
    }
});

// ========== RENDER FUNCTIONS ==========
function loadStats() {
    const projectsEl = document.getElementById('projectsCount');
    const clientsEl = document.getElementById('clientsCount');
    const yearsEl = document.getElementById('yearsCount');
    const countriesEl = document.getElementById('countriesCount');
    
    if (projectsEl) projectsEl.innerText = websiteContent.stats.projects;
    if (clientsEl) clientsEl.innerText = websiteContent.stats.clients;
    if (yearsEl) yearsEl.innerText = websiteContent.stats.years;
    if (countriesEl) countriesEl.innerText = websiteContent.stats.countries;
}

function startCounters() {
    const projectsEl = document.getElementById('projectsCount');
    if (!projectsEl) return;
    
    let currentProjects = 0, currentClients = 0, currentYears = 0, currentCountries = 0;
    const targetProjects = websiteContent.stats.projects;
    const targetClients = websiteContent.stats.clients;
    const targetYears = websiteContent.stats.years;
    const targetCountries = websiteContent.stats.countries;
    
    const interval = setInterval(() => {
        let allDone = true;
        if (currentProjects < targetProjects) { allDone = false; currentProjects++; projectsEl.innerText = currentProjects; }
        if (currentClients < targetClients) { allDone = false; currentClients++; document.getElementById('clientsCount').innerText = currentClients; }
        if (currentYears < targetYears) { allDone = false; currentYears++; document.getElementById('yearsCount').innerText = currentYears; }
        if (currentCountries < targetCountries) { allDone = false; currentCountries++; document.getElementById('countriesCount').innerText = currentCountries; }
        if (allDone) clearInterval(interval);
    }, 30);
}

function setHeroSubtitle() {
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.innerText = websiteContent.heroSubtitle;
}

// Typing animation
let wordIndex = 0, charIndex = 0, isDeleting = false;
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    function typeEffect() {
        const currentWord = websiteContent.typingWords[wordIndex];
        if (isDeleting) {
            typingElement.innerHTML = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.innerHTML = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % websiteContent.typingWords.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 80 : 120);
        }
    }
    typeEffect();
}

function renderPreviewServices() {
    const container = document.getElementById('previewServices');
    if (!container) return;
    const services = websiteContent.services.slice(0, 3);
    container.innerHTML = services.map(service => `
        <div class="service-card ${service.featured ? 'featured' : ''}">
            ${service.featured ? '<div class="popular-badge">Most Popular</div>' : ''}
            <div class="service-icon"><i class="fas ${service.icon}"></i></div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="price">From <span>MWK ${service.price.toLocaleString()}</span></div>
            <button class="btn btn-outline" onclick="switchPage('book')" style="width:100%;">Get Started →</button>
        </div>
    `).join('');
}

function renderServicesPage() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    const services = websiteContent.services;
    container.innerHTML = services.map(service => `
        <div class="service-card ${service.featured ? 'featured' : ''}">
            ${service.featured ? '<div class="popular-badge">Most Popular</div>' : ''}
            <div class="service-icon"><i class="fas ${service.icon}"></i></div>
            <h2>${service.name}</h2>
            <p class="description">${service.longDesc || service.description}</p>
            <div class="features-list">${(service.features || []).map(f => `<span><i class="fas fa-check-circle"></i> ${f}</span>`).join('')}</div>
            <div class="price">Starting from <span>MWK ${service.price.toLocaleString()}</span></div>
            <button class="btn btn-outline" onclick="switchPage('book')" style="width:100%;">Get This Service →</button>
        </div>
    `).join('');
}

function renderPortfolioPage() {
    const container = document.getElementById('portfolioGrid');
    if (!container) return;
    const portfolio = websiteContent.portfolio;
    container.innerHTML = portfolio.map(item => `
        <div class="portfolio-card">
            <div class="portfolio-image"><img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/600x400/e0e0e0/5f6368?text=Project+Image'"></div>
            <div class="portfolio-info">
                <span class="portfolio-category">${item.category}</span>
                <h2>${item.title}</h2>
                <p class="portfolio-description">${item.description || "A successful project delivered with excellence."}</p>
            </div>
        </div>
    `).join('');
}

function renderFlyersPage() {
    const container = document.getElementById('flyersGrid');
    if (!container) return;
    const flyers = websiteContent.flyers;
    container.innerHTML = flyers.map(flyer => `
        <div class="flyer-card">
            <div class="flyer-image"><img src="${flyer.image}" alt="${flyer.title}" onerror="this.src='https://placehold.co/400x320/e0e0e0/5f6368?text=Flyer+Image'"></div>
            <div class="flyer-info">
                <span class="flyer-category">${flyer.category}</span>
                <h2>${flyer.title}</h2>
                <p>${flyer.description || "Professional design tailored to your brand."}</p>
            </div>
        </div>
    `).join('');
}

function populateServiceDropdown() {
    const serviceSelect = document.getElementById('service');
    if (!serviceSelect) return;
    serviceSelect.innerHTML = websiteContent.services.map(service => 
        `<option value="${service.name}">${service.name} - MWK ${(service.price || 0).toLocaleString()}</option>`
    ).join('');
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showMessage(msg, type, elementId = 'formMessage') {
    const div = document.getElementById(elementId);
    if (!div) return;
    div.innerHTML = `<div style="background:${type === 'success' ? '#e6f4ea' : '#fce8e6'}; padding:12px; border-radius:16px; color:${type === 'success' ? '#0f9d58' : '#d93025'};">${msg}</div>`;
    setTimeout(() => div.innerHTML = '', 5000);
}

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!name || !email) { showMessage('Please fill in name and email', 'error'); return; }
        
        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        const booking = { id: Date.now(), name, email, service: document.getElementById('service').value, date: document.getElementById('date').value || '', details: document.getElementById('details').value || '', timestamp: new Date().toISOString() };
        let bookings = JSON.parse(localStorage.getItem('september_bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('september_bookings', JSON.stringify(bookings));
        
        showMessage(`✅ Thanks ${name}! Your booking has been saved. I'll contact you within 24 hours.`, 'success');
        showToast('Booking submitted successfully!');
        bookingForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) navLinks.style.display = 'flex';
            else navLinks.style.display = 'none';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    const initialPage = window.location.hash.substring(1) || 'home';
    switchPage(initialPage);
});
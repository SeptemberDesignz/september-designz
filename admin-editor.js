// ============================================
// ADMIN CONTENT EDITOR
// ============================================

let websiteContent = JSON.parse(localStorage.getItem('websiteContent'));

function updateStats() {
    websiteContent.stats = {
        projects: parseInt(document.getElementById('editProjects').value),
        clients: parseInt(document.getElementById('editClients').value),
        years: parseInt(document.getElementById('editYears').value),
        countries: parseInt(document.getElementById('editCountries').value)
    };
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    showNotification('Stats updated! Refresh page to see changes.', 'success');
}

function loadStatsToForm() {
    document.getElementById('editProjects').value = websiteContent.stats.projects;
    document.getElementById('editClients').value = websiteContent.stats.clients;
    document.getElementById('editYears').value = websiteContent.stats.years;
    document.getElementById('editCountries').value = websiteContent.stats.countries;
}

function addService() {
    const name = prompt('Enter service name:');
    if (!name) return;
    const price = parseInt(prompt('Enter price (MWK):'));
    const description = prompt('Enter description:');
    const featured = confirm('Featured service?');
    websiteContent.services.push({
        name: name, icon: "fa-palette", description: description,
        features: ["Feature 1", "Feature 2"], price: price, featured: featured
    });
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderServicesList();
    showNotification('Service added!', 'success');
}

function editService(index) {
    const s = websiteContent.services[index];
    s.name = prompt('Edit name:', s.name) || s.name;
    s.price = parseInt(prompt('Edit price:', s.price)) || s.price;
    s.description = prompt('Edit description:', s.description) || s.description;
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderServicesList();
    showNotification('Service updated!', 'success');
}

function deleteService(index) {
    if (confirm('Delete this service?')) {
        websiteContent.services.splice(index, 1);
        localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
        renderServicesList();
        showNotification('Service deleted!', 'success');
    }
}

function renderServicesList() {
    const container = document.getElementById('servicesList');
    if (!container) return;
    container.innerHTML = websiteContent.services.map((s, i) => `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; margin: 10px 0; border-radius: 12px;">
            <strong>${s.name}</strong> - MWK${s.price.toLocaleString()} ${s.featured ? '⭐' : ''}
            <p style="font-size: 12px; margin-top: 5px;">${s.description.substring(0, 80)}...</p>
            <div style="margin-top: 10px;">
                <button onclick="editService(${i})" style="background: #c084fc; border: none; color: white; padding: 5px 15px; border-radius: 20px; margin-right: 10px;">Edit</button>
                <button onclick="deleteService(${i})" style="background: #ef4444; border: none; color: white; padding: 5px 15px; border-radius: 20px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function addFlyer() {
    const image = prompt('Enter image path (e.g., images/flyer-new.jpg):');
    if (!image) return;
    const category = prompt('Enter category:');
    const title = prompt('Enter title:');
    websiteContent.flyers.push({ image, category, title });
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderFlyersList();
    showNotification('Flyer added!', 'success');
}

function editFlyer(index) {
    const f = websiteContent.flyers[index];
    f.image = prompt('Edit image path:', f.image) || f.image;
    f.category = prompt('Edit category:', f.category) || f.category;
    f.title = prompt('Edit title:', f.title) || f.title;
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderFlyersList();
    showNotification('Flyer updated!', 'success');
}

function deleteFlyer(index) {
    if (confirm('Delete this flyer?')) {
        websiteContent.flyers.splice(index, 1);
        localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
        renderFlyersList();
        showNotification('Flyer deleted!', 'success');
    }
}

function renderFlyersList() {
    const container = document.getElementById('flyersList');
    if (!container) return;
    container.innerHTML = websiteContent.flyers.map((f, i) => `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; margin: 10px 0; border-radius: 12px;">
            <strong>${f.title}</strong> (${f.category})
            <br><small>Image: ${f.image}</small>
            <div style="margin-top: 10px;">
                <button onclick="editFlyer(${i})" style="background: #c084fc; border: none; color: white; padding: 5px 15px; border-radius: 20px; margin-right: 10px;">Edit</button>
                <button onclick="deleteFlyer(${i})" style="background: #ef4444; border: none; color: white; padding: 5px 15px; border-radius: 20px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function addPortfolio() {
    const image = prompt('Enter image path (e.g., images/portfolio-new.jpg):');
    if (!image) return;
    const title = prompt('Enter project title:');
    const category = prompt('Enter category:');
    websiteContent.portfolio.push({ image, title, category });
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderPortfolioList();
    showNotification('Portfolio added!', 'success');
}

function editPortfolio(index) {
    const p = websiteContent.portfolio[index];
    p.image = prompt('Edit image path:', p.image) || p.image;
    p.title = prompt('Edit title:', p.title) || p.title;
    p.category = prompt('Edit category:', p.category) || p.category;
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    renderPortfolioList();
    showNotification('Portfolio updated!', 'success');
}

function deletePortfolio(index) {
    if (confirm('Delete this portfolio item?')) {
        websiteContent.portfolio.splice(index, 1);
        localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
        renderPortfolioList();
        showNotification('Portfolio deleted!', 'success');
    }
}

function renderPortfolioList() {
    const container = document.getElementById('portfolioList');
    if (!container) return;
    container.innerHTML = websiteContent.portfolio.map((p, i) => `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; margin: 10px 0; border-radius: 12px;">
            <strong>${p.title}</strong> (${p.category})
            <br><small>Image: ${p.image}</small>
            <div style="margin-top: 10px;">
                <button onclick="editPortfolio(${i})" style="background: #c084fc; border: none; color: white; padding: 5px 15px; border-radius: 20px; margin-right: 10px;">Edit</button>
                <button onclick="deletePortfolio(${i})" style="background: #ef4444; border: none; color: white; padding: 5px 15px; border-radius: 20px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateHeroText() {
    websiteContent.typingWords = document.getElementById('editTypingWords').value.split(',').map(w => w.trim());
    websiteContent.heroSubtitle = document.getElementById('editHeroSubtitle').value;
    localStorage.setItem('websiteContent', JSON.stringify(websiteContent));
    showNotification('Hero text updated! Refresh page to see changes.', 'success');
}

function loadHeroToForm() {
    document.getElementById('editTypingWords').value = websiteContent.typingWords.join(', ');
    document.getElementById('editHeroSubtitle').value = websiteContent.heroSubtitle;
}

function resetToDefault() {
    if (confirm('⚠️ RESET ALL CONTENT TO DEFAULT? This cannot be undone!')) {
        const defaultContent = {
            stats: { projects: 156, clients: 98, years: 5, countries: 12 },
            services: [
                { name: "Graphic Design", icon: "fa-palette", description: "Stunning logos, brand identities, and social media visuals.", features: ["Logo Design", "Brand Guidelines", "Social Media Kits", "Flyers & Posters"], price: 25000, featured: false },
                { name: "Web Development", icon: "fa-code", description: "Custom, responsive websites that load fast and convert.", features: ["Responsive Design", "SEO Optimized", "CMS Integration"], price: 350000, featured: true },
                { name: "UI/UX Design", icon: "fa-mobile-alt", description: "Beautiful, intuitive interfaces that deliver exceptional experiences.", features: ["Wireframing", "Prototyping", "User Testing"], price: 125000, featured: false }
            ],
            flyers: [
                { image: "images/flyer-1.png", category: "Business Flyer", title: "Corporate Event Flyer" },
                { image: "images/flyer-2.jpg", category: "Promotional", title: "Event or Promotional Flyer" },
                { image: "images/flyer-3.jpg", category: "Transportation", title: "Transportation Flyer" },
                { image: "images/flyer-4.png", category: "Store Design", title: "Online Store Flyer" },
                { image: "images/flyer-5.png", category: "Social Media", title: "Instagram Post Design" },
                { image: "images/flyer-6.jpg", category: "Church", title: "Church Flyer" }
            ],
            portfolio: [
                { image: "images/portfolio-1.jpg", title: "Brand Identity", category: "Graphic Design" },
                { image: "images/portfolio-2.jpg", title: "E-commerce", category: "Web Development" },
                { image: "images/portfolio-3.jpg", title: "Mobile App", category: "UI/UX Design" }
            ],
            typingWords: ["Creative Designs.", "Brand Identity.", "Web Solutions.", "UI/UX Magic.", "Digital Success."],
            heroSubtitle: "We transform bold ideas into stunning digital experiences that drive results. Let's build something extraordinary together."
        };
        localStorage.setItem('websiteContent', JSON.stringify(defaultContent));
        location.reload();
    }
}

function showNotification(msg, type) {
    const div = document.createElement('div');
    div.style.cssText = `position:fixed; bottom:20px; right:20px; background:${type === 'success' ? '#10b981' : '#ef4444'}; color:white; padding:12px 24px; border-radius:40px; z-index:9999;`;
    div.innerHTML = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('editProjects')) {
        loadStatsToForm();
        loadHeroToForm();
        renderServicesList();
        renderFlyersList();
        renderPortfolioList();
    }
});
// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');

function getPriceFromService(serviceText) {
    if (serviceText.includes('Graphic')) return 299;
    if (serviceText.includes('Web')) return 799;
    if (serviceText.includes('UI/UX')) return 499;
    return 0;
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.innerHTML = `
        <div style="background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; 
                    border: 1px solid ${type === 'success' ? '#10b981' : '#ef4444'}; 
                    border-radius: 12px; 
                    padding: 12px; 
                    color: ${type === 'success' ? '#10b981' : '#ef4444'};">
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const serviceSelect = document.getElementById('service');
        const service = serviceSelect.value;
        const price = getPriceFromService(service);
        const date = document.getElementById('date').value;
        const details = document.getElementById('details').value;
        
        if (!name || !email) {
            showMessage('❌ Please fill in your name and email', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showMessage('❌ Please enter a valid email address', 'error');
            return;
        }
        
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const booking = {
            id: Date.now(),
            name: name,
            email: email,
            service: service,
            price: price,
            date: date,
            details: details,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        let bookings = JSON.parse(localStorage.getItem('september_bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('september_bookings', JSON.stringify(bookings));
        
        showMessage(`✅ Thanks ${name}! Your booking request for ${service} ($${price}) has been saved. I'll contact you at ${email} within 24 hours.`, 'success');
        
        bookingForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Send email notification (would require backend)
        console.log('Booking saved:', booking);
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary, .service-btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Mobile menu toggle (optional enhancement)
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Add some console flair
console.log('%c✨ September Designz | Premium Design & Development Agency ✨', 'color: #c084fc; font-size: 16px; font-weight: bold;');
console.log('%cAdmin Dashboard: admin.html', 'color: #10b981; font-size: 12px;');

// Auto-hide navbar on scroll (optional)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});
// DigiRise Style JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DigiRise style site loaded');

    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animatable elements
    document.querySelectorAll('.section, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 200);
        });
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '送信完了！';
                submitBtn.style.background = '#22c55e';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add scroll-triggered animations to elements
    const animateElements = document.querySelectorAll('.stat-card, .skill-category, .timeline-item, .vision-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const speed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add subtle animations on load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const heroTitle = document.querySelector('.hero-title');
const heroDescription = document.querySelector('.hero-description');
const heroButtons = document.querySelector('.hero-buttons');
const scrollIndicator = document.querySelector('.scroll-indicator');
const contactForm = document.getElementById('contactForm');

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out'
    });
    
    gsap.to(cursorFollower, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out'
    });
});

// Handle cursor interactions
document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('button, a, input, textarea')) {
        gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.2 });
        gsap.to(cursorFollower, { scale: 1.5, opacity: 0.3, duration: 0.3 });
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('button, a, input, textarea')) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(cursorFollower, { scale: 1, opacity: 0.5, duration: 0.3 });
    }
}, true);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileNav.style.display === 'block') {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Hero section animations
window.addEventListener('load', () => {
    // Animate hero title characters
    const titleChars = heroTitle.querySelectorAll('span');
    gsap.fromTo(titleChars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.5
        }
    );
    
    // Animate hero description
    gsap.fromTo(heroDescription,
        { y: 60, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
    );
    
    // Animate hero buttons
    gsap.fromTo(heroButtons,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.5 }
    );
    
    // Animate scroll indicator
    gsap.fromTo(scrollIndicator,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 2 }
    );
    
    // Animate floating elements
    gsap.to('.floating-circle', {
        y: -20,
        duration: 6,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });
    
    gsap.to('.floating-triangle', {
        y: -15,
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1
    });
    
    gsap.to('.floating-square', {
        y: -25,
        rotation: -360,
        duration: 10,
        ease: 'none',
        repeat: -1
    });
});

// Hero parallax effect
gsap.to('.hero-bg', {
    y: 300,
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(section,
            {
                opacity: 0,
                x: direction,
                scale: 0.9,
                filter: 'blur(5px)'
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // About section animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                gsap.fromTo('.about-title',
                    { opacity: 0, x: -70, skewX: 20 },
                    { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: 'power3.out' }
                );
                
                // Animate divider
                gsap.fromTo('.about-divider',
                    { width: 0, opacity: 0, x: -50 },
                    { width: '6rem', opacity: 1, x: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', delay: 0.4 }
                );
                
                // Animate content
                const contentElements = document.querySelectorAll('.about-content h3, .about-content p');
                gsap.fromTo(contentElements,
                    { opacity: 0, x: -50, rotateY: 30 },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                        delay: 0.3
                    }
                );
                
                // Animate stats
                const stats = document.querySelectorAll('.stats-item');
                gsap.fromTo(stats,
                    { opacity: 0, scale: 0.5, y: 30 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: 'elastic.out(1.2, 0.5)',
                        delay: 0.6
                    }
                );
                
                // Animate image
                gsap.fromTo('.about-image',
                    { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', x: 100, rotation: 5 },
                    {
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        x: 0,
                        rotation: 0,
                        duration: 1.2,
                        ease: 'power3.inOut',
                        delay: 0.8
                    }
                );
                
                // Animate quote box
                gsap.fromTo('.quote-box',
                    { opacity: 0, x: 50, y: 50, rotation: 10, scale: 0.8 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'elastic.out(1.2, 0.5)',
                        delay: 1.3
                    }
                );
                
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Practice areas animations
    const practiceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                gsap.fromTo('.practice-title',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
                
                // Animate subtitle
                gsap.fromTo('.practice-subtitle',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 }
                );
                
                // Animate divider
                gsap.fromTo('.practice-divider',
                    { width: 0, opacity: 0 },
                    { width: '6rem', opacity: 1, duration: 0.6, ease: 'power1.out', delay: 0.3 }
                );
                
                // Animate cards
                const cards = document.querySelectorAll('.practice-card');
                cards.forEach((card, index) => {
                    const direction = index % 2 === 0 ? -100 : 100;
                    gsap.fromTo(card,
                        {
                            x: direction,
                            opacity: 0,
                            scale: 0.8,
                            filter: 'blur(5px)',
                            rotateY: index % 2 === 0 ? -15 : 15
                        },
                        {
                            duration: 0.8,
                            delay: index * 0.15,
                            x: 0,
                            y: 0,
                            rotateY: 0,
                            opacity: 1,
                            scale: 1,
                            filter: 'blur(0px)',
                            ease: 'power2.out'
                        }
                    );
                });
                
                // Blur effect
                gsap.timeline({
                    scrollTrigger: {
                        trigger: '#practice-areas',
                        start: 'top 80%',
                        end: 'bottom top',
                        scrub: true
                    }
                }).to('.blur-layer', {
                    opacity: 0.5,
                    duration: 2
                });
                
                practiceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const practiceSection = document.getElementById('practice-areas');
    if (practiceSection) {
        practiceObserver.observe(practiceSection);
    }
    
    // Team section animations
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                gsap.fromTo('.team-title',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
                
                // Animate subtitle
                gsap.fromTo('.team-subtitle',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 }
                );
                
                // Animate divider
                gsap.fromTo('.team-divider',
                    { width: 0, opacity: 0 },
                    { width: '6rem', opacity: 1, duration: 0.6, ease: 'power1.out', delay: 0.3 }
                );
                
                // Animate team cards
                const teamCards = document.querySelectorAll('.team-card');
                gsap.fromTo(teamCards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power2.out',
                        delay: 0.5
                    }
                );
                
                teamObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const teamSection = document.getElementById('team');
    if (teamSection) {
        teamObserver.observe(teamSection);
    }
    
    // Contact section animations
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                gsap.fromTo('.contact-title',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                );
                
                // Animate subtitle
                gsap.fromTo('.contact-subtitle',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 }
                );
                
                // Animate divider
                gsap.fromTo('.contact-divider',
                    { width: 0, opacity: 0 },
                    { width: '6rem', opacity: 1, duration: 0.6, ease: 'power1.out', delay: 0.3 }
                );
                
                // Animate contact info
                gsap.fromTo('.contact-info',
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
                );
                
                // Animate contact form
                gsap.fromTo('.contact-form',
                    { opacity: 0, x: 100 },
                    { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 }
                );
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    // Animate circles on scroll
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animated-circle').forEach(circle => {
        circleObserver.observe(circle);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you shortly.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Add hover effects to interactive elements
document.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const icon = card.querySelector('.practice-icon');
        if (icon) {
            gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const icon = card.querySelector('.practice-icon');
        if (icon) {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// Team card hover effects
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const image = card.querySelector('.team-image img');
        if (image) {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const image = card.querySelector('.team-image img');
        if (image) {
            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    });
});

// Stats hover effects
document.querySelectorAll('.stats-item').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        gsap.to(stat, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    stat.addEventListener('mouseleave', () => {
        gsap.to(stat, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// About image hover effect
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    aboutImage.addEventListener('mouseenter', () => {
        const img = aboutImage.querySelector('img');
        if (img) {
            gsap.to(img, {
                scale: 1.1,
                rotation: 2,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    });
    
    aboutImage.addEventListener('mouseleave', () => {
        const img = aboutImage.querySelector('img');
        if (img) {
            gsap.to(img, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
    });
}

// Initialize all icons when page loads
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

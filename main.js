// Splash screen removal after 4.5 seconds
setTimeout(() => {
    document.getElementById("splashScreen")?.remove();
}, 4500);



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

document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('button, a, input, textarea')) {
        gsap.to(cursorFollower, { opacity: 0.15, duration: 0.2 });
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('button, a, input, textarea')) {
        gsap.to(cursorFollower, { opacity: 0.3, duration: 0.2 });
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
    const aboutTitle = document.querySelector('.about-title');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                const abouttitleChars = aboutTitle.querySelectorAll('span');
                gsap.fromTo(abouttitleChars,

                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -90,
                        filter: 'blur(6px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        stagger: 0.06,      // adjust for speed between letters
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: 0.3
                    }
                );
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

                const statNumbers = document.querySelectorAll('.stats-number');
                statNumbers.forEach(number => {
                    let finalValueText = number.textContent.trim();
                    let hasPlus = finalValueText.includes('+');
                    let cleanNumber = finalValueText.replace('+', '').replace(/,/g, '');
                    let finalValue = parseInt(cleanNumber);

                    // GSAP tween object
                    let counter = { val: 0 };

                    gsap.to(counter, {
                        val: finalValue,
                        duration: 5,
                        ease: "power3.out",
                        onUpdate: () => {
                            let displayValue = Math.floor(counter.val);
                            // Add comma formatting if original had comma
                            if (finalValueText.includes(',')) {
                                displayValue = displayValue.toLocaleString();
                            }
                            number.textContent = displayValue + (hasPlus ? '+' : '');
                        }
                    });
                });

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

    // Practice areas Content
    const icons = {
        "Litigation": "fa-scale-balanced",
        "Arbitration": "fa-handshake",
        "General corporate": "fa-building",
        "Insurance disputes": "fa-umbrella",
        "Project finance": "fa-coins",
        "Antitrust and competition": "fa-balance-scale",
        "Banking and finance litigation": "fa-piggy-bank",
        "Mergers & Acquisition": "fa-sitemap",
        "Commercial contract disputes": "fa-file-contract",
        "Employment litigation and dispute resolution": "fa-users",
        "Energy disputes": "fa-bolt",
        "Insolvency and Bankruptcy": "fa-ban",
        "Environmental, health and safety disputes": "fa-leaf",
        "Infrastructure and construction disputes": "fa-hard-hat",
        "Legal regulatory, compliance & due diligence": "fa-shield-halved",
        "International arbitration": "fa-globe",
        "IT and telecoms disputes": "fa-network-wired",
        "Industrial and labor laws": "fa-industry",
        "Intellectual property and technology": "fa-lightbulb",
        "Marine and aviation disputes": "fa-anchor",
        "Patent and IP litigation": "fa-certificate",
        "Real estate litigation": "fa-house",
        "Tax disputes": "fa-file-invoice-dollar",
        "White collar and corporate crime": "fa-user-secret"
    };

    const details = {
        "Litigation": `
  <h4 style="margin-bottom: 20px;">Strategic Legal Advisory, Drafting & Representation in various foras as follows:</h4>
    <ul style="padding-left: 20px; line-height: 1.6;">
      <li><i class="fas fa-arrow-right"></i> Supreme Court of India</li>
      <li><i class="fas fa-arrow-right"></i> Various High Courts of India</li>
      <li><i class="fas fa-arrow-right"></i> National Green Tribunal</li>
      <li><i class="fas fa-arrow-right"></i> Electricity Commissions</li>
      <li><i class="fas fa-arrow-right"></i> Telecom Dispute Commissions</li>
      <li><i class="fas fa-arrow-right"></i> Competition tribunals</li>
      <li><i class="fas fa-arrow-right"></i> NCLT & NCLAT</li>
      <li><i class="fas fa-arrow-right"></i> National Green Tribunal</li>
      <li><i class="fas fa-arrow-right"></i> APTEL</li>
      <li><i class="fas fa-arrow-right"></i> District courts</li>
      <li><i class="fas fa-arrow-right"></i> SEBI & SAT</li>
      <li><i class="fas fa-arrow-right"></i> National Consumer Forum</li>
      <li><i class="fas fa-arrow-right"></i> Army tribunal</li>
      <li><i class="fas fa-arrow-right"></i> Mines Tribunals</li>

    </ul>
  `,
        "Arbitration": `Our arbitration practice offers clients an efficient and confidential route to dispute resolution outside the traditional court system. We act in both domestic and international arbitrations under leading institutional rules such as ICC, SIAC, LCIA, and UNCITRAL. Invictar Law has represented companies, government bodies, and foreign investors in arbitration proceedings related to infrastructure contracts, joint ventures, shareholder disagreements, and commercial disputes. We provide end-to-end support, from drafting arbitration clauses to enforcement of arbitral awards. Our team also advises on interim reliefs, emergency arbitration, and challenges to arbitral awards before Indian courts, ensuring comprehensive legal coverage for clients involved in arbitration.`,
    };

    // Practice areas animations
    const areas = Object.keys(icons);

    const container = document.getElementById('practiceArea');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');
    const overlay = document.getElementById('overlay');
    const popupClose = document.getElementById('popupClose');

    areas.forEach(area => {
        const div = document.createElement('div');
        div.className = 'area-box';
        div.innerHTML = `<div class='area-title'><i class='fas ${icons[area]}'></i> ${area}</div>`;
        div.addEventListener('click', () => openPopup(area));
        container.appendChild(div);

        gsap.from(div, {
            scrollTrigger: {
                trigger: div,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    });

    function openPopup(area) {
        popupContent.innerHTML = details[area] || `Details about ${area}...`;
        gsap.fromTo(popup, {
            y: -30,
            opacity: 0,
            scale: 0.9
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
        popup.classList.add('active');
        overlay.style.display = 'block';
    }

    function closePopup() {
        gsap.to(popup, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                popup.classList.remove('active');
                overlay.style.display = 'none';
            }
        });
    }

    popupClose.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });

    const practiceTitle = document.querySelector('.practice-title');
    const practiceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                const practiceTitleChars = practiceTitle.querySelectorAll('span');
                gsap.fromTo(practiceTitleChars,

                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -90,
                        filter: 'blur(6px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        stagger: 0.06,      // adjust for speed between letters
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: 0.3
                    }
                );
                gsap.fromTo('.practice-title',
                    { opacity: 0, x: -70, skewX: 20 },
                    { opacity: 1, x: 0, skewX: 0, duration: 0.8, ease: 'power3.out' }
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
    const teamTitle = document.querySelector('.team-title');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                const teamTitleChars = teamTitle.querySelectorAll('span');
                gsap.fromTo(teamTitleChars,
                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -90,
                        filter: 'blur(6px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        stagger: 0.06,      // adjust for speed between letters
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: 0.3
                    }
                );
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
    const contactTitle = document.querySelector('.contact-title');
    const contactFormElements = document.querySelectorAll('.contact-form h3, .contact-form .form-group, .contact-form .form-row, .contact-form button');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                const contactTitleChars = contactTitle.querySelectorAll('span');
                gsap.fromTo(contactTitleChars,
                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -90,
                        filter: 'blur(6px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        stagger: 0.06,      // adjust for speed between letters
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: 0.3
                    }
                );
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

    const formObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(contactFormElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
      });
      formObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe the contact form container
formObserver.observe(document.querySelector('.contact-form'));

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
    contactForm.addEventListener('submit', function (e) {
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


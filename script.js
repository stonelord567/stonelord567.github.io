// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Ensure it's an intra-page link
        if (href.startsWith('#') && href.length > 1) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // If it's just "#", prevent default but don't scroll
        else if (href === '#') {
             e.preventDefault();
        }
        // Allow default behavior for links to other pages (like index.html#join from about.html)
    });
});


// Simple fade-in animation for sections on load (apply to specific elements)
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to fade in (sections within the main container or specific divs)
    const elementsToFade = document.querySelectorAll('main .container > section, main > section#hero .hero-content, main.page-container > section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on element's position or just a standard delay
                const delay = entry.target.closest('#hero') ? 0 : (Array.from(elementsToFade).indexOf(entry.target) * 100); // Stagger non-hero elements
                entry.target.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    elementsToFade.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Highlight active nav link (simplified)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a:not(.nav-join-button)'); // Exclude the button
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html'; // Handle potential hash
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Function to copy server IP
function copyIp() {
    const ipAddress = "Roswood_Guild.valksystems.pro"; // Updated IP Address
    navigator.clipboard.writeText(ipAddress).then(() => {
        // Provide feedback
        const feedbackEl = document.getElementById('ip-feedback');
        const buttons = document.querySelectorAll('.copy-ip-button');
        buttons.forEach(button => {
             button.innerHTML = 'Copied! <i class="fas fa-check"></i>';
             button.classList.add('copied');
        });

        if (feedbackEl) {
            feedbackEl.textContent = "IP Copied!";
            feedbackEl.style.opacity = '1';
        }

        // Reset button text and feedback after a delay
        setTimeout(() => {
            buttons.forEach(button => {
                // Reset based on which button it is
                if (button.classList.contains('small')) {
                     button.innerHTML = 'Copy IP <i class="fas fa-copy"></i>';
                } else {
                     button.innerHTML = `${ipAddress} <i class="fas fa-copy"></i>`; // Update displayed IP on reset
                }
                 button.classList.remove('copied');
            });
            if (feedbackEl) {
                 feedbackEl.style.opacity = '0';
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy IP: ', err);
        const feedbackEl = document.getElementById('ip-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = "Copy failed";
             feedbackEl.style.opacity = '1';
             setTimeout(() => feedbackEl.style.opacity = '0', 2000);
        }
         const buttons = document.querySelectorAll('.copy-ip-button');
         buttons.forEach(button => {
            button.innerHTML = 'Failed <i class="fas fa-times"></i>';
            setTimeout(() => {
                 if (button.classList.contains('small')) {
                     button.innerHTML = 'Copy IP <i class="fas fa-copy"></i>';
                } else {
                     button.innerHTML = `${ipAddress} <i class="fas fa-copy"></i>`; // Update displayed IP on reset after failure
                }
            }, 2000);
        });
    });
}
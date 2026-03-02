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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#0f1d3d';
    } else {
        navbar.style.backgroundColor = '#1a2b5c';
    }
});

// Countdown and Launch functionality
document.addEventListener('DOMContentLoaded', function() {
    const launchBtn = document.querySelector('.launch-btn');
    
    if (launchBtn) {
        launchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modal = document.getElementById('countdownModal');
            const countdownNumberEl = document.getElementById('countdownNumber');
            const targetUrl = this.getAttribute('href');
            
            // Show modal
            modal.classList.add('active');
            
            let count = 5;
            countdownNumberEl.textContent = count;
            
            const countdownInterval = setInterval(function() {
                count--;
                
                if (count > 0) {
                    countdownNumberEl.textContent = count;
                    // Trigger animation by removing and re-adding class
                    countdownNumberEl.style.animation = 'none';
                    setTimeout(function() {
                        countdownNumberEl.style.animation = 'countdownPulse 1s ease-in-out';
                    }, 10);
                } else {
                    clearInterval(countdownInterval);
                    // Redirect to the target URL
                    window.open(targetUrl, '_blank');
                    // Hide modal
                    modal.classList.remove('active');
                }
            }, 1000);
        });
    }
});

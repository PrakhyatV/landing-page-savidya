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
            const progressCircle = document.getElementById('progressCircle');
            const targetUrl = this.getAttribute('href');
            
            // Show modal
            modal.classList.add('active');
            
            // Circle circumference (2 * PI * radius)
            const radius = 90;
            const circumference = 2 * Math.PI * radius;
            
            let count = 5;
            countdownNumberEl.textContent = count;
            
            // Start with full circle
            progressCircle.style.strokeDashoffset = circumference;
            
            const countdownInterval = setInterval(function() {
                count--;
                
                if (count >= 0) {
                    countdownNumberEl.textContent = count;
                    // Calculate progress (from 5 to 0)
                    const progress = (5 - count) / 5;
                    const offset = circumference - (progress * circumference);
                    progressCircle.style.strokeDashoffset = offset;
                }
                
                if (count < 0) {
                    clearInterval(countdownInterval);
                    // Redirect to the target URL
                    window.open(targetUrl, '_blank');
                    // Hide modal
                    modal.classList.remove('active');
                    // Reset for next time
                    progressCircle.style.strokeDashoffset = circumference;
                }
            }, 1000);
        });
    }
});

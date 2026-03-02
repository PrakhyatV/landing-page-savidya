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
    const countdownSection = document.getElementById('countdownSection');
    const portalLink = document.querySelector('.portal-link');
    
    // Reset page state function
    function resetPageState() {
        if (countdownSection) {
            countdownSection.style.display = 'none';
        }
        if (portalLink) {
            portalLink.style.display = 'flex';
        }
        // Reset countdown number and progress
        const countdownNumberEl = document.getElementById('countdownNumberInline');
        const progressCircle = document.getElementById('progressCircleInline');
        if (countdownNumberEl) countdownNumberEl.textContent = '5';
        if (progressCircle) {
            const radius = 57;
            const circumference = 2 * Math.PI * radius;
            progressCircle.style.strokeDashoffset = circumference;
        }
    }
    
    // Always reset on page load
    resetPageState();
    
    // Handle back/forward navigation - multiple event listeners for better compatibility
    window.addEventListener('pageshow', function(event) {
        // This fires when page is shown (including back button)
        resetPageState();
    });
    
    window.addEventListener('popstate', function(event) {
        // This fires on back/forward button
        resetPageState();
    });
    
    // Additional check using unload event
    window.addEventListener('beforeunload', function() {
        // Store state before leaving
        sessionStorage.setItem('countdownActive', 'false');
    });
    
    // Check session storage on load
    if (sessionStorage.getItem('countdownActive') === 'true') {
        resetPageState();
        sessionStorage.setItem('countdownActive', 'false');
    }
    
    if (launchBtn) {
        launchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const countdownNumberEl = document.getElementById('countdownNumberInline');
            const progressCircle = document.getElementById('progressCircleInline');
            const targetUrl = this.getAttribute('href');
            
            // Mark countdown as active
            sessionStorage.setItem('countdownActive', 'true');
            
            // Hide launch button section
            if (portalLink) {
                portalLink.style.display = 'none';
            }
            
            // Show countdown section
            countdownSection.style.display = 'flex';
            
            // Circle circumference (2 * PI * radius)
            const radius = 57;
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
                    // Redirect to the target URL in same tab
                    window.location.href = targetUrl;
                }
            }, 1000);
        });
    }
});

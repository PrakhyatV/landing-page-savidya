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
document.querySelector('.launch-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const modal = document.getElementById('countdownModal');
    const countdownNumber = document.getElementById('countdownNumber');
    const targetUrl = this.getAttribute('href');
    
    // Show modal
    modal.classList.add('active');
    
    let count = 5;
    countdownNumber.textContent = count;
    
    const countdownInterval = setInterval(function() {
        count--;
        
        if (count > 0) {
            // Reset animation by removing and re-adding the element
            const newNumber = countdownNumber.cloneNode(true);
            newNumber.textContent = count;
            countdownNumber.parentNode.replaceChild(newNumber, countdownNumber);
            countdownNumber = newNumber;
        } else {
            clearInterval(countdownInterval);
            // Redirect to the target URL
            window.open(targetUrl, '_blank');
            // Hide modal
            modal.classList.remove('active');
        }
    }, 1000);
});

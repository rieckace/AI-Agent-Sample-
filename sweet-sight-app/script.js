// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const dessertCards = document.querySelectorAll('.dessert-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        // Filter dessert cards
        dessertCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Add dessert form functionality
const dessertForm = document.getElementById('dessert-form');
const gallery = document.querySelector('.gallery');

// Array of emoji options for desserts
const dessertEmojis = ['🍰', '🎂', '🍪', '🥐', '🍩', '🥧', '🧁', '🍮', '🍨', '🍦', '🍡', '🥮'];

dessertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('dessert-name').value;
    const description = document.getElementById('dessert-description').value;
    const category = document.getElementById('dessert-category').value;
    
    // Random emoji for the new dessert
    const randomEmoji = dessertEmojis[Math.floor(Math.random() * dessertEmojis.length)];
    
    // Create new dessert card
    const newCard = document.createElement('div');
    newCard.className = 'dessert-card';
    newCard.setAttribute('data-category', category);
    newCard.innerHTML = `
        <div class="dessert-image">${randomEmoji}</div>
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="rating">⭐⭐⭐⭐⭐</div>
    `;
    
    // Add animation class
    newCard.style.opacity = '0';
    newCard.style.transform = 'scale(0.8)';
    
    // Add to gallery
    gallery.appendChild(newCard);
    
    // Trigger animation
    setTimeout(() => {
        newCard.style.transition = 'all 0.5s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'scale(1)';
    }, 10);
    
    // Reset form
    dessertForm.reset();
    
    // Show success message
    showSuccessMessage();
    
    // Check current filter and hide if necessary
    const activeFilter = document.querySelector('.filter-btn.active');
    const activeCategory = activeFilter.getAttribute('data-category');
    if (activeCategory !== 'all' && category !== activeCategory) {
        newCard.classList.add('hidden');
    }
});

// Success message function
function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '✅ Dessert added successfully!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add hover effect for cards
dessertCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

console.log('Sweet Sight App initialized! 🍰');

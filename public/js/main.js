
// Accordion and other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    function toggleAccordion(trigger, forceState = null) {
        const isExpanded = forceState !== null ? forceState : trigger.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions if we're opening this one
        if (!isExpanded) {
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger && otherTrigger.getAttribute('aria-expanded') === 'true') {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        trigger.setAttribute('aria-expanded', !isExpanded);
    }
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => toggleAccordion(trigger));
    });
    
    // Open first accordion by default on larger screens
    const firstAccordionTrigger = document.querySelector('.accordion-trigger');
    if (firstAccordionTrigger && window.innerWidth >= 768) {
        setTimeout(() => {
            toggleAccordion(firstAccordionTrigger, false);
        }, 500);
    }

    // Book Sample Modal
    const bookSampleButton = document.querySelector('.book-sample-button');
    const bookSampleModal = document.querySelector('.book-sample-modal');
    const bookSampleModalClose = document.querySelector('.book-sample-modal-close');
    
    if (bookSampleButton && bookSampleModal) {
        // Open modal when clicking the Read Sample button
        bookSampleButton.addEventListener('click', (e) => {
            e.preventDefault();
            bookSampleModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal with close button
        if (bookSampleModalClose) {
            bookSampleModalClose.addEventListener('click', () => {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside content
        bookSampleModal.addEventListener('click', (e) => {
            if (e.target === bookSampleModal) {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookSampleModal.classList.contains('active')) {
                bookSampleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Services Carousel
    const carousels = document.querySelectorAll('.services-carousel-container');
    
    carousels.forEach(container => {
        const carousel = container.querySelector('.services-carousel');
        const carouselPrev = container.querySelector('.carousel-prev');
        const carouselNext = container.querySelector('.carousel-next');
        const cards = container.querySelectorAll('.service-card');
        
        if (carousel && cards.length > 0) {
            // Carousel Navigation
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // Match the gap from CSS
            
            if (carouselPrev) {
                carouselPrev.addEventListener('click', () => {
                    carousel.scrollBy({
                        left: -(cardWidth + gap),
                        behavior: 'smooth'
                    });
                });
            }
            
            if (carouselNext) {
                carouselNext.addEventListener('click', () => {
                    carousel.scrollBy({
                        left: (cardWidth + gap),
                        behavior: 'smooth'
                    });
                });
            }
            
            // Service modals
            const infoButtons = container.querySelectorAll('.service-info-button');
            const modals = container.querySelectorAll('.service-modal');
            
            infoButtons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle the modal
                    if (modals[index].classList.contains('active')) {
                        modals[index].classList.remove('active');
                        document.body.style.overflow = '';
                    } else {
                        // Close any open modals first
                        modals.forEach(modal => {
                            modal.classList.remove('active');
                        });
                        
                        // Open this modal
                        modals[index].classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            // Close modal on background click
            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            });
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.service-modal');
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });


}); 
// Blog Category Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const blogPosts = document.querySelectorAll('.blog-list-item');
    const categorySelect = document.querySelector('.category-select');

    // Function to filter posts by category
    function filterPosts(category) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update dropdown if it didn't trigger the event
        if (categorySelect && categorySelect.value !== category) {
            categorySelect.value = category;
        }

        // Filter the posts
        blogPosts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = '';
                post.style.opacity = '1';
            } else {
                post.style.display = 'none';
                post.style.opacity = '0';
            }
        });
    }

    // Set up button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterPosts(button.dataset.category);
        });
    });

    // Set up dropdown change handler
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            filterPosts(categorySelect.value);
        });
    }
});

// Scroll Animation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.87) && 
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .scale-in');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('scroll-active');
            }
        });
    }
    
    // Initial check on page load
    setTimeout(handleScrollAnimations, 100);
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[name="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Here you would typically send the data to your backend or newsletter service
            // For demonstration, we'll just show a success message
            emailInput.value = '';
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'Thank you for subscribing!';
            
            // Replace form with success message
            const newsletterContainer = document.querySelector('.newsletter-signup');
            const formElement = newsletterContainer.querySelector('.newsletter-form');
            newsletterContainer.replaceChild(successMessage, formElement);
            
            // Remove success message after 5 seconds and restore the form
            setTimeout(() => {
                newsletterContainer.replaceChild(formElement, successMessage);
            }, 5000);
        });
    }
});

// Testimonials Mosaic Layout
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the mosaic layout
    function initMosaicLayout() {
        const testimonialsMosaic = document.querySelector('.testimonials-mosaic');
        if (!testimonialsMosaic) return;
        
        const testimonialCards = testimonialsMosaic.querySelectorAll('.testimonial-card');
        if (testimonialCards.length <= 1) return;
        
        // Add different heights based on content length and set animation order
        testimonialCards.forEach((card, index) => {
            const quote = card.querySelector('.testimonial-quote');
            if (!quote) return;
            
            // Set animation order for staggered animation
            card.style.setProperty('--animation-order', index);
            
            // If the quote is longer, we might want to give it more height in the mosaic
            const quoteLength = quote.textContent.length;
            
            if (quoteLength > 300) {
                // For really long quotes
                card.classList.add('mosaic-tall');
            } else if (quoteLength < 200) {
                // For shorter quotes
                card.classList.add('mosaic-short');
            }
        });
    }
    
    // Initialize the layout
    initMosaicLayout();
    
    // Reinitialize on window resize for better responsiveness
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initMosaicLayout, 250);
    });
});
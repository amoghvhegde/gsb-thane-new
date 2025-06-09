// Global variables
let votingState = new Map(); // Store voting state for each post

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupMobileMenu();
    setupSearchFunctionality();
    setupEmailSubscription();
    setupVotingSystem();
    setupSmoothScrolling();
}

// Mobile Menu Functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navigation = document.getElementById('navigation');
    
    if (mobileMenuBtn && navigation) {
        mobileMenuBtn.addEventListener('click', function() {
            navigation.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = navigation.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navigation.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navigation.contains(event.target)) {
                navigation.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Search Functionality
function setupSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        showToast(`Searching for: "${searchTerm}"`, 'info');
        // In a real application, this would perform actual search
        console.log('Searching for:', searchTerm);
    } else {
        showToast('Please enter a search term', 'error');
    }
}

// Email Subscription
function setupEmailSubscription() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', handleEmailSubscription);
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleEmailSubscription();
            }
        });
    }
}

function handleEmailSubscription() {
    const emailInput = document.querySelector('.email-input');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        showToast('Thank you for subscribing!', 'success');
        emailInput.value = '';
        // In a real application, this would send the email to a server
        console.log('Email subscription:', email);
    } else {
        showToast('Please enter a valid email address', 'error');
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Voting System
function setupVotingSystem() {
    // Initialize voting state for all posts
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach((post, index) => {
        votingState.set(index, {
            upvotes: 0,
            downvotes: 0,
            userVote: null // null, 'up', or 'down'
        });
    });
}

function handleUpvote(button) {
    const post = button.closest('.blog-post');
    const postIndex = Array.from(document.querySelectorAll('.blog-post')).indexOf(post);
    const state = votingState.get(postIndex);
    
    if (state.userVote === 'up') {
        // Remove upvote
        state.upvotes--;
        state.userVote = null;
        button.classList.remove('voted');
    } else if (state.userVote === 'down') {
        // Change from downvote to upvote
        state.downvotes--;
        state.upvotes++;
        state.userVote = 'up';
        button.classList.add('voted');
        
        // Remove downvote styling
        const downvoteBtn = post.querySelector('.downvote-btn');
        downvoteBtn.classList.remove('voted');
    } else {
        // Add upvote
        state.upvotes++;
        state.userVote = 'up';
        button.classList.add('voted');
    }
    
    updateVoteDisplay(post, state);
    votingState.set(postIndex, state);
}

function handleDownvote(button) {
    const post = button.closest('.blog-post');
    const postIndex = Array.from(document.querySelectorAll('.blog-post')).indexOf(post);
    const state = votingState.get(postIndex);
    
    if (state.userVote === 'down') {
        // Remove downvote
        state.downvotes--;
        state.userVote = null;
        button.classList.remove('voted');
    } else if (state.userVote === 'up') {
        // Change from upvote to downvote
        state.upvotes--;
        state.downvotes++;
        state.userVote = 'down';
        button.classList.add('voted');
        
        // Remove upvote styling
        const upvoteBtn = post.querySelector('.upvote-btn');
        upvoteBtn.classList.remove('voted');
    } else {
        // Add downvote
        state.downvotes++;
        state.userVote = 'down';
        button.classList.add('voted');
    }
    
    updateVoteDisplay(post, state);
    votingState.set(postIndex, state);
}

function updateVoteDisplay(post, state) {
    const upvoteCount = post.querySelector('.upvote-btn .vote-count');
    const downvoteCount = post.querySelector('.downvote-btn .vote-count');
    
    if (upvoteCount) upvoteCount.textContent = state.upvotes;
    if (downvoteCount) downvoteCount.textContent = state.downvotes;
}

// Comment functionality
function handleComment() {
    showToast('Commenting feature coming soon!', 'info');
}

// Share functionality
function shareEmail(title) {
    const subject = encodeURIComponent(`Check out this post: ${title}`);
    const body = encodeURIComponent(`I found this interesting: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareTwitter(title) {
    const text = encodeURIComponent(`${title} - ${window.location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
}

function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    
    // Remove existing classes
    toast.className = 'toast';
    
    // Add type class
    if (type === 'success') {
        toast.classList.add('success');
    } else if (type === 'error') {
        toast.classList.add('error');
    }
    
    // Set message
    toast.textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
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
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navigation = document.getElementById('navigation');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navigation && mobileMenuBtn) {
            navigation.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
}, 250));

// Handle scroll events
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to header when scrolling
    if (scrollTop > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
}, 10));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navigation = document.getElementById('navigation');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navigation && mobileMenuBtn) {
            navigation.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Add print button functionality if needed
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printPage();
    }
});

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
setupLazyLoading();

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // In a real application, this would send data to analytics service
}

// Track page view
trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title
});

// Track user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            link: e.target.textContent,
            href: e.target.href
        });
    }
    
    if (e.target.matches('.action-btn')) {
        trackEvent('action_button_click', {
            action: e.target.textContent
        });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a real application, this would send error reports to a logging service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In a real application, this would send error reports to a logging service
});
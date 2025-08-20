/**
 * Standalone Navigation JavaScript
 * Replaces Bootstrap JavaScript functionality for the navigation component
 */

class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileToggle();
    this.setupDropdowns();
    this.setupStickyNavbar();
    this.setupOutsideClick();
  }

  setupMobileToggle() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggle && navbarCollapse) {
      navbarToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navbarCollapse.classList.toggle('in');
        const isExpanded = navbarCollapse.classList.contains('in');
        navbarToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      });
    }
  }

  setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Close other dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('open');
              const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
              if (otherToggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
              }
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('open');
          const isOpen = dropdown.classList.contains('open');
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    });
  }

  setupStickyNavbar() {
    let ticking = false;
    
    const updateNavbar = () => {
      const navbar = document.querySelector('.navbar-affixed-top');
      if (navbar) {
        if (window.scrollY > 62) {
          navbar.classList.add('affix');
        } else {
          navbar.classList.remove('affix');
        }
      }
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  }

  setupOutsideClick() {
    document.addEventListener('click', (e) => {
      // Close dropdowns when clicking outside
      if (!e.target.closest('.dropdown')) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('open');
          const toggle = dropdown.querySelector('.dropdown-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Close mobile menu when clicking outside
      if (!e.target.closest('.navbar') && !e.target.closest('.navbar-toggle')) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggle = document.querySelector('.navbar-toggle');
        if (navbarCollapse && navbarToggle) {
          navbarCollapse.classList.remove('in');
          navbarToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Public method to programmatically set active state
  setActiveMenuItem(url) {
    const menuItems = document.querySelectorAll('.navbar-nav li');
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === url) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Public method to close all dropdowns
  closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.navigationInstance = new Navigation();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}

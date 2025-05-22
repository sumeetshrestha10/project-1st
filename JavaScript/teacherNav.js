// Teacher Nav JavaScript
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupDashboardTabs();
    setupSearchFunctionality();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    mobileToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        // Toggle body scroll when menu is open
        document.body.classList.toggle('no-scroll', menu.classList.contains('active'));
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !menu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            menu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    });
}

// Dashboard Tabs
function setupDashboardTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const uploadSection = document.getElementById('upload-section');
    const manageSection = document.getElementById('manage-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show/hide sections based on tab
            const tabType = tab.getAttribute('data-tab');
            
            if (tabType === 'upload') {
                uploadSection.style.display = 'block';
                manageSection.style.display = 'block';
                // Scroll to upload section
                uploadSection.scrollIntoView({ behavior: 'smooth' });
            } else if (tabType === 'manage') {
                uploadSection.style.display = 'block';
                manageSection.style.display = 'block';
                // Scroll to manage section
                manageSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Search Functionality
function setupSearchFunctionality() {
    const searchBar = document.querySelector('.search-bar');
    
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase().trim();
        const pdfItems = document.querySelectorAll('.pdf-item');
        
        pdfItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const chapter = item.querySelector('p').textContent.toLowerCase();
            
            // Show/hide based on search term
            if (title.includes(searchTerm) || chapter.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // If no search term, show all
        if (searchTerm === '') {
            pdfItems.forEach(item => {
                item.style.display = 'block';
            });
        }
    });
} 
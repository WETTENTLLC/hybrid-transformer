// JavaScript for Mega Menu
document.addEventListener('DOMContentLoaded', function () {
    const productsNavItem = document.querySelector('.nav-item.has-megamenu'); // Assuming your "Products" nav item has these classes
    const megaMenu = productsNavItem.querySelector('.mega-menu');

    if (productsNavItem && megaMenu) {
        // Show mega menu on click
        productsNavItem.addEventListener('click', function (event) {
            // Prevent link navigation if it's a link
            if (event.target.tagName === 'A' && event.target.getAttribute('href') === '#') {
                event.preventDefault();
            }
            // Toggle display
            if (megaMenu.style.display === 'block') {
                megaMenu.style.display = 'none';
            } else {
                megaMenu.style.display = 'block';
            }
        });

        // Optional: Hide mega menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!productsNavItem.contains(event.target) && !megaMenu.contains(event.target)) {
                megaMenu.style.display = 'none';
            }
        });

        // Basic keyboard navigation (example)
        // You'll need to expand this for full accessibility
        const focusableElements = megaMenu.querySelectorAll('a[href], button:not([disabled])');
        // Add more robust keyboard navigation as needed
    }
});

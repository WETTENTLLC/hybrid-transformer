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

    // Scroll-triggered animations
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null, // relative to document viewport 
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled-in');
                observer.unobserve(entry.target); // Optional: stop observing after animation
            } else {
                // Optional: remove class if you want animation to re-trigger on scroll up/down
                // entry.target.classList.remove('scrolled-in'); 
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(el => {
        observer.observe(el);
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Product Detail Page: Image Gallery
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailImages = document.querySelectorAll('.thumbnail-image');

    if (mainProductImage && thumbnailImages.length > 0) {
        thumbnailImages.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainProductImage.src = this.dataset.image;
                mainProductImage.alt = this.alt; // Update alt text for accessibility

                // Update active thumbnail state
                thumbnailImages.forEach(t => t.classList.remove('active-thumbnail'));
                this.classList.add('active-thumbnail');
            });
        });
    }

    // Product Detail Page: Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Deactivate all tabs and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate clicked tab and corresponding content
                this.classList.add('active');
                const tabId = this.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Make specification tables sortable
    function makeTableSortable(table) {
        const headers = table.querySelectorAll('th.sortable');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.setAttribute('data-sort-dir', 'none'); // none, asc, desc
            header.addEventListener('click', () => {
                sortTableByColumn(table, index, header);
            });
        });
    }

    function sortTableByColumn(table, columnIndex, clickedHeader) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const currentSortDir = clickedHeader.getAttribute('data-sort-dir');
        let newSortDir;

        if (currentSortDir === 'asc') {
            newSortDir = 'desc';
        } else { // Covers 'none' and 'desc'
            newSortDir = 'asc';
        }

        // Reset sort direction for other headers
        table.querySelectorAll('th.sortable').forEach(th => {
            th.setAttribute('data-sort-dir', 'none');
            th.classList.remove('sort-asc', 'sort-desc');
        });

        clickedHeader.setAttribute('data-sort-dir', newSortDir);
        clickedHeader.classList.toggle('sort-asc', newSortDir === 'asc');
        clickedHeader.classList.toggle('sort-desc', newSortDir === 'desc');

        const sortModifier = newSortDir === 'asc' ? 1 : -1;

        rows.sort((a, b) => {
            const aText = a.cells[columnIndex] ? a.cells[columnIndex].textContent.trim() : '';
            const bText = b.cells[columnIndex] ? b.cells[columnIndex].textContent.trim() : '';

            // Attempt numeric sort if possible
            const aNum = parseFloat(aText);
            const bNum = parseFloat(bText);

            if (!isNaN(aNum) && !isNaN(bNum)) {
                return (aNum - bNum) * sortModifier;
            }
            // Fallback to string sort
            return aText.localeCompare(bText) * sortModifier;
        });

        // Remove existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Append sorted rows
        tbody.append(...rows);
    }

    document.querySelectorAll('.specifications-table').forEach(makeTableSortable);
});

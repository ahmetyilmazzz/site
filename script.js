document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Mobile menu interaction
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if this is a dropdown toggle
            if (link.parentElement.classList.contains('dropdown')) {
                e.preventDefault(); // Prevent default link behavior
                link.parentElement.classList.toggle('active'); // Toggle dropdown visibility
            } else {
                // For regular links, close the menu
                navLinks.classList.remove('active');
                // Also close any open dropdowns when closing menu
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    });

    // Simple fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Add fade-in classes to elements you want to animate
    // Example usage:
    // document.querySelectorAll('.card').forEach((el) => observer.observe(el));

    // Smart Back Button
    document.querySelectorAll('.back-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if there is a referrer and it matches our domain (simple check)
            // or just ensure we have history to go back to.
            // Using document.referrer is safer to ensure we don't go back to an empty page or different site if opened in new tab
            if (document.referrer.includes(window.location.hostname)) {
                e.preventDefault();
                history.back();
            }
            // If no internal referrer, let the default href="index.html" work
        });
    });
    // Search Functionality
    const searchInputs = document.querySelectorAll('.nav-search');

    searchInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = input.value.trim().toLowerCase();
                if (query) {
                    // Redirect to menu.html with search parameter
                    // If we are already on menu.html, just reload/run search (or better, just update URL and run search function)
                    // For simplicity, we'll assign location.
                    window.location.href = `menu.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    });

    // Check for search parameter on page load (specifically for menu.html)
    if (window.location.pathname.includes('menu.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');

        if (searchQuery) {
            const term = searchQuery.toLowerCase();
            const items = document.querySelectorAll('.card, .menu-item');
            let found = false;

            items.forEach(item => {
                const title = item.querySelector('h4, h3')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('p')?.textContent.toLowerCase() || '';

                if (title.includes(term) || desc.includes(term)) {
                    if (!found) {
                        // Scroll to first match
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        found = true;
                    }
                    // Highlight match
                    item.style.border = '2px solid var(--primary)';
                    item.style.boxShadow = '0 0 15px rgba(243, 156, 18, 0.5)';

                    // Remove highlight after a few seconds
                    setTimeout(() => {
                        item.style.border = '';
                        item.style.boxShadow = '';
                    }, 3000);
                }
            });
        }
    }
});

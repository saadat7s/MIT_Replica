// Responsive Navbar
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search-button');
    const navbarMenu = document.querySelector('.navbar-menu');

    // Toggle menu for smaller screens
    const toggleMenu = () => {
        navbarMenu.classList.toggle('show');
    };

    searchButton.addEventListener('click', toggleMenu);

    // Adjust navbar based on screen size
    const handleResize = () => {
        if (window.innerWidth > 768) {
            navbarMenu.classList.remove('show');
        }
    };

    window.addEventListener('resize', handleResize);
});

// Collapsible Sidebar
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.createElement('button');
sidebarToggle.textContent = '☰';
sidebarToggle.classList.add('sidebar-toggle');
document.body.appendChild(sidebarToggle);

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Lazy Loading for Images
const images = document.querySelectorAll('img');
const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    },
    { threshold: 0.1 }
);

images.forEach((img) => observer.observe(img));

// Smooth Scrolling
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic Content Loading (Example for "Updates Section")
const loadUpdates = async () => {
    const updatesSection = document.querySelector('.updates-section');
    try {
        const response = await fetch('https://api.example.com/updates');
        const data = await response.json();

        updatesSection.innerHTML = data
            .map(
                (update) =>
                    `<p><a href="${update.link}">${update.title}</a>: ${update.description}</p>`
            )
            .join('');
    } catch (error) {
        console.error('Error loading updates:', error);
    }
};

// Call the function to load updates
loadUpdates();

// Newsletter Form Validation
const newsletterForm = document.querySelector('.newsletter form');
newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for subscribing!');
    newsletterForm.reset();
});

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Adjust Hero Section for Responsiveness
const heroSection = document.querySelector('.hero');
const adjustHero = () => {
    if (window.innerWidth < 768) {
        heroSection.style.flexDirection = 'column';
    } else {
        heroSection.style.flexDirection = 'row';
    }
};

adjustHero();
window.addEventListener('resize', adjustHero);

// Add Active Class to Navbar Links
const navbarLinks = document.querySelectorAll('.navbar-menu a');
navbarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navbarLinks.forEach((navLink) => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Adjust Sidebar on Scroll
const adjustSidebar = () => {
    if (window.scrollY > 100) {
        sidebar.style.opacity = '0.8';
    } else {
        sidebar.style.opacity = '1';
    }
};

window.addEventListener('scroll', adjustSidebar);

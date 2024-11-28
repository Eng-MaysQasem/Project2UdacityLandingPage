// Select the navbar list and sections
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// Build the Navigation dynamically
sections.forEach(section => {
    const navItem = document.createElement('li');
    const sectionID = section.id;
    const sectionName = section.getAttribute('data-nav');
    
    // Create a new list item and add it to the navbar
    navItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionName}</a>`;
    navbarList.appendChild(navItem);
});

// Function to set the active section
function setActiveSection() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const link = document.querySelector(`a[href="#${section.id}"]`);

        // Check if section is in the viewport
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            section.classList.add('your-active-class'); // Highlight the active section
            link.classList.add('active'); // Highlight the corresponding navbar link
        } else {
            section.classList.remove('your-active-class'); // Remove highlight from inactive sections
            link.classList.remove('active'); // Remove highlight from inactive navbar links
        }
    });
}

// Add scroll event listener to detect active section
window.addEventListener('scroll', setActiveSection);

// Initialize active state on page load
setActiveSection();

// Add smooth scroll behavior for navigation links
navbarList.addEventListener('click', event => {
    event.preventDefault(); // Prevent default anchor behavior
    if (event.target.nodeName === 'A') {
        const sectionID = event.target.getAttribute('href').substring(1);
        const section = document.getElementById(sectionID);
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    }
});

// Show/Hide Navbar on Scroll
let isScrolling; // Timeout tracker for navbar visibility
window.addEventListener('scroll', () => {
    document.querySelector('.page__header').style.display = 'block'; // Show navbar during scroll

    // Clear the previous timeout
    clearTimeout(isScrolling);

    // Hide the navbar after 2 seconds of inactivity
    isScrolling = setTimeout(() => {
        document.querySelector('.page__header').style.display = 'none';
    }, 2000);
});

// Add Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑ Top'; // Text for the button
scrollToTopBtn.classList.add('scroll-to-top'); // Add class for styling
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll smoothly to the top
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        // Display the "Scroll to Top" button when scroll position exceeds 500px
        scrollToTopBtn.style.display = 'block';
    } else {
        // Hide the "Scroll to Top" button when scroll position is below 500px
        scrollToTopBtn.style.display = 'none';
    }
});


// Add Collapsible Sections
sections.forEach(section => {
    const btn = document.createElement('button');
    btn.textContent = 'Read More'; // Button text
    btn.classList.add('read-more-btn'); // Add class for styling
    const content = section.querySelectorAll('p'); // Select all paragraphs in the section

    // Initially hide all paragraphs except the first one
    content.forEach((p, index) => {
        if (index > 0) {
            p.style.display = 'none'; // Hide paragraphs
        }
    });

    // Toggle content visibility on button click
    btn.addEventListener('click', () => {
        content.forEach((p, index) => {
            if (index > 0) {
                if (p.style.display === 'none') {
                    p.style.display = 'block'; // Show hidden paragraphs
                    btn.textContent = 'Read Less'; // Update button text
                } else {
                    p.style.display = 'none'; // Hide paragraphs
                    btn.textContent = 'Read More'; // Revert button text
                }
            }
        });
    });

    section.querySelector('.landing__container').appendChild(btn); // Append the button to the section
});

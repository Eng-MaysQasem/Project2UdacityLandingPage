document.addEventListener("DOMContentLoaded", () => {
    // Define variables for the navigation bar, list, and sections
    const navbar = document.querySelector('.page__header'); // Select the navigation bar element
    const navbarList = document.getElementById("navbar__list"); // Select the unordered list inside the navigation bar
    const sections = Array.from(document.querySelectorAll("section")); // Convert NodeList to an array for easier manipulation
  
    // Dynamically build the navigation bar based on the sections
    sections.forEach(section => {
      const navItem = document.createElement('li'); // Create a new list item for each section
      // The `section.dataset.nav` refers to the value stored in the `data-nav` attribute of each section
      const navLink = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`; // Create an anchor link with the section's ID and name
      navItem.innerHTML = navLink; // Add the anchor link inside the list item
      navbarList.appendChild(navItem); // Append the list item to the navigation bar
    });
  
    // Function to highlight the active section based on scroll position
    const highlightActiveSection = () => {
      const scrollPos = window.scrollY; // Get the current scroll position
      sections.forEach(section => {
        const { top, height } = section.getBoundingClientRect(); // Get the position and height of the section relative to the viewport
        const link = document.querySelector(`a[href="#${section.id}"]`); // Select the corresponding link for the section
  
        // Check if the section is within the viewport (visible on screen)
        if (top >= 0 && top < window.innerHeight / 2) {
          section.classList.add("active-section"); // Add an active class to the section
          link.classList.add("active-link"); // Add an active class to the corresponding link
        } else {
          section.classList.remove("active-section"); // Remove the active class from the section
          link.classList.remove("active-link"); // Remove the active class from the corresponding link
        }
      });
    };
  
    // Show or hide the navigation bar on scroll based on how far you've scrolled
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { // If scrolled down more than 50px
        navbar.style.top = "0"; // Show the navbar at the top of the page
      } else {
        navbar.style.top = "-60px"; // Hide the navbar
      }
      highlightActiveSection(); // Update the active section as you scroll
    });
  
    // Initial call to set the active section on page load
    highlightActiveSection();
  
    // Smooth scroll to the corresponding section when a navigation link is clicked
    navbarList.addEventListener('click', event => {
      if (event.target.tagName === 'A') { // Check if the clicked element is an anchor link
        event.preventDefault(); // Prevent the default anchor behavior
        const sectionID = event.target.getAttribute('href').substring(1); // Get the section ID from the link
        const targetSection = document.getElementById(sectionID); // Get the corresponding section element
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the section
      }
    });
  
    // Create a scroll-to-top button
    const scrollToTopButton = document.createElement('button'); // Create the button element
    scrollToTopButton.textContent = '↑ Top'; // Set the button text
    scrollToTopButton.classList.add('scroll-to-top'); // Add a class to style the button
    document.body.appendChild(scrollToTopButton); // Append the button to the body
  
    // Show or hide the scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) { // If scrolled down more than 500px
        scrollToTopButton.style.display = 'block'; // Show the button
      } else {
        scrollToTopButton.style.display = 'none'; // Hide the button
      }
    });
  
    // Scroll to the top when the button is clicked
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top of the page
    });
  });
  
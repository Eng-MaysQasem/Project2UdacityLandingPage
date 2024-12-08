document.addEventListener("DOMContentLoaded", function() {
  // Declaring the variables that we will need later in the code
  const navbar = document.querySelector('.page__header'); // Select the navigation bar element
  const navbarList = document.getElementById("navbar__list"); // Select the unordered list inside the navigation bar
  const sections = document.querySelectorAll("section"); // Select all section elements on the page

  // Dynamically build the navigation bar by adding list items for each section on the page
  sections.forEach(section => {
    const navItem = document.createElement('li'); // Create a new list item
    const navLink = document.createElement('a'); // Create a new anchor link
    navLink.href = `#${section.id}`; // Set the href attribute to link to the section using its ID
    navLink.textContent = section.getAttribute('data-nav'); // Set the link text to the value of the 'data-nav' attribute of the section
    navItem.appendChild(navLink); // Append the anchor link to the list item
    navbarList.appendChild(navItem); // Append the list item to the navigation bar
  });

  // Function to highlight the active section based on the scroll position
  function activateSection() {
    const scrollPosition = window.scrollY; // Get the current scroll position of the window
    sections.forEach((section) => {
      const sectionTop = section.offsetTop; // Get the top offset of the section
      const sectionHeight = section.clientHeight; // Get the height of the section
      const link = document.querySelector(`a[href="#${section.id}"]`); // Select the corresponding link for the section
      
      // Check if the section is in the viewport
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.classList.add("active-section"); // Add an active class to the section
        link.classList.add("active-link"); // Add an active class to the corresponding link
      } else {
        section.classList.remove("active-section"); // Remove the active class from the section
        link.classList.remove("active-link"); // Remove the active class from the corresponding link
      }
    });
  }

  // Add scroll event listener to show the navbar when scrolling
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {  // Show the navbar if the user scrolls 50px or more
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-60px";  // Hide the navbar if the scroll position is at the top
    }
    activateSection(); // Call the activateSection function to update the active section
  });

  // Initial call to set the active section on page load
  activateSection();
  
  // Smooth scroll to the corresponding section when a navigation link is clicked
  navbarList.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default anchor behavior (jumping)
    if (event.target.nodeName === 'A') { // Check if the clicked element is an anchor link
      const sectionID = event.target.getAttribute('href').substring(1); // Get the section ID from the link
      const section = document.getElementById(sectionID); // Get the corresponding section element
      section.scrollIntoView({ behavior: 'smooth' }); // Scroll to the section smoothly
    }
  });

  // Scroll-to-top button functionality
  const scrollToTopBtn = document.createElement('button'); // Create the scroll-to-top button
  scrollToTopBtn.textContent = '↑ Top'; // Set the button text
  scrollToTopBtn.classList.add('scroll-to-top'); // Add a class to style the button
  document.body.appendChild(scrollToTopBtn); // Append the button to the body

  // Show or hide the scroll-to-top button based on the scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) { // Show the button when the user scrolls down 500px or more
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none'; // Hide the button when the user is near the top
    }
  });

  // Scroll to the top when the button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top of the page
  });
});

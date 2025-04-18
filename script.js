// ...existing code...

window.addEventListener('load', () => {
  // Initialize AOS after a short delay to ensure content is loaded
  setTimeout(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, 100); // Adjust delay if necessary
});

// ...existing code...
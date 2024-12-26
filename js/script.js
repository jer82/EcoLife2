document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to EcoLife Solutions!");

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
    });
});
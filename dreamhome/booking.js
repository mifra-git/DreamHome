// --- booking.js ---

// =================================================================
// PART 1: LOGIC FOR index.html (Property Listing Page)
// Handles clicking 'Book Now' and redirecting to book.html
// =================================================================
const bookButtons = document.querySelectorAll(".book-btn");

if (bookButtons.length > 0) {
    bookButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const property = btn.getAttribute("data-property");
            
            // Redirect to book.html, passing the property name as a URL parameter
            if (property) {
                window.location.href = `book.html?property=${encodeURIComponent(property)}`;
            } else {
                alert("Could not determine property name. Please try again.");
            }
        });
    });
}


// =================================================================
// PART 2: LOGIC FOR book.html (Booking Form Page)
// Handles reading the URL parameter and submitting the form via AJAX
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if the form elements exist (i.e., we are on book.html)
    const bookingForm = document.getElementById("bookingForm");
    
    if (bookingForm) {
        const propertyTitle = document.getElementById("propertyTitle");
        const propertyNameInput = document.getElementById("propertyName");
        const bookingDateInput = document.getElementById("bookingDate");
        const bookingMessageInput = document.getElementById("bookingMessage");

        // --- 2A. Get Property Name from URL ---
        const urlParams = new URLSearchParams(window.location.search);
        const propertyNameFromUrl = urlParams.get('property') || 'N/A - Property Unknown';
        
        // Update the visible title and the hidden input field
        if (propertyTitle) {
            propertyTitle.innerText = `Selected Property: ${propertyNameFromUrl}`;
        }
        if (propertyNameInput) {
            propertyNameInput.value = propertyNameFromUrl;
        }

        // --- 2B. Form Submission Handler ---
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Capture and trim values
            const booking_date = bookingDateInput.value.trim();
            const message = bookingMessageInput.value.trim();
            const property_name = propertyNameInput.value.trim();

            // Basic client-side validation
            if (!booking_date || !message || !property_name || property_name.startsWith('N/A')) {
                alert("Please ensure the Date and Message fields are filled and a valid property is selected.");
                return;
            }

            console.log("Submitting:", { property_name, booking_date, message });

            fetch("booking.php", {
                method: "POST",
                // Use URLSearchParams for clean data serialization
                body: new URLSearchParams({
                    property_name: property_name,
                    booking_date: booking_date,
                    message: message
                })
            })
            .then(res => res.text())
            .then(data => {
                const responseData = data.trim(); 
                
                if(responseData === "success") {
                    alert("Your property booking has been saved! We will contact you soon.");
                    bookingForm.reset(); 
                    // Redirect back to main page after success
                    window.location.assign("index.html"); 
                } else if(responseData === "not_logged_in") {
                    alert("Please login first to book a property.");
                    window.location.assign("login.html"); 
                } else {
                    console.error("Server Response Error:", data); 
                    alert(`Error saving booking: ${responseData}. Please try again.`);
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                alert("A network error occurred. Please check your connection.");
            });
        });
    }
});


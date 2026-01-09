// Function to search properties
function searchProperty() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  let found = false;

  cards.forEach(card => {
    const name = card.getAttribute("data-name") || '';
    const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
    
    if (name.toLowerCase().includes(input) || title.includes(input)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show "No properties found" message
  let msg = document.getElementById("noResults");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "noResults";
    msg.style.textAlign = "center";
    msg.style.marginTop = "20px";
    msg.style.color = "#ff0000";
    msg.textContent = "No properties found.";
    document.getElementById("propertyList").parentNode.appendChild(msg);
  }

  msg.style.display = found ? "none" : "block";
}

// Run search on typing and button click
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  if (input) input.addEventListener("keyup", searchProperty);
  if (button) button.addEventListener("click", searchProperty);
});

// Scroll animations (already in your previous JS)
const reveals = document.querySelectorAll(".section");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.15 });

reveals.forEach(section => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});

const cardsAnim = document.querySelectorAll(".card");
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

cardsAnim.forEach(card => cardObserver.observe(card));
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const propertyList = document.getElementById('propertyList');
    const propertyCards = propertyList ? propertyList.querySelectorAll('.card') : [];

    // Function to filter properties based on search term
    const filterProperties = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        propertyCards.forEach(card => {
            // Get the name from the data attribute for searching
            const propertyName = card.getAttribute('data-name').toLowerCase();
            
            // Get the text content for a broader search (price, beds, etc.)
            const cardText = card.textContent.toLowerCase();

            // Check if the search term matches the name OR any text in the card
            if (propertyName.includes(searchTerm) || cardText.includes(searchTerm)) {
                // Show the card
                card.style.display = 'block'; 
            } else {
                // Hide the card
                card.style.display = 'none'; 
            }
        });
    };

    // Attach the filter function to the input event (as the user types)
    if (searchInput) {
        searchInput.addEventListener('input', filterProperties);
    }
    
    // Optional: Also filter when the main search button is clicked
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            // Prevent default button action (like form submission)
            e.preventDefault(); 
            filterProperties();
        });
    }
});

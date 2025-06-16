document.addEventListener('DOMContentLoaded', function() {
    // Get the search input element
    const searchInput = document.querySelector('.search-bar input');

    // Get all the alert items
    const alertItems = document.querySelectorAll('.alert-item');

    // Add an event listener for input changes on the search bar
    searchInput.addEventListener('keyup', function() {
        // Get the current value of the search input and convert to lowercase for case-insensitive search
        const searchTerm = searchInput.value.toLowerCase();

        // Loop through each alert item
        alertItems.forEach(function(item) {
            // Get the text content from the alert item (you can choose which parts to search)
            // For example, we'll search in the alert title, description, and meta info.
            const alertTitle = item.querySelector('h4').textContent.toLowerCase();
            const alertDescription = item.querySelector('p').textContent.toLowerCase();
            const alertMeta = item.querySelector('.alert-meta').textContent.toLowerCase();

            // Combine all searchable text
            const alertText = `${alertTitle} ${alertDescription} ${alertMeta}`;

            // Check if the alert's text contains the search term
            if (alertText.includes(searchTerm)) {
                item.style.display = 'flex'; // Show the alert item (using flex as defined in CSS)
            } else {
                item.style.display = 'none'; // Hide the alert item
            }
        });
    });
});
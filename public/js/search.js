// Search functionality
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
let debounceTimer;

searchInput.addEventListener('input', function(e) {
    clearTimeout(debounceTimer);
    const query = e.target.value;

    // Clear suggestions if input is empty
    if (!query) {
        searchSuggestions.innerHTML = '';
        searchSuggestions.style.display = 'none';
        return;
    }

    // Debounce search
    debounceTimer = setTimeout(() => {
        fetch(`/api/v1/products/search?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                searchSuggestions.innerHTML = '';
                
                if (data.length === 0) {
                    searchSuggestions.style.display = 'none';
                    return;
                }

                data.forEach(product => {
                    const div = document.createElement('div');
                    div.className = 'search-suggestion-item';
                    div.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="suggestion-details">
                            <div class="suggestion-name">${product.name}</div>
                            <div class="suggestion-price">${product.price} so'm</div>
                        </div>
                    `;
                    div.addEventListener('click', () => {
                        window.location.href = `/products/${product.id}`;
                    });
                    searchSuggestions.appendChild(div);
                });

                searchSuggestions.style.display = 'block';
            })
            .catch(error => {
                console.error('Qidiruv xatosi:', error);
            });
    }, 300);
});

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.style.display = 'none';
    }
});

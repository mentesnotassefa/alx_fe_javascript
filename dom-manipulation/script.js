

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data.map(item => ({ text: item.title, category: item.title }));
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}
async function postQuoteToServer(quote) {
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    // Resolve conflicts - Server data takes precedence
    serverQuotes.forEach(serverQuote => {
        const existingQuote = quotes.find(quote => quote.text === serverQuote.text);
        if (!existingQuote) {
            quotes.push(serverQuote);
        }
    });
    saveQuotes();
    filterQuotes(); // Update the displayed quotes
}

// Set an interval to sync with the server every 5 minutes
setInterval(syncWithServer, 300000);

async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();  // Save quotes to local storage
        await postQuoteToServer(newQuote);  // Post the new quote to the server

        // Update the categories dropdown if a new category is introduced
        if (!Array.from(document.getElementById('categoryFilter').options).some(option => option.value === newQuoteCategory)) {
            const option = document.createElement('option');
            option.value = newQuoteCategory;
            option.innerText = newQuoteCategory;
            document.getElementById('categoryFilter').appendChild(option);
        }

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("New quote added successfully!");
        filterQuotes();  // Update the displayed quotes
    } else {
        alert("Please enter both quote text and category.");
    }
}




// Array to store quotes

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "ድር ቢያብር አንበሳ ያስር", category: "Inspirational" },
    { text: "The purpose of our lives is to be happy", category: "Happiness"},
    { text: "Get busy living or get busy dying", category: "Motivational"},
    { text: "You only live once, but if you do it right, once is enough", category: "Life"}
];



// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    // Clear previous quote
    quoteDisplay.innerHTML = '';

    // Create elements for the quote and category
    const quoteText = document.createElement('p');
    const quoteCategory = document.createElement('p');
    quoteText.innerHTML = `Quote: ${randomQuote.text}`;
    quoteCategory.innerHTML = `Category: ${randomQuote.category}`;

    // Append elements to the quoteDisplay
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}
// Call loadQuotes when the script loads
loadQuotes();

// Function to load the last selected category filter from local storage
function loadLastSelectedCategory() {
    return localStorage.getItem('lastSelectedCategory') || 'all';
}

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the last selected category filter
    const lastSelectedCategory = loadLastSelectedCategory();
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `Quote:-${quote.text} - Category:-${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });

    // Save the selected category filter
    saveLastSelectedCategory(selectedCategory);
}






// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
         // Update the categories dropdown if a new category is introduced
         if (!Array.from(document.getElementById('categoryFilter').options).some(option => option.value === newQuoteCategory)) {
            const option = document.createElement('option');
            option.value = newQuoteCategory;
            option.textContent = newQuoteCategory;
            document.getElementById('categoryFilter').appendChild(option);
        }
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("New quote added successfully!");
        filterQuotes();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes to JSON file
             function exportQuotes() {
                const jsonStr = JSON.stringify(quotes, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
               const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
               a.href = url;
                a.download = 'quotes.json';
                document.body.appendChild(a);
                a.click();
             document.body.removeChild(a);
                URL.revokeObjectURL(url);
          }

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
populateCategories();
createAddQuoteForm();

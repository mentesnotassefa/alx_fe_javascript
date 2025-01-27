// Existing code...
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("New quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to add new input fields
function addInputFields() {
    const quoteForm = document.getElementById('quoteForm');
    
    // Create new input for quote text
    const newQuoteInput = document.createElement('input');
    newQuoteInput.type = 'text';
    newQuoteInput.placeholder = 'Enter a new quote';
    quoteForm.appendChild(newQuoteInput);

    // Create new input for quote category
    const newCategoryInput = document.createElement('input');
    newCategoryInput.type = 'text';
    newCategoryInput.placeholder = 'Enter quote category';
    quoteForm.appendChild(newCategoryInput);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

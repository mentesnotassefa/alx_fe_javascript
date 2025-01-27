// Array to store quotes

let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    // Add more quotes as needed
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



// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
createAddQuoteForm();

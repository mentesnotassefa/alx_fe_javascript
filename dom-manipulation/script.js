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
loadQuotes



// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("New quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "quotes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
createAddQuoteForm();

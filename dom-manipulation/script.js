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
    document.getElementById('quoteDisplay').innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
}
// Function to create the add quote form
function createAddQuoteForm() {
    const form = document.createElement('div');
      const quoteInput = document.createElement('input');
      quoteInput.setAttribute('id', 'newQuoteText');
      quoteInput.setAttribute('type', 'text');
      quoteInput.setAttribute('placeholder', 'Enter a new quote');

    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
     categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter a quote category');

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
      addButton.onclick = addQuote;

     form.appendChild(quoteInput);
     form.appendChild(categoryInput);
    form.appendChild(addButton);

        addQuoteFormContainer.appendChild(form);
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

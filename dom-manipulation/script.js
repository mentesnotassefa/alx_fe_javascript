document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteFormContainer = document.getElementById('addQuoteFormContainer');

    let quotes = [
        { text: "The only way to do great work is to love what you do.", category: "Motivational" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "ድር ቢያብር አንበሳ ያስር", category: "Inspirational" },
        { text: "The purpose of our lives is to be happy", category: "Happiness"},
        { text: "Get busy living or get busy dying", category: "Motivational"},
        { text: "You only live once, but if you do it right, once is enough", category: "Life"}
    ];

     // Function to display a random quote
    function showRandomQuote() {
       const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteDisplay.innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
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
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if(newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote);
            document.getElementById('newQuoteText').value = "";
            document.getElementById('newQuoteCategory').value = "";
            showRandomQuote() //show random quote so it is immediately visible in page

        }
    }

    newQuoteButton.addEventListener('click', showRandomQuote);
    createAddQuoteForm(); // creates the add quote form on page load
});


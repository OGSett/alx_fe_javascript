// ======= global data =======
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" },
  { text: "If you thought about it, you can do it.", category: "Inspiration" }
];

// ======= RENDER QUOTE TO DOM =======
function renderQuoteToDOM(quoteObj) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quoteObj.text}</p>
    <p><em>Category:</em> ${quoteObj.category}</p>
  `;
}

// ======= random quotes =======
function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  renderQuoteToDOM(randomQuote);
}

// ======= add quotes =======
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both quote text and category.");
    return;
  }

  const newQuote = {
    text: newText,
    category: newCategory
  };

  quotes.push(newQuote);
  textInput.value = "";
  categoryInput.value = "";
  alert("Quote added successfully!");
}

// ======= event listeners =======
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});

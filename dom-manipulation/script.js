// ======= quotes array =======
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Tech" },
  { text: "Do or do not, there is no try.", category: "Inspiration" }
];

// ======= function: showRandomQuote =======
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `Quote: ${randomQuote.text}`;

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `Category: ${randomQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// ======= function: createAddQuoteForm =======
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// ======= function: addQuote =======
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newText || !newCategory) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  // showing the new quote
  showRandomQuote();

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ======= dom final checks =======
document.addEventListener("DOMContentLoaded", () => {
  const newQuoteBtn = document.getElementById("newQuote");
  newQuoteBtn.addEventListener("click", showRandomQuote);

  createAddQuoteForm();
});

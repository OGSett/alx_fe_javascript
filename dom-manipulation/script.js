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


// ======= quotes array =======
let quotes = [];

// ======= function: local storrage =======
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "The only limit is your mind.", category: "Motivation" },
      { text: "Simplicity is the soul of efficiency.", category: "Tech" },
      { text: "Do or do not, there is no try.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

// ======= function: showRandomQuote =======
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

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
  saveQuotes();
  // showing the new quote
  showRandomQuote();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ======= exporting to json file =======
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// ======= import from jsopn file =======
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ======= dom final checks =======
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();

  const newQuoteBtn = document.getElementById("newQuote");
  newQuoteBtn.addEventListener("click", showRandomQuote);

  createAddQuoteForm();

  // json export btn
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Quotes (JSON)";
  exportBtn.addEventListener("click", exportToJsonFile);
  document.body.appendChild(exportBtn);

  // json import input
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  document.body.appendChild(importInput);

  // show last quote from session storage
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const lastQuote = JSON.parse(last);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";

    const quoteText = document.createElement("p");
    quoteText.textContent = `Last viewed: ${lastQuote.text}`;
    const quoteCategory = document.createElement("p");
    quoteCategory.textContent = `Category: ${lastQuote.category}`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
  }
});

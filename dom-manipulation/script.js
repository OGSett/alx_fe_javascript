// ======= auotesa rray =======

let quotes = [];

// ======= localstorage =======
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

// ======= display quotes =======
function renderQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (filteredQuotes.length === 0) {
    const noQuote = document.createElement("p");
    noQuote.textContent = "No quotes found for this category.";
    quoteDisplay.appendChild(noQuote);
    return;
  }

  filteredQuotes.forEach(quote => {
    const quoteText = document.createElement("p");
    quoteText.textContent = `Quote: ${quote.text}`;

    const categoryText = document.createElement("p");
    categoryText.textContent = `Category: ${quote.category}`;

    const divider = document.createElement("hr");

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(categoryText);
    quoteDisplay.appendChild(divider);
  });
}

// ======= category / dropdown =======
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = "";

  const optionAll = document.createElement("option");
  optionAll.value = "all";
  optionAll.textContent = "All Categories";
  categoryFilter.appendChild(optionAll);

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Set last selected category from localStorage
  const lastSelected = localStorage.getItem("lastSelectedCategory");
  if (lastSelected && categories.includes(lastSelected)) {
    categoryFilter.value = lastSelected;
    filterQuotes();
  } else {
    renderQuotes(quotes);
  }
}

// ======= filter by category =======
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);


  if (selectedCategory === "all") {
    renderQuotes(quotes);
  } else {
    const filtered = quotes.filter(q => q.category === selectedCategory);
    renderQuotes(filtered);
  }
}

// ======= create quote form =======
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

// ======= add quotes =======
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ======= to json file =======
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// ======= from json file =======
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid format.");
      }
    } catch {
      alert("Failed to import JSON.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ======= final state =======
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  document.getElementById("newQuote").addEventListener("click", () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    renderQuotes([random]);
  });

  document.getElementById("exportQuotesButton").addEventListener("click", exportToJsonFile);
});

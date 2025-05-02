const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

function renderLibrary() {
  const container = document.getElementById("library-container");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Páginas:</strong> ${book.pages}</p>
      <p><strong>Leído:</strong> ${book.read ? "Sí" : "No"}</p>
      <div class="card-buttons">
        <button class="read-toggle ${book.read ? "" : "not-read"}" data-id="${book.id}">
          Marcar como ${book.read ? "No leído" : "Leído"}
        </button>
        <button class="delete-btn" data-id="${book.id}">Eliminar</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeBook(btn.dataset.id);
    });
  });

  document.querySelectorAll(".read-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const book = myLibrary.find(b => b.id === btn.dataset.id);
      book.toggleRead();
      renderLibrary();
    });
  });
}

// Modal & Form Handling
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const pages = parseInt(form.pages.value);
  const read = form.read.checked;

  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    form.reset();
    dialog.close();
  }
});

// Demo books
addBookToLibrary("El Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

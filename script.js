const myLibrary = [];

function Book(title, author, pages, readBoolean, id) {
  if (!new.target) {
    throw Error("You need to use the 'new' operator")
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBoolean = readBoolean;
  this.id = id;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages,${this.readBoolean ? "read" : "not read yet"}`;
  }
}

function addBookToLibrary(title, author, pages, readBoolean) {
  const currentID = crypto.randomUUID();
  const currentBook = new Book(title, author, pages, readBoolean, currentID);
  myLibrary.push(currentBook);
}

function displayLibrary() {
  const container = document.getElementById('library-container');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong>${book.author}</p>
      <p><strong>Pages:</strong>${book.pages}</p>
      <p><strong>Status:</strong>${book.readBoolean}</p>
    `;
    container.appendChild(card);
  });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
displayLibrary();
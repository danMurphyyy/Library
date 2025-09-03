const myLibrary = [];

class Book{
  constructor(title, author, pages, readBoolean, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBoolean = readBoolean;
    this.id = id;
  }
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages,${this.readBoolean ? "read" : "not read yet"}`;
}

Book.prototype.toggleRead = function() {
  this.readBoolean = !this.readBoolean;
}

function addBookToLibrary(title, author, pages, readBoolean) {
  const currentID = crypto.randomUUID();
  const currentBook = new Book(title, author, pages, readBoolean, currentID);
  myLibrary.push(currentBook);
}

function removeBook(id) {
  // 1. Find the index of the book in myLibrary that has a matching Id
  const index = myLibrary.findIndex(book => book.id === id);

  // 2. If a book with that Id exists
  if (index !== -1) {
    // 3. Remove exactly 1 element from that library
    myLibrary.splice(index, 1);

    // 4. Re-render library to show the book has gone
    displayLibrary();
  }
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
      <p><strong>Status:</strong>${book.readBoolean ? "Read" : "Not Read Yet"}</p>
      <button data-id="${book.id}" class="toggle-read-btn">Toggle Read</button>
      <button data-id="${book.id}" class="delete-btn">Delete</button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookId = this.getAttribute('data-id');
      removeBook(bookId);
    })
  })

  document.querySelectorAll('.toggle-read-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const bookId = this.getAttribute('data-id');
      const book = myLibrary.find(book => book.id === bookId);
      book.toggleRead();
      displayLibrary();
    });
  })
}

document.getElementById('show-form-btn').addEventListener('click', function () {
  document.getElementById('book-form').style.display = 'block';
})

document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayLibrary();
  this.reset();
  this.style.display = 'none';
})
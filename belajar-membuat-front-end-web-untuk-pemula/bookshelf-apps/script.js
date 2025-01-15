const bookForm = document.getElementById('book-form');
const incompleteBookshelf = document.getElementById('incomplete-bookshelf');
const completeBookshelf = document.getElementById('complete-bookshelf');
const searchInput = document.getElementById('search');
const editModal = document.getElementById('edit-modal');
const editBookForm = document.getElementById('edit-book-form');
const deleteModal = document.getElementById('delete-modal');
const BOOKS_KEY = 'books';

function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

function createBookElement(book) {
  const bookItem = document.createElement('div');
  bookItem.className = 'book-item';
  bookItem.dataset.id = book.id;

  const bookInfo = document.createElement('div');
  bookInfo.textContent = `${book.title} - ${book.author} (${book.year})`;

  const actions = document.createElement('div');

  const toggleButton = document.createElement('button');
  toggleButton.textContent = book.isComplete ? 'Belum selesai' : 'Selesai';
  toggleButton.addEventListener('click', () => toggleBookStatus(book.id));

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => openEditModal(book));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.addEventListener('click', () => openDeleteModal(book));

  actions.appendChild(toggleButton);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  bookItem.appendChild(bookInfo);
  bookItem.appendChild(actions);

  return bookItem;
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  saveBooks(books);
  renderBooks();
}

function toggleBookStatus(bookId) {
  const books = getBooks();
  const book = books.find(b => b.id == bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    saveBooks(books);
    renderBooks();
  }
}

function deleteBook(bookId) {
  const books = getBooks();
  const newBooks = books.filter(b => b.id != bookId);
  saveBooks(newBooks);
  renderBooks();
}

function renderBooks(searchQuery = '') {
  incompleteBookshelf.innerHTML = '';
  completeBookshelf.innerHTML = '';

  const books = getBooks().filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  books.forEach(book => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookshelf.appendChild(bookElement);
    } else {
      incompleteBookshelf.appendChild(bookElement);
    }
  });
}

function openEditModal(book) {
  document.getElementById('edit-id').value = book.id;
  document.getElementById('edit-title').value = book.title;
  document.getElementById('edit-author').value = book.author;
  document.getElementById('edit-year').value = book.year;
  document.getElementById('edit-isComplete').checked = book.isComplete;
  editModal.style.display = 'block';
}

function closeEditModal() {
  editModal.style.display = 'none';
}

function updateBook(updatedBook) {
  const books = getBooks();
  const bookIndex = books.findIndex(b => b.id == updatedBook.id);
  if (bookIndex > -1) {
    books[bookIndex] = updatedBook;
    saveBooks(books);
    renderBooks();
  }
}

function openDeleteModal(book) {
  const confirmDeleteButton = document.getElementById('confirm-delete');
  const cancelDeleteButton = document.getElementById('cancel-delete');

  confirmDeleteButton.addEventListener('click', () => {
    deleteBook(book.id);
    closeDeleteModal();
  });

  cancelDeleteButton.addEventListener('click', () => {
    closeDeleteModal();
  });

  deleteModal.style.display = 'block';
}

function closeDeleteModal() {
  deleteModal.style.display = 'none';
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isComplete = document.getElementById('isComplete').checked;

  const book = {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isComplete
  };

  addBook(book);

  bookForm.reset();
});

searchInput.addEventListener('input', (e) => {
  renderBooks(e.target.value);
});

editBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;
  const title = document.getElementById('edit-title').value;
  const author = document.getElementById('edit-author').value;
  const year = document.getElementById('edit-year').value;
  const isComplete = document.getElementById('edit-isComplete').checked;

  const updatedBook = {
    id: parseInt(id),
    title,
    author,
    year: parseInt(year),
    isComplete
  };

  updateBook(updatedBook);
  closeEditModal();
});

document.querySelector('.close').addEventListener('click', closeEditModal);

window.addEventListener('click', (e) => {
  if (e.target == editModal) {
    closeEditModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
});
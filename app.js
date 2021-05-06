// book class
function Book(title,author,isbn) {
    this.title= title;
    this.author = author;
    this.isbn = isbn;
}

// UI Class
function UI() {}
  
// add book
UI.prototype.addBook = function(book){
  let tr = document.createElement('tr');
  tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#"><i class="far fa-times-circle"></i></a></td>
  `
  document.querySelector('#book-list').appendChild(tr);

}

// delete book
UI.prototype.deleteBook = function(bookElement){
  bookElement.remove();

}

// clear books
UI.prototype.clearBooks = function(){
  document.querySelector('#book-list').innerHTML = '';

}

// filter bookd
UI.prototype.filterBooks = function(){
  let txt = document.querySelector('#filter').value.toUpperCase();
  let books = document.querySelectorAll('#book-list tr');
  books.forEach(book=>{
    if (book.firstElementChild.textContent.toUpperCase().indexOf(txt) != -1 ||
        book.firstElementChild.nextElementSibling.textContent.toUpperCase().indexOf(txt) != -1 ||
        book.lastElementChild.previousElementSibling.textContent.toUpperCase().indexOf(txt) != -1) {
      book.style.display = 'table-row';
    } else {
      book.style.display = 'none';
    } 
  })
}

// display alert
UI.prototype.displayAlert = function(msg, className){
  let div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  document.querySelector('.container').insertBefore(div,document.querySelector('form'));
  setTimeout(() => {
    div.remove();
  }, 2000);
}

// clear book
UI.prototype.emptyBook = function(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}


// Store Class
function Store () {}
  
// get books LS
Store.prototype.getBooksLS =  function(){
  let books;
  if(localStorage.getItem('books') === null) {
    books = []; 
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

// add Book LS
Store.prototype.addBookLS = function(book){
  let books = this.getBooksLS();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

}

// delete book LS
Store.prototype.deleteBookLS = function(ISBN){
  let books = this.getBooksLS();
  books.forEach((book,i) =>{
    if (book.isbn === ISBN) {
      books.splice(i,1);
    }
  })
  localStorage.setItem('books', JSON.stringify(books));
  
}

// display book LS
Store.prototype.displayBooksLS = function(){
  let store = new Store();
  let books = store.getBooksLS();
  let ui = new UI();
  books.forEach(book => {
    ui.addBook(book);
  });
}

// clear book LS
Store.prototype.clearBooksLS = function(){
  localStorage.removeItem('books');
}


// load event
document.addEventListener('DOMContentLoaded', function(){
  let store = new Store();
  store.displayBooksLS();
});

// submit event
document.querySelector('form').addEventListener('submit', function(e){
  // dom value
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let isbn = document.querySelector('#isbn').value;
  
  ui = new UI();
  if (title === '' || author === '' || isbn==='') {
    ui.displayAlert("Please enter valid data", "alert-danger");
  } else {
    let book = new Book(title,author, isbn);
    let store = new Store();
    ui.addBook(book);
    store.addBookLS(book);
    ui.emptyBook();
    ui.displayAlert("Book added", "alert-success");
  }

  e.preventDefault();
})

// delete event
document.querySelector('#book-list').addEventListener('click', function(e){  
  if (e.target.classList.contains('fa-times-circle')) {
    let ui = new UI();
    let store = new Store();
    ui.deleteBook(e.target.parentElement.parentElement.parentElement);
    store.deleteBookLS(e.target.parentElement.parentElement.previousElementSibling.textContent);
    ui.displayAlert("Book deleted", "alert-success");
  }
  e.preventDefault();
})

// clear books
document.querySelector('#clear-btn').addEventListener('click', function(){
  let ui= new UI();
  let store = new Store();
  ui.clearBooks();
  store.clearBooksLS();
  ui.displayAlert("Book list cleared", "alert-success");
})

// filter event
document.querySelector('#filter').addEventListener('keyup', function(e){
  let ui = new UI();
  ui.filterBooks();
})































































// // Book Constructor
// function Book(title, author, isbn) {
//   this.title = title;
//   this.author = author;
//   this.isbn = isbn;
// }

// // UI Constructor
// function UI() {}

// // Add Book To List
// UI.prototype.addBookToList = function(book){
//   const list = document.getElementById('book-list');
//   // Create tr element
//   const row = document.createElement('tr');
//   // Insert cols
//   row.innerHTML = `
//     <td>${book.title}</td>
//     <td>${book.author}</td>
//     <td>${book.isbn}</td>
//     <td><a href="#" class="delete">X<a></td>
//   `;

//   list.appendChild(row);
// }

// // Show Alert
// UI.prototype.showAlert = function(message, className) {
//   // Create div
//   const div = document.createElement('div');
//   // Add classes
//   div.className = `alert ${className}`;
//   // Add text
//   div.appendChild(document.createTextNode(message));
//   // Get parent
//   const container = document.querySelector('.container');
//   // Get form
//   const form = document.querySelector('#book-form');
//   // Insert alert
//   container.insertBefore(div, form);

//   // Timeout after 3 sec
//   setTimeout(function(){
//     document.querySelector('.alert').remove();
//   }, 3000);
// }

// // Delete Book
// UI.prototype.deleteBook = function(target){
//   if(target.className === 'delete') {
//     target.parentElement.parentElement.remove();
//   }
// }

// // Clear Fields
// UI.prototype.clearFields = function() {
//   document.getElementById('title').value = '';
//   document.getElementById('author').value = '';
//   document.getElementById('isbn').value = '';
// }

// // Event Listener for add book
// document.getElementById('book-form').addEventListener('submit', function(e){
//   // Get form values
//   const title = document.getElementById('title').value,
//         author = document.getElementById('author').value,
//         isbn = document.getElementById('isbn').value

//   // Instantiate book
//   const book = new Book(title, author, isbn);

//   // Instantiate UI
//   const ui = new UI();

//   // Validate
//   if(title === '' || author === '' || isbn === '') {
//     // Error alert
//     ui.showAlert('Please fill in all fields', 'error');
//   } else {
//     // Add book to list
//     ui.addBookToList(book);

//     // Show success
//     ui.showAlert('Book Added!', 'success');
  
//     // Clear fields
//     ui.clearFields();
//   }

//   e.preventDefault();
// });

// // Event Listener for delete
// document.getElementById('book-list').addEventListener('click', function(e){

//   // Instantiate UI
//   const ui = new UI();

//   // Delete book
//   ui.deleteBook(e.target);

//   // Show message
//   ui.showAlert('Book Removed!', 'success');

//   e.preventDefault();
// });
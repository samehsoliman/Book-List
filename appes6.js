// book class
class Book {
  constructor(title,author,isbn) {
    this.title= title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  // add book
  addBook(book){
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
  deleteBook(bookElement){
    bookElement.remove();

  }

  // clear books
  clearBooks(){
    document.querySelector('#book-list').innerHTML = '';
  }

  // filter bookd
  filterBooks(){
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
  displayAlert(msg, className){
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    document.querySelector('.container').insertBefore(div,document.querySelector('form'));
    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  // clear book
  emptyBook(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class
class Store {
  // get books LS
  static getBooksLS(){
    let books;
    if(localStorage.getItem('books') === null) {
      books = []; 
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  // add Book LS
  static addBookLS(book){
    let books = this.getBooksLS();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }

  // delete book LS
  static deleteBookLS(ISBN){
    let books = this.getBooksLS();
    books.forEach((book,i) =>{
      if (book.isbn === ISBN) {
        books.splice(i,1);
      }
    })
    localStorage.setItem('books', JSON.stringify(books));
    
  }

  // display book LS
  static displayBooksLS(){
    let books = Store.getBooksLS();
    let ui = new UI();
    books.forEach(book => {
      ui.addBook(book);
    });
  }

  // clear book LS
  static clearBooksLS(){
    localStorage.removeItem('books');
  }
}

// load event
document.addEventListener('DOMContentLoaded', Store.displayBooksLS);

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
    ui.addBook(book);
    Store.addBookLS(book);
    ui.emptyBook();
    ui.displayAlert("Book added", "alert-success");
  }
  e.preventDefault();
})

// delete event
document.querySelector('#book-list').addEventListener('click', function(e){  
  if (e.target.classList.contains('fa-times-circle')) {
    let ui = new UI();
    ui.deleteBook(e.target.parentElement.parentElement.parentElement);
    Store.deleteBookLS(e.target.parentElement.parentElement.previousElementSibling.textContent);
    ui.displayAlert("Book deleted", "alert-success");
  }
  e.preventDefault();
})

// clear books
document.querySelector('#clear-btn').addEventListener('click', function(){
  let ui= new UI();
  ui.clearBooks();
  Store.clearBooksLS();
  ui.displayAlert("Book list cleared", "alert-success");
})

// filter event
document.querySelector('#filter').addEventListener('keyup', function(e){
  let ui = new UI();
  ui.filterBooks();
})















































// class Book {
//   constructor(title, author, isbn){
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
//   }
// }

// class UI {
//   // add book
//   addBook(book){
//     let tr = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${book.title}</td>
//       <td>${book.author}</td>
//       <td>${book.isbn}</td>
//       <td><a href="#"><i class="far fa-times-circle"></i></a></td>
//     `;
//     document.querySelector('#book-list').appendChild(tr);
//   }

//   // delete book
//   deleteBook(book){
//     book.remove();
//   }

//   // display alert
//   displayAlert(msg, className){
//     let div = document.createElement('div');
//     div.className = `alert ${className}`;
//     div.appendChild(document.createTextNode(msg));
//     const form = document.querySelector('form');
//     const container = document.querySelector('.container');
//     container.insertBefore(div, form);
//     setTimeout(() => {
//       div.remove();
//     }, 2000);
//   }

//   // clear fields
//   clearFields(){
//     document.querySelector('#title').value = '';
//     document.querySelector('#author').value = '';
//     document.querySelector('#isbn').value = '';
//   }
  
// }


// class Store {
//   // get books LS
//   static getBooksLS(){
//     let books;
//     if (localStorage.getItem('books') === null) {
//       books = [];
//     } else {
//       books = JSON.parse(localStorage.getItem('books'));
//     }
//     return books;
//   }

//   // display books
//   static displayBooks(){
//     let books = Store.getBooksLS();
//     let ui = new UI();
//     books.forEach(book =>{
//       ui.addBook(book);
//     })

//   }

//   // add book ls
//   static addBookLS(book){
//     let books = Store.getBooksLS();
//     books.push(book);
//     localStorage.setItem('books', JSON.stringify(books));
//   }

//   // delete book ls
//   static deleteBookLS(isbn){
//     let books = Store.getBooksLS();  
//     books.forEach((book,i) =>{
//       if (book.isbn === isbn) {
//         books.splice(i,1);
//       }
//     })
//     localStorage.setItem('books', JSON.stringify(books));
//   }
// }

// // DOM load event
// document.addEventListener('DOMContentLoaded', Store.displayBooks);

// // form submit event
// document.querySelector('form').addEventListener('submit', function(e){
//   const title = document.querySelector('#title').value,
//         author = document.querySelector('#author').value,
//         isbn = document.querySelector('#isbn').value;
  
//   const ui = new UI();
//   if (title === '' || author === '' || isbn === ''){
//     ui.displayAlert('Please enter correct book data', 'alert-danger');
//   } else {
//     let book = new Book(title, author, isbn);
//     ui.addBook(book);
//     Store.addBookLS(book);
//     ui.clearFields();
//     ui.displayAlert('Book added to list', 'alert-success');
//   }     
//   e.preventDefault();
// })

// // delete event
// document.querySelector('#book-list').addEventListener('click', function(e){
//   ui = new UI();
//   if (e.target.classList.contains('fa-times-circle')) {
//     ui.deleteBook(e.target.parentElement.parentElement.parentElement);
//     Store.deleteBookLS(e.target.parentElement.parentElement.previousElementSibling.textContent);
//     ui.displayAlert('Book deleted from list', 'alert-danger');
//   }

  

//   e.preventDefault();
// })






















































// // class Book {
// //   constructor(title, author, isbn) {
// //     this.title = title;
// //     this.author = author;
// //     this.isbn = isbn;
// //   }
// // }

// // class UI {
// //   addBookToList(book) {
// //     const list = document.getElementById('book-list');
// //     // Create tr element
// //     const row = document.createElement('tr');
// //     // Insert cols
// //     row.innerHTML = `
// //       <td>${book.title}</td>
// //       <td>${book.author}</td>
// //       <td>${book.isbn}</td>
// //       <td><a href="#" class="delete">X<a></td>
// //     `;
  
// //     list.appendChild(row);
// //   }

// //   showAlert(message, className) {
// //     // Create div
// //     const div = document.createElement('div');
// //     // Add classes
// //     div.className = `alert ${className}`;
// //     // Add text
// //     div.appendChild(document.createTextNode(message));
// //     // Get parent
// //     const container = document.querySelector('.container');
// //     // Get form
// //     const form = document.querySelector('#book-form');
// //     // Insert alert
// //     container.insertBefore(div, form);

// //     // Timeout after 3 sec
// //     setTimeout(function(){
// //       document.querySelector('.alert').remove();
// //     }, 3000);
// //   }

// //   deleteBook(target) {
// //     if(target.className === 'delete') {
// //       target.parentElement.parentElement.remove();
// //     }
// //   }

// //   clearFields() {
// //     document.getElementById('title').value = '';
// //     document.getElementById('author').value = '';
// //     document.getElementById('isbn').value = '';
// //   }
// // }

// // // Local Storage Class
// // class Store {
// //   static getBooks() {
// //     let books;
// //     if(localStorage.getItem('books') === null) {
// //       books = [];
// //     } else {
// //       books = JSON.parse(localStorage.getItem('books'));
// //     }

// //     return books;
// //   }

// //   static displayBooks() {
// //     const books = Store.getBooks();

// //     books.forEach(function(book){
// //       const ui  = new UI;

// //       // Add book to UI
// //       ui.addBookToList(book);
// //     });
// //   }

// //   static addBook(book) {
// //     const books = Store.getBooks();

// //     books.push(book);

// //     localStorage.setItem('books', JSON.stringify(books));
// //   }

// //   static removeBook(isbn) {
// //     const books = Store.getBooks();

// //     books.forEach(function(book, index){
// //      if(book.isbn === isbn) {
// //       books.splice(index, 1);
// //      }
// //     });

// //     localStorage.setItem('books', JSON.stringify(books));
// //   }
// // }

// // // DOM Load Event
// // document.addEventListener('DOMContentLoaded', Store.displayBooks);

// // // Event Listener for add book
// // document.getElementById('book-form').addEventListener('submit', function(e){
// //   // Get form values
// //   const title = document.getElementById('title').value,
// //         author = document.getElementById('author').value,
// //         isbn = document.getElementById('isbn').value

// //   // Instantiate book
// //   const book = new Book(title, author, isbn);

// //   // Instantiate UI
// //   const ui = new UI();

// //   console.log(ui);

// //   // Validate
// //   if(title === '' || author === '' || isbn === '') {
// //     // Error alert
// //     ui.showAlert('Please fill in all fields', 'error');
// //   } else {
// //     // Add book to list
// //     ui.addBookToList(book);

// //     // Add to LS
// //     Store.addBook(book);

// //     // Show success
// //     ui.showAlert('Book Added!', 'success');
  
// //     // Clear fields
// //     ui.clearFields();
// //   }

// //   e.preventDefault();
// // });

// // // Event Listener for delete
// // document.getElementById('book-list').addEventListener('click', function(e){

// //   // Instantiate UI
// //   const ui = new UI();

// //   // Delete book
// //   ui.deleteBook(e.target);

// //   // Remove from LS
// //   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// //   // Show message
// //   ui.showAlert('Book Removed!', 'success');

// //   e.preventDefault();
// // });
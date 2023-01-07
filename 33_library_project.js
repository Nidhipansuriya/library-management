// console.log("This is librabry");


// contructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// display constructor

function Display() {

}

// add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI")
    // tableBody = document.getElementsById('tablebody');
    tableBody = document.getElementById('tablebody');
    let uiString = `<tr>
                        <th scope="row">-</th>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

    tableBody.innerHTML += uiString;
}

//implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryform');
    libraryForm.reset();
}

// implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

// show function 
Display.prototype.show = function (type, displaymessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displaymessage}.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`

    setTimeout(function(){
        message.innerHTML = ''
    }, 2000);
}

// add submit event listener to form
let libraryForm = document.getElementById('libraryform');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();  //it will not allow the page to reloade after submint event

    console.log('You have submitted library form');

    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else (cooking.checked)
    type = cooking.value;


    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        display.show('danger', 'Sorry you cannot add this book.')

    }


}


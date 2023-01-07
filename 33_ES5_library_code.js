class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add() {

        console.log("Adding to UI");
        // let tableBody = document.getElementById('tableBody');
        // let uiString = `<tr>
        //                     <td>${book.name}</td>
        //                     <td>${book.author}</td>
        //                     <td>${book.type}</td>
        //                 </tr>`;
        // tableBody.innerHTML += uiString;

        let librabrybook = localStorage.getItem("books");
        if (librabrybook == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(librabrybook);
        }

        let uiString = "";



        bookObj.forEach(function (element) {
            uiString += `<tr>
                            <th scope="row">-</th>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                        </tr> `
        });



        let bookElm = document.getElementById('tablebody');
        if(bookObj.length != 0){
            bookElm.innerHTML = uiString;
        }
        else{
            bookElm.innerHTML = `Nothing to show!!`;

        }
        // document.getElementById('tablebody').innerHTML = uiString;
        // let booksElm = document.getElementById('tablebody');
        // if (bookObj.length != 0) {
        //     booksElm.innerHTML = html;
        // }
        // else {
        //     booksElm.innerHTML = `Nothing to show!!`;
        // }

    }

    clear() {
        let libraryForm = document.getElementById('libraryform');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, displaymessage) {
        let message = document.getElementById('message');
        let errortype;
        if (type === 'success') {
            errortype = 'Success'
        }
        else {
            errortype = 'Error'
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${errortype}:</strong>  ${displaymessage}.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`

        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }

}



// add submit event listener to form
let libraryForm = document.getElementById('libraryform');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();  //it will not allow the page to reloade after submint event

    console.log('You have submitted library form');

    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }
    console.log(type);



    let book = new Book(name, author, type);
    console.log(book);

    if (book.name.length > 2 || book.author.length > 2) {

        let librabrybook = localStorage.getItem("books");
        if (librabrybook == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(librabrybook);
        }

        let myobjbook = {
            name: name,
            author: author,
            type: type
        }


        bookObj.push(myobjbook);
        localStorage.setItem('books', JSON.stringify(bookObj));
        console.log("successs");


    }
    else {
        console.log("Sorry this book cannot be added in local storage.");
    }

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



// Get all the ids
const searchField = document.getElementById('search-field');
const bookContainer = document.getElementById('book-container');
const errorMessage = document.getElementById('error-message');
const DataCount = document.getElementById('count');

// Loading Spinner
const toggleSpinner = displaySpinnerStyle =>{
    document.getElementById('spinner').style.display = displaySpinnerStyle;
}

// Toggle Search Result Function
const toggleSearchResultDiv = displaySpinnerStyle =>{
    document.getElementById('count-div').style.display = displaySpinnerStyle;
}
const toggleSearchResult = displaySpinnerStyle =>{
    document.getElementById('count').style.display = displaySpinnerStyle;
}

// Search Button Fuction
const loadBook = () => {
    const searchField = searchField.value;
    
    // Clear Search field
    DataCount.innerHTML = '';
    bookContainer.innerHTML = '';
    searchField.value = "";
    errorMessage.innerHTML = '';
    
    // Handle Error Message
    if(searchField === ''){
        toggleSearchResultDiv('none');
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please Enter Your Book Name!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    return;
    }

    // Visible Spinner / Loader
    toggleSpinner('block');
    toggleSearchResultDiv('none');
    toggleSearchResult('none');
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data, data.docs))
}


//Display number of Books
const displayBook = (data , books) => {
    const count = books.length;
    const AllBookCount = data.numFound;
    DataCount.innerHTML = `<span class="fw-bold text-primary fs-5">Showing : ${AllBookCount} OF ${count} Found Result</span>`;

    // Handle Error Message
    if(books.length === 0){
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong> No Result Found !</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }else if(books.length > 0){
     toggleSearchResultDiv('block');
     toggleSearchResult('none');
    }

    // Using For Each Loop 
    // Display Book Lists
    books.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow shadow-md">
           <img src="${imgUrl ? imgUrl : 'N/A'}" class="card-img-top" style="height:300px" alt="${book.title}" />
            <h6 class="card-title p-4"><span class="fw-bold text-primary fs-6">Name :</span> ${book.title}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" style = "font-size:1rem; font-weight:400"><span class="fw-bold text-primary fs-6">Author :</span> ${book.author_name?book.author_name[0]:'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:400"><span class="fw-bold text-primary fs-6">Publisher :</span> ${book.publisher?book.publisher[0]:'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:400"><span class="fw-bold text-primary fs-6">First Publish Year :</span> ${book.first_publish_year ? book.first_publish_year : 'N/A'}</li>
            </ul>
        </div>`;
        bookContainer.appendChild(div);
    });
    
    toggleSpinner('none');
    toggleSearchResult('block');
}
const searchForm = document.querySelector('.search_form'),
    searchHeader = document.querySelector('.search_header');

searchHeader.addEventListener('click', () => {
    searchForm.classList.add('open_search');
});
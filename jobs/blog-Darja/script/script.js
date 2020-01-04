const searchForm = document.querySelector('.search_form'),
    searchHeader = document.querySelector('.search_header'),
    searchIcon = document.querySelector('.search_icon'),
    closeSearch = document.querySelector('.close_search'),
    openSearch = document.querySelector('.open-search');

searchIcon.addEventListener('click', () => {
    searchForm.classList.add('open_search');
    searchIcon.style.display = 'none';
    closeSearch.style.display = 'flex';
});

closeSearch.addEventListener('click', () => {
    searchForm.style.top = '-150%';
    searchIcon.style.display = 'flex';
    closeSearch.style.display = 'none';
});
searchIcon.addEventListener('click', () => {
    searchForm.style.top = '81px';
    searchIcon.style.display = 'none';
    closeSearch.style.display = 'flex';
});
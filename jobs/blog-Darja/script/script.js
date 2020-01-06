// $('.burger_menu').on('click', () => {
//     $(this).toggleClass('menu_burger_active');
// });

const searchForm = document.querySelector('.search_form'),
    searchHeader = document.querySelector('.search_header'),
    searchIcon = document.querySelector('.search_icon'),
    closeSearch = document.querySelector('.close_search'),
    openSearch = document.querySelector('.open-search'),
    searchFormSmart = document.querySelector('.search_form_smart'),
    burgerMenu = document.querySelector('.burger_menu');

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
    searchForm.style.top = '100px';
    searchFormSmart.style.top = '57px';
    searchIcon.style.display = 'none';
    closeSearch.style.display = 'flex';
});

const imgPost = document.querySelectorAll('.img_post');

const options = {
    root : null,
    rootMargin: '0px',
    threshold : 0.1
}

function handleImg( myImg, observer){
    myImg.forEach(myImgSingle => {
        console.log(myImgSingle.intersectionRatio);

        if(myImgSingle.intersectionRatio > 0){
            loadImage(myImgSingle.target);
        }
    })
}

function loadImage(imgPost){
    imgPost.src = imgPost.getAttribute('data');
}

const observer = new IntersectionObserver(handleImg, options);

imgPost.forEach (imgPost => {
    observer.observe(imgPost);
})
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.add('menu_burger_active');
})


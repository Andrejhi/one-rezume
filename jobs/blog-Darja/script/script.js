const searchForm = document.querySelector('.search_form'),
    searchHeader = document.querySelector('.search_header'),
    searchIcon = document.querySelector('.search_icon'),
    closeSearch = document.querySelector('.close_search'),
    openSearch = document.querySelector('.open-search'),
    searchFormSmart = document.querySelector('.search_form_smart'),
    burgerMenu = document.querySelector('.burger_menu'),
    navBurgerDown = document.querySelector('.nav_burger_down');
    // boxMenuCl = document.querySelector('.box_menu_cl'),
    // boxMenuUp = document.querySelector('.box_menu_up');

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

    // $('.burger_menu').on('click', function(){
    //     $('.nav_burger_down').toggleClass('box_menu_up');
    // })
    // if(navBurgerDown.classList.add('box_menu_cl')){
    //     burgerMenu.addEventListener('click', () => {
    //         navBurgerDown.classList.add('box_menu_up');
    //     });
    // }
/

// ленивая загрузка

const imgPost = document.querySelectorAll('.img_post');
const postContent = document.querySelectorAll('.posts');

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
function loadDIV(postContent){
    postContent.src = postContent.getAttribute('data-real');
}

const observer = new IntersectionObserver(handleImg, options);

imgPost.forEach (imgPost => {
    observer.observe(imgPost);
})

// ленивая загрузка

// $('.burger_menu').on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('menu_burger_active');
//     $('.nav_burger_down').toggleClass('down_burger');
// });

// burgerMenu.addEventListener('click', () => {
//     navBurgerDown.classList.add('down_burger');
// })

let appended = false,
   arrow = document.createElement("div");
   arrow.id = "arrowUp";
   arrow.innerHTML = '<a href="#top">&uarr;</a>';
   window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 500) {
     if (!appended) {
      document.body.appendChild(arrow);
      appended = true;
     }
    } else {
     if (appended) {
      document.body.removeChild(arrow);
      appended = false;
     } 
    }
   }

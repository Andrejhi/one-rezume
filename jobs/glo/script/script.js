'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const search = document.querySelector('.search'), 
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        category = document.querySelector('.category'),
        cardCounter = cartBtn.querySelector('.counter'),
        wishlistCounter = wishlistBtn.querySelector('.counter'),
        cartWrapper = document.querySelector('.cart-wrapper');



    const wishlist = [];

    let goodsBasket = {};
    
    // goodsWrapper.innerHTML

    const loading = (nameFunction) => {
        const spinner = `<div id="spinner"><div class="spinner-loading"><div><div><div></div>
        </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>`;

        // console.log(nameFunction);

        if (nameFunction === 'renderCard') {
            goodsWrapper.innerHTML = spinner;
        };

        if (nameFunction === 'renderBasket') {
            cartWrapper.innerHTML = spinner;
        };

    };

    // запрос на сервер

    const getGoods = (handler, filter) => {
        loading(handler.name);
        fetch('db/db.json')
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };

    // генерация карточек

    /*если includes возвращает true делаем active, если нет, то возвращаем исходное значение*/
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = ` <div class="card">
                                <div class="card-img-wrapper">
                                    <img class="card-img-top" src="${img}" alt="">
                                    <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : '' }" 
                                        data-goods-id="${id}"></button>
                                </div>
                                <div class="card-body justify-content-between">
                                    <a href="#" class="card-title">${title}</a>
                                    <div class="card-price">${price} ₽</div>
                                    <div>
                                        <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
                                    </div>
                                </div>
                            </div>`;
        return card;
    };

    const createCardGoodsBasket = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'goods';
        card.innerHTML = ` <div class="goods-img-wrapper">
                                    <img class="goods-img" src="${img}" alt="">
                            </div>
                            <div class="goods-description">
                                <h2 class="goods-title">${title}</h2>
                                <p class="goods-price">${price} ₽</p>
                            </div>
                            <div class="goods-price-count">
                                <div class="goods-trigger">
                                    <button class="goods-add-wishlist ${wishlist.includes(id) ? 'active' : '' }" 
                                    data-goods-id="${id}"></button>
                                    <button class="goods-delete" data-goods-id="${id}"></button>
                                </div>
                            <div class="goods-count">${goodsBasket[id]}</div>`;
        return card;
    };

    // рендер товаров в результате поиска

    const renderCard = goods => {
        // берем все старые созданные элементы и удаляем их 
        goodsWrapper.textContent = '';

        if(goods.length){
            // получаем все карточки товара, по аргументам item, index, array их перебираем и вставляем нужные значения из JSON
            // деструктуризация для оптимизации кода
            goods.forEach(({ id, title, price, imgMin }) => {
                goodsWrapper.append(createCardGoods(id, title, price, imgMin));
            });
        } else {
            goodsWrapper.textContent = '❌ Извините, такого товара нету!';
        }
    };


    // рендер товаров в корзине


    const renderBasket = goods => {
        // берем все старые созданные элементы и удаляем их 
        cartWrapper.textContent = '';

        if(goods.length){
            // получаем все карточки товара, по аргументам item, index, array их перебираем и вставляем нужные значения из JSON
            // деструктуризация для оптимизации кода
            goods.forEach(({ id, title, price, imgMin }) => {
                cartWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
            });
        } else {
            cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
        }
    };

    // рендер товаров в корзине

    // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg'));
    // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg' ));
    // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 5000, 'img/temp/Socks.jpg'));
    // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 2000, 'img/temp/Socks.jpg'));
    // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 8000, 'img/temp/Socks.jpg'));
    // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 1000, 'img/temp/Socks.jpg'));


    // ФУНКЦИИ

    // считаем цену всех товаров в корзине
    
    const calcTolalPrice = goods => {
        //  2 способ
        let sum = goods.reduce((accum, item) => {
            return accum + item.price * goodsBasket[item.id];
        }, 0)

        //  1 способ
        // let sum = 0;
        // for (const item of goods) {
        //     console.log(item);
        //     sum += item.price * goodsBasket[item.id];
        // }
        cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
    };

    // проверка длины массива для отображения точного числа у элементов

    const checkCount = () => {
        // у wishlist меняем textContent на длину элементов в массиве
        wishlistCounter.textContent = wishlist.length;
        cardCounter.textContent = Object.keys(goodsBasket).length; 
    };
    
    // фильтры

    // фильтруем вид товаров в корзине

    const showCardBasket = goods => {
        const basketGoods = goods.filter(item => goodsBasket.hasOwnProperty(item.id));
        calcTolalPrice(basketGoods);
        return basketGoods;
    }; 

    // правильный рендер(вид) списка желаемого товара в окне "желаемый товар", его количество

    const showWishlist = () => {
        getGoods(renderCard, goods => goods.filter(item => wishlist.includes(item.id)));
    };


                                //  метод      матем.обьект+функция
    const randomSort = item => item.sort(() => Math.random() - 0.5);

    // работа с хранилищем

    // создаем куки 

    const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // взаимодействие с куками

    const cookieQuery = get => {
        if(get) {
            if(getCookie('goodsBasket')) {
                Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket')));
                // goodsBasket = JSON.parse(getCookie('goodsBasket'));
            }
            checkCount();
            // console.log(getCookie('goodsBasket'));
        } else {
            // отправляем все данные в cookie
            document.cookie = `goodsBasket=${JSON.stringify(goodsBasket)}; max-age=86400e3`
        }
    }

    // действия локального хранилища

    const storageQuery = get => {

        if(get){
            if(localStorage.getItem('wishlist')){
                // добавляем в массив элементы более быстрым способом splice(0, 0, '')
                wishlist.push(...JSON.parse(localStorage.getItem('wishlist')));

                // const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'));
                // wishlistStorage.forEach(id => wishlist.push(id));
            }
            checkCount();
        } else {
            // записываем в локальное хранение элементы и преобразование их в массив
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    };


    // события

    const closeCart = event => {
        const target = event.target;
        console.log(target);
        // || this или (оператор сравнения)
        if( target === cart || 
            cart.classList.contains('cart-close') || 
            event.keyCode === 27) {
            // возвращение стиля к исходному состоянию
            cart.style.display = '';
            document.removeEventListener('keyup', closeCart);
        }

        // смотрим код клавиш в консоли
        console.log(event.keyCode);
    };

    const openCart = event => {
        event.preventDefault();
        cart.style.display = 'flex';
        document.addEventListener('keyup', closeCart);
        getGoods(renderBasket, showCardBasket);
    };

                                
    // делаем выбор по категориям

    const choiceCategory = () => {
        event.preventDefault();
        const target = event.target;

        if(target.classList.contains('category-item')){
            const category = target.dataset.category;
            // получаем все атрибуты у этого элемента dataset
            console.log(target.dataset.category);
            getGoods(renderCard, goods => goods.filter(item => item.category.includes(category)));
                // возвращаем товары которые перебрали
        }

    };

    // поиск

    const searchGoods = event => {
        event.preventDefault();
        // получаем все элементы форм
        const input = event.target.elements.searchGoods;
        const inputValue = input.value.trim();

        if(inputValue !== ''){
            // создаем регулярные выражения из введенных значений(строк) в поле value
            const searchString = new RegExp(inputValue, 'i');
            console.log(input.value);
            getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));    
        } else {
            search.classList.add('error');
            setTimeout(() => {
                search.classList.remove('error');
            }, 2000);
        }
        // очищаем поле value после запроса
        input.value = '';
    };  

    // поиск


    // действия с добавлением и удалением в(из) список(ка) желаемого

    const toggleWhishlist = (id, elem) => {
        if(wishlist.includes(id)){
            wishlist.splice(wishlist.indexOf(id), 1);
            elem.classList.remove('active');
        } else {
            wishlist.push(id); 
            elem.classList.add('active');
        }
        console.log(wishlist);

        checkCount();
        storageQuery();
    };

    // добавление в корзину

    const addBasket = id => {
        if(goodsBasket[id]){
            goodsBasket[id] += 1
        } else {
            goodsBasket[id] = 1
        }
        // console.log(goodsBasket);

        checkCount();
        cookieQuery();
    };

    // обновление корзины во время удаления товаров из корзины

    const removeGoods = id => {
        delete goodsBasket[id];
        checkCount();
        cookieQuery();
        getGoods(renderBasket, showCardBasket);
    }; 


    // клики

    // действия с иконкой желаемого товара

    const handlerGoods = event => {
        const target = event.target;

        if(target.classList.contains('card-add-wishlist')){
            toggleWhishlist(target.dataset.goodsId, target);
        };

        if(target.classList.contains('card-add-cart')){
            addBasket(target.dataset.goodsId);  
        }
    }


    // добавление и удаление сердечка в корзине

    const handlerBasket = event => {
        const target = event.target;

        if(target.classList.contains('goods-add-wishlist')){
            toggleWhishlist(target.dataset.goodsId, target);
        };

        if(target.classList.contains('goods-delete')){
            removeGoods(target.dataset.goodsId);
        };
    };


    // функции

    // события

    // инициализация
    {
        getGoods(renderCard, randomSort);

        storageQuery(true);
        cookieQuery(true);

        // потестировать разные события для кнопки
        cartBtn.addEventListener('click', openCart);
        cart.addEventListener('click', closeCart);
        category.addEventListener('click', choiceCategory);
        search.addEventListener('submit', searchGoods);
        goodsWrapper.addEventListener('click', handlerGoods);
        cartWrapper.addEventListener('click', handlerBasket);
        wishlistBtn.addEventListener('click', showWishlist);
    }


});
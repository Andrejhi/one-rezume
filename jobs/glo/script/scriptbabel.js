"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var search = document.querySelector('.search'),
      cartBtn = document.getElementById('cart'),
      wishlistBtn = document.getElementById('wishlist'),
      goodsWrapper = document.querySelector('.goods-wrapper'),
      cart = document.querySelector('.cart'),
      category = document.querySelector('.category'),
      cardCounter = cartBtn.querySelector('.counter'),
      wishlistCounter = wishlistBtn.querySelector('.counter'),
      cartWrapper = document.querySelector('.cart-wrapper');
  var wishlist = [];
  var goodsBasket = {}; // goodsWrapper.innerHTML

  var loading = function loading(nameFunction) {
    var spinner = "<div id=\"spinner\"><div class=\"spinner-loading\"><div><div><div></div>\n        </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>"; // console.log(nameFunction);

    if (nameFunction === 'renderCard') {
      goodsWrapper.innerHTML = spinner;
    }

    ;

    if (nameFunction === 'renderBasket') {
      cartWrapper.innerHTML = spinner;
    }

    ;
  }; // запрос на сервер


  var getGoods = function getGoods(handler, filter) {
    loading(handler.name);
    fetch('db/db.json').then(function (response) {
      return response.json();
    }).then(filter).then(handler);
  }; // генерация карточек

  /*если includes возвращает true делаем active, если нет, то возвращаем исходное значение*/


  var createCardGoods = function createCardGoods(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = " <div class=\"card\">\n                                <div class=\"card-img-wrapper\">\n                                    <img class=\"card-img-top\" src=\"".concat(img, "\" alt=\"\">\n                                    <button class=\"card-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\" \n                                        data-goods-id=\"").concat(id, "\"></button>\n                                </div>\n                                <div class=\"card-body justify-content-between\">\n                                    <a href=\"#\" class=\"card-title\">").concat(title, "</a>\n                                    <div class=\"card-price\">").concat(price, " \u20BD</div>\n                                    <div>\n                                        <button class=\"card-add-cart\" data-goods-id=\"").concat(id, "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                                    </div>\n                                </div>\n                            </div>");
    return card;
  };

  var createCardGoodsBasket = function createCardGoodsBasket(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'goods';
    card.innerHTML = " <div class=\"goods-img-wrapper\">\n                                    <img class=\"goods-img\" src=\"".concat(img, "\" alt=\"\">\n                            </div>\n                            <div class=\"goods-description\">\n                                <h2 class=\"goods-title\">").concat(title, "</h2>\n                                <p class=\"goods-price\">").concat(price, " \u20BD</p>\n                            </div>\n                            <div class=\"goods-price-count\">\n                                <div class=\"goods-trigger\">\n                                    <button class=\"goods-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\" \n                                    data-goods-id=\"").concat(id, "\"></button>\n                                    <button class=\"goods-delete\" data-goods-id=\"").concat(id, "\"></button>\n                                </div>\n                            <div class=\"goods-count\">").concat(goodsBasket[id], "</div>");
    return card;
  }; // рендер товаров в результате поиска


  var renderCard = function renderCard(goods) {
    // берем все старые созданные элементы и удаляем их 
    goodsWrapper.textContent = '';

    if (goods.length) {
      // получаем все карточки товара, по аргументам item, index, array их перебираем и вставляем нужные значения из JSON
      // деструктуризация для оптимизации кода
      goods.forEach(function (_ref) {
        var id = _ref.id,
            title = _ref.title,
            price = _ref.price,
            imgMin = _ref.imgMin;
        goodsWrapper.append(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.textContent = '❌ Извините, такого товара нету!';
    }
  }; // рендер товаров в корзине


  var renderBasket = function renderBasket(goods) {
    // берем все старые созданные элементы и удаляем их 
    cartWrapper.textContent = '';

    if (goods.length) {
      // получаем все карточки товара, по аргументам item, index, array их перебираем и вставляем нужные значения из JSON
      // деструктуризация для оптимизации кода
      goods.forEach(function (_ref2) {
        var id = _ref2.id,
            title = _ref2.title,
            price = _ref2.price,
            imgMin = _ref2.imgMin;
        cartWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
      });
    } else {
      cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
    }
  }; // рендер товаров в корзине
  // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg'));
  // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg' ));
  // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 5000, 'img/temp/Socks.jpg'));
  // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 2000, 'img/temp/Socks.jpg'));
  // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 8000, 'img/temp/Socks.jpg'));
  // goodsWrapper.appendChild(createCardGoods(3, 'Носок', 1000, 'img/temp/Socks.jpg'));
  // ФУНКЦИИ
  // считаем цену всех товаров в корзине


  var calcTolalPrice = function calcTolalPrice(goods) {
    //  2 способ
    var sum = goods.reduce(function (accum, item) {
      return accum + item.price * goodsBasket[item.id];
    }, 0); //  1 способ
    // let sum = 0;
    // for (const item of goods) {
    //     console.log(item);
    //     sum += item.price * goodsBasket[item.id];
    // }

    cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
  }; // проверка длины массива для отображения точного числа у элементов


  var checkCount = function checkCount() {
    // у wishlist меняем textContent на длину элементов в массиве
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBasket).length;
  }; // фильтры
  // фильтруем вид товаров в корзине


  var showCardBasket = function showCardBasket(goods) {
    var basketGoods = goods.filter(function (item) {
      return goodsBasket.hasOwnProperty(item.id);
    });
    calcTolalPrice(basketGoods);
    return basketGoods;
  }; // правильный рендер(вид) списка желаемого товара в окне "желаемый товар", его количество


  var showWishlist = function showWishlist() {
    getGoods(renderCard, function (goods) {
      return goods.filter(function (item) {
        return wishlist.includes(item.id);
      });
    });
  }; //  метод      матем.обьект+функция


  var randomSort = function randomSort(item) {
    return item.sort(function () {
      return Math.random() - 0.5;
    });
  }; // работа с хранилищем
  // создаем куки 


  var getCookie = function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }; // взаимодействие с куками


  var cookieQuery = function cookieQuery(get) {
    if (get) {
      if (getCookie('goodsBasket')) {
        Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket'))); // goodsBasket = JSON.parse(getCookie('goodsBasket'));
      }

      checkCount(); // console.log(getCookie('goodsBasket'));
    } else {
      // отправляем все данные в cookie
      document.cookie = "goodsBasket=".concat(JSON.stringify(goodsBasket), "; max-age=86400e3");
    }
  }; // действия локального хранилища


  var storageQuery = function storageQuery(get) {
    if (get) {
      if (localStorage.getItem('wishlist')) {
        // добавляем в массив элементы более быстрым способом splice(0, 0, '')
        wishlist.push.apply(wishlist, _toConsumableArray(JSON.parse(localStorage.getItem('wishlist')))); // const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'));
        // wishlistStorage.forEach(id => wishlist.push(id));
      }

      checkCount();
    } else {
      // записываем в локальное хранение элементы и преобразование их в массив
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }; // события


  var closeCart = function closeCart(event) {
    var target = event.target;
    console.log(target); // || this или (оператор сравнения)

    if (target === cart || cart.classList.contains('cart-close') || event.keyCode === 27) {
      // возвращение стиля к исходному состоянию
      cart.style.display = '';
      document.removeEventListener('keyup', closeCart);
    } // смотрим код клавиш в консоли


    console.log(event.keyCode);
  };

  var openCart = function openCart(event) {
    event.preventDefault();
    cart.style.display = 'flex';
    document.addEventListener('keyup', closeCart);
    getGoods(renderBasket, showCardBasket);
  }; // делаем выбор по категориям


  var choiceCategory = function choiceCategory() {
    event.preventDefault();
    var target = event.target;

    if (target.classList.contains('category-item')) {
      var _category = target.dataset.category; // получаем все атрибуты у этого элемента dataset

      console.log(target.dataset.category);
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return item.category.includes(_category);
        });
      }); // возвращаем товары которые перебрали
    }
  }; // поиск


  var searchGoods = function searchGoods(event) {
    event.preventDefault(); // получаем все элементы форм

    var input = event.target.elements.searchGoods;
    var inputValue = input.value.trim();

    if (inputValue !== '') {
      // создаем регулярные выражения из введенных значений(строк) в поле value
      var searchString = new RegExp(inputValue, 'i');
      console.log(input.value);
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return searchString.test(item.title);
        });
      });
    } else {
      search.classList.add('error');
      setTimeout(function () {
        search.classList.remove('error');
      }, 2000);
    } // очищаем поле value после запроса


    input.value = '';
  }; // поиск
  // действия с добавлением и удалением в(из) список(ка) желаемого


  var toggleWhishlist = function toggleWhishlist(id, elem) {
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      elem.classList.remove('active');
    } else {
      wishlist.push(id);
      elem.classList.add('active');
    }

    console.log(wishlist);
    checkCount();
    storageQuery();
  }; // добавление в корзину


  var addBasket = function addBasket(id) {
    if (goodsBasket[id]) {
      goodsBasket[id] += 1;
    } else {
      goodsBasket[id] = 1;
    } // console.log(goodsBasket);


    checkCount();
    cookieQuery();
  }; // обновление корзины во время удаления товаров из корзины


  var removeGoods = function removeGoods(id) {
    delete goodsBasket[id];
    checkCount();
    cookieQuery();
    getGoods(renderBasket, showCardBasket);
  }; // клики
  // действия с иконкой желаемого товара


  var handlerGoods = function handlerGoods(event) {
    var target = event.target;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWhishlist(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('card-add-cart')) {
      addBasket(target.dataset.goodsId);
    }
  }; // добавление и удаление сердечка в корзине


  var handlerBasket = function handlerBasket(event) {
    var target = event.target;

    if (target.classList.contains('goods-add-wishlist')) {
      toggleWhishlist(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('goods-delete')) {
      removeGoods(target.dataset.goodsId);
    }

    ;
  }; // функции
  // события
  // инициализация


  {
    getGoods(renderCard, randomSort);
    storageQuery(true);
    cookieQuery(true); // потестировать разные события для кнопки

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    cartWrapper / addEventListener('click', handlerBasket);
    wishlistBtn.addEventListener('click', showWishlist);
  }
});
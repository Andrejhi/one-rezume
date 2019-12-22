'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.getElementById('block-customer'),
        blockFreelancer = document.getElementById('block-freelancer'),
        blockChoice = document.getElementById('block-choice'),
        btnExit = document.getElementById('btn-exit'),
        formCustomer = document.getElementById('form-customer'),
        ordersTable = document.getElementById('orders'),
        modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active'),
        headTable = document.getElementById('headTable');


        const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];

        const toStorage = () => {
            localStorage.setItem('freeOrders', JSON.stringify(orders));
        }

        const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? 
            number % 10 : 5]];

        const calcDeadline = (date) => {
            const deadline = new Date(date);
            const toDay = Date.now();

            const remaining = (deadline - toDay) / 1000 / 60 / 60;

            if (remaining / 24 > 2) {
                return declOfNum( Math.floor(remaining / 24), ['день', 'дня', 'дней'])
            }
            return declOfNum( Math.floor(remaining), ['час', 'часа', 'часов'])
        }

        // рендер таблицы

        const renderOrders = () => {

            ordersTable.textContent = '';
    
            orders.forEach((order, i) => {
                ordersTable.innerHTML += `<tr class="order ${order.active ? 'taken' : ''}"
                                             data-number-order="${i}">
                                            <td>${i+1}</td>
                                            <td>${order.title}</td>
                                            <td class="${order.currency}"></td>
                                            <td>${calcDeadline(order.deadline)}</td>
                                        </tr>`;
            });
        };

        // модальное окно

    const openModal = (numberOrder) => {
        const order = orders[numberOrder];

        // реконструируем данные модалки, наначаем данные по умолчанию
        const { title, firstName, email, phone, description, amount, currency, deadline, active = false } = order;

        const modal = active ? modalOrderActive : modalOrder;


        const firstNameBlock = modal.querySelector('.firstName'),
            titleBlock = modal.querySelector('.modal-title'),
            emailBlock = modal.querySelector('.email'),
            descriptionBlock = modal.querySelector('.description'),
            deadlineBlock = modal.querySelector('.deadline'),
            currencyBlock = modal.querySelector('.currency_img'),
            countBlock = modal.querySelector('.count'),
            phoneBlock = modal.querySelector('.phone');

            modal.id = numberOrder;
            titleBlock.textContent = title;
            firstNameBlock.textContent = firstName;
            emailBlock.textContent = email;
            emailBlock.href = 'mailto:' + email;
            descriptionBlock.textContent = description;
            deadlineBlock.textContent = calcDeadline(deadline);
            currencyBlock.className = 'currency_img';
            currencyBlock.classList.add(currency);
            countBlock.textContent = amount;

            phoneBlock && (phoneBlock.href = 'tel:' + phone)

        modal.style.display = 'flex';

        modal.addEventListener('click', handlerModal);
    };

    // функции

        // сортировка обьектов в массиве

    const sortOrder = (arr, property) => {
        arr.sort((a, b) => a[property] > b[property] ? 1 : -1);
    }

    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.id];

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }

        if (target.classList.contains('get-order')) {
            order.active = true;
            modal.style.display = 'none';
            renderOrders();
        }

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none';
        }

        if ( target.classList.contains('.get-order')) {
            order.active = true;
            // baseAction();
            modal.style.display = 'none';
            renderOrders();
        }
        if ( target.id === 'capitulation') {
            order.active = false;
            // baseAction();
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        }
        if ( target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            // baseAction();
            order.active = false;
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        }
    }

    // обработчики


    headTable.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('head-sort')) {

            if(target.id === 'taskSort'){
                sortOrder(orders, 'title');

            }

            if(target.id === 'currencySort'){
                sortOrder(orders, 'currency');

            }

            if(target.id === 'deadlineSort'){
                sortOrder(orders, 'deadline');
            }
            renderOrders();
            toStorage();
        }
    });

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;

        const targetOrder = target.closest('.order')
        if(targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        const toDay = new Date().toISOString().substring(0, 10);
        document.getElementById('deadline').min = toDay;
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
            // отменяем событие браузера по умолчанию
            event.preventDefault();

            const obj = {};

            for (const elem of formCustomer.elements) {

                if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA')

                obj[elem.name] = elem.value;

                if(elem.type !== 'radio') {
                    elem.value = '';
                }

            }

            // debugger;
            formCustomer.reset();

            orders.push(obj);
            console.log(orders);
            toStorage();

    });

});
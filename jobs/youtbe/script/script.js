'use strict';
// загрузка скрипта после загрузка дом дерева
document.addEventListener('DOMContentLoaded', () => {

        // экранная клавиатура
        {
            const keyboardButton = document.querySelector('.search-form__keyboard');
            const keyboard = document.querySelector('.keyboard');
            const closeKeyboard = document.getElementById('close-keyboard');
            const searchInput = document.querySelector('.search-form__input');

            const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ?
            '' : '50%';

            const changeLang = (btn, lang) => {
                const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                    'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                    'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                    'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                    'en', ' '];
                const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '];

                if (lang === 'en') {
                    btn.forEach((elem, i) => {
                        elem.textContent = langEn[i];
                    })
                } else {
                    btn.forEach((elem, i) => {
                        elem.textContent = langRu[i];
                    })
                }

                if (lang === 'ru') {
                    btn.forEach((elem, i) => {
                        elem.textContent = langEn[i];
                    })
                } else {
                    btn.forEach((elem, i) => {
                        elem.textContent = langRu[i];
                    })
                }
            }

            const typing = event => {
                const target = event.target;
                if (target.tagName.toLowerCase() === 'button' ) {
                    // если мы нажали на эту стрелку
                    if (target.textContent.trim() = '⬅') {
                        // то удаляем один симвод с конца строки
                        searchInput.value = searchInput.value.slice(0, length - 1)
                    }
                        searchInput.value += target.contentButton.trim();

                    // const buttons = [...keyboard.querySelectorAll('button')]
                    //     .filter(elem => elem.style.visibility !== 'hidden');
                    // const contentButton = target.textContent.trim();
                    // if(contentButton === '⬅') {
                    //     searchInput.value = searchInput.value.slice(0, length - 1)
                    // } else if (!contentButton){
                    //     searchInput.value += '  ';
                    // } else if (contentButton === 'en' || contentButton === 'ru'){
                    //     changeLang(buttons, contentButton)
                    // } else {
                    //     searchInput.value += contentButton;
                    // }
                }
                // backspace
                // пробел
            };

            keyboardButton.addEventListener('click', toggleKeyboard);
                // тернарный оператор

                // if (keyboard.style.top) {
                //     keyboard.style.top = '';
                // } else {
                //     keyboard.style.top = '50%';
                // }

            closeKeyboard.addEventListener('click', toggleKeyboard);
            keyboard.addEventListener('click', typing);

        }

        // меню
        {
            const burger = document.querySelector('.spinner');
            const sidebarMenu = document.querySelector('.sidebarMenu');

            burger.addEventListener('click', () => {
                burger.classList.toggle('active');
                sidebarMenu.classList.toggle('rollUp');
            });

            sidebarMenu.addEventListener('click', e => {
                let target = e.target;
                target = target.closest('a[href="#"]');

                if (target) {
                    const parentTarget = target.parentElement;
                    sidebarMenu.querySelectorAll('li').forEach(elem => {
                        if (elem === parentTarget) {
                            elem.classList.add('active');
                        } else {
                            elem.classList.remove('active');
                        }
                    })
                }
            })
        }
        // адаптация под экраны
        const youtuber = () => {

            const youtuberItems = document.querySelectorAll('[data-youtuber]');
            const youTuberModal = document.querySelector('.youTuberModal');
            const youtuberContainer = document.getElementById('youtuberContainer');

            const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
            const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

            const sizeVideo = () => {
                const ww = document.documentElement.clientWidth;
                const wh = document.documentElement.clientHeight;

                for (let i = 0; i < qw.length; i++) {
                    if ( ww > qw[i]) {
                        youtuberContainer.querySelector('iframe').style.cssText = `
                            width: ${qw[i]}px;
                            height: ${qh[i]}px;
                        `;
                        youtuberContainer.style.cssText = `
                            width: ${qw[i]}px;
                            height: ${qh[i]}px;
                            top: ${(wh - qh[i]) / 2}px;
                            left: ${(ww - qw[i]) / 2}px;
                        `;
                        break;
                    }
                }
            }

            youtuberItems.forEach(elem => {
                elem.addEventListener('click', () => {
                    const idVideo = elem.dataset.youtuber;
                    // const divYoutuber = document.createElement('div');
                    youTuberModal.style.display = 'block';

                    const youTuberFrame = document.createElement('iframe');
                    youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                    youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
                    window.addEventListener('resize', sizeVideo);

                    sizeVideo();
                });
            });

            youTuberModal.addEventListener('click', () => {
                youTuberModal.style.display = '';
                youtuberContainer.textContent = '';
                window.removeEventListener('resize', sizeVideo);
            });
        }

    // модальное окно
        {

            document.body.insertAdjacentHTML('beforeend', `
                                        <div class="youTuberModal">
                                            <div id="youtuberClose">&#215;</div>
                                            <div id="youtuberContainer"></div>
                                        </div>
                                        `);
            youtuber();
        }

    // API
    {
        // ключи
        {
            const API_KEY = 'AIzaSyC496ez0jZ697jmsglEYTm5XQlZkJIgoxc';
            const CLIENT_ID = '555993654625-dl06k1k0jlt0a2bs1o5t1gtudk1mivo0.apps.googleusercontent.com';
        }
            // авторизация
        {

            const buttonAuth = document.getElementById('authorize');
            const authBlock = document.querySelector('.auth');

            // function authenticate() {
            //     return gapi.auth2.getAuthInstance()
            //         .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
            //         .then(function() { console.log("Sign-in successful"); },
            //               function(err) { console.error("Error signing in", err); });
            //   }
            //   function loadClient() {
            //     gapi.client.setApiKey('AIzaSyC496ez0jZ697jmsglEYTm5XQlZkJIgoxc');
            //     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            //         .then(function() { console.log("GAPI client loaded for API"); },
            //               function(err) { console.error("Error loading GAPI client for API", err); });
            //   }
            //   // Make sure the client is loaded and sign-in is complete before calling this method.
            //   function execute() {
            //     return gapi.client.youtube.channels.list({})
            //         .then(function(response) {
            //                 // Handle the results here (response.result has the parsed body).
            //                 console.log("Response", response);
            //               },
            //               function(err) { console.error("Execute error", err); });
            //   }
            //   gapi.load("client:auth2", function() {
            //     gapi.auth2.init({client_id: '555993654625-dl06k1k0jlt0a2bs1o5t1gtudk1mivo0.apps.googleusercontent.com'});
            //   });

            //   buttonAuth.addEventListener('click', () => {
            //         authenticate().then(loadClient)
            //     })

            const errorAuth = err => {
                authBlock.style.display = '';
            }

            gapi.load("client:auth2", () => gapi.auth2.init({client_id: '555993654625-dl06k1k0jlt0a2bs1o5t1gtudk1mivo0.apps.googleusercontent.com'}));
            // регистрация в гугл
            const authenticate = () => gapi.auth2.getAuthInstance()
            // отправление запроса
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(() => console.log("Авторизация успешна"))
                    .catch(errorAuth);

            const loadClient = () => {
                gapi.client.setApiKey('AIzaSyC496ez0jZ697jmsglEYTm5XQlZkJIgoxc');
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(() => console.log("GAPI client loaded for API"))
                    .then(() => authBlock.style.display = 'none')
                    .catch(errorAuth);
            }

            buttonAuth.addEventListener('click', () => {
                authenticate().then(loadClient)
            })

        }
            // request
        {

            const gloTube = document.querySelector('.logo-academy');
            const trends = document.getElementById('yt_trend');
            const like = document.getElementById('yt_like');
            const home = document.getElementById('yt_main');
            const subscriptions = document.getElementById('subscriptions');
            const searchForm = document.querySelector('.search-form');

            const request = options => gapi.client.youtube[options.method]
                .list(options)
                // заходим в массив и добираемся до каждого item
                .then(response => response.result.items)
                // .then(render)
                // берем полученные данные и сравниваем с subscriptions, пишем условие при котором условие subscriptions
                // будет работать, если данные при получении будут subscriptions(индентичны ему), то выполняем первое
                // условие, если нет то 2 условие(тернарный оператор)
                .then(data => options.method === "subscriptions" ? renderSub(data) : render(data))
                // после рендера активируем открытие видео
                // .then(youtuber)
                .catch(err => console.error('Во время запроса произошла ошибка: ' + err));

            const renderSub = data => {
                console.log(data);
                const ytWrapper = document.getElementById('yt-wrapper');
                // перед тем как рендерить контент очищаем место под контент
                ytWrapper.textContent = '';
                // перебираем массив с объектами
                data.forEach(item => {
                    // используем проверку для перебора, если будет ошибка, то она выведется в консоль
                    // и код продолжит работать дальше, при этом перебор продолжит запускаться снова
                    // и снова
                    try {
                    // для этого делаем деструктуризацию, т.е делаем из объектов костанты
                        const {
                            snippet:{
                                resourceId:{
                                    channelId}, 
                                    description, 
                                    title, 
                                    thumbnails:{
                                        high:{
                                            url
                                        }
                                    }
                                }
                            } = item;
                        // с помощью innerHTML вставляем и с помощью += добавляем и вставляем весь контент
                        ytWrapper.innerHTML += `
                        <div class="yt" data-youtuber="${channelId}">
                            <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                            </div>
                            <div class="yt-title">${title}</div>
                            <div class="yt-channel">${description}</div>
                        </div>
                        `;
                    } catch (err) {
                        console.error(err);
                    }
                });

                ytWrapper.querySelectorAll('.yt').forEach(item => {
                    item.addEventListener('click', () => {
                        request({
                            method: 'search',
                            part: 'snippet',
                            // обращаемся к item и что бы записать в атрибут data значение(youtuber) пишем dataset 
                            channelId: item.dataset.youtuber,
                            order: 'date',
                            maxResults: 6
                        })
                    })
                });

            };

            const render = data => {
                console.log(data);
                const ytWrapper = document.getElementById('yt-wrapper');
                // перед тем как рендерить контент очищаем место под контент
                ytWrapper.textContent = '';
                // перебираем массив с объектами
                data.forEach(item => {
                    // используем проверку для перебора, если будет ошибка, то она выведется в консоль
                    // и код продолжит работать дальше, при этом перебор продолжит запускаться снова
                    // и снова
                    try {
                    // для этого делаем деструктуризацию, т.е делаем из объектов костанты
                        const {id,
                            id:{videoId},
                            snippet:{channelTitle, title,
                                resourceId: {
                                    videoId: likedVideoId
                        // делаем для videoId значение по умолчанию, т.е создаем для него пустой объект
                                } = {},
                                thumbnails:{high:{url}
                                }
                            }
                        } = item;
                        // с помощью innerHTML вставляем и с помощью += добавляем и вставляем весь контент
                        ytWrapper.innerHTML += `
                        <div class="yt" data-youtuber="${likedVideoId || videoId || id}">
                            <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                            </div>
                            <div class="yt-title">${title}</div>
                            <div class="yt-channel">${channelTitle}</div>
                        </div>
                        `;
                    } catch (err) {
                        console.error(err);
                    }
                });
                youtuber();
            };

            gloTube.addEventListener('click', () => {
                request({
                    method: 'search',
                    part: 'snippet',
                    channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
                    order: 'date',
                    maxResults: 6
                })
            });
            trends.addEventListener('click', () => {
                request({
                    method: 'videos',
                    part: 'snippet',
                    chart: 'mostPopular',
                    maxResults: 6,
                    regionCode: 'RU'
                })
            });
            like.addEventListener('click', () => {
                request({
                    method: 'playlistItems',
                    part: 'snippet',
                    playlistId: 'LLPam50Jlxf3IXTpNO3I8FRQ',
                    maxResults: 10,
                })
            });

            subscriptions.addEventListener('click', () => {
                request({
                    method: 'subscriptions',
                    part: 'snippet',
                    mine: true,
                    maxResults: 6,
                })
            });

            home.addEventListener('click', event => {
                event.preventDefault();
            });

            searchForm.addEventListener('submit', event => {
                event.preventDefault();
                const valueInput = searchForm.elements[0].value;
                // если поставить ! то значение valueInput инвертируется в false
                if(!valueInput) {
                    searchForm.style.border = '1px solid red';
                    return;
                }
                searchForm.style.border = '';


                request({
                    method: 'search',
                    part: 'snippet',
                    order: 'relevance',
                    maxResults: 6,
                    q: valueInput,
                })

                searchForm.elements[0].value = '';
            });
        }
    }
});
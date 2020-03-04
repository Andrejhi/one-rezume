'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // const contentSkills = document.querySelector('.content_skills');
    const videoBtn = document.getElementById('video_btn'),
        wrapModalVideo = document.querySelector('.wrap_modal_video'),
        modalVideo = document.querySelector('.close_modal');





        //Плеер

        var videoPlayer = document.getElementById('video-player');

        //Время

        var progressBar = document.getElementById('video-hud__progress-bar');

        var currTime = document.getElementById('video-hud__curr-time');

        var durationTime = document.getElementById('video-hud__duration');

        //Кнопки

        var actionButton = document.getElementById('video-hud__action');

        var muteButton = document.getElementById('video-hud__mute');

        var volumeScale = document.getElementById('video-hud__volume');

        var speedSelect = document.getElementById('video-hud__speed');

        //Запуск, пауза

        actionButton.addEventListener('click',videoAct);

        videoPlayer.addEventListener('click',videoAct);


        function videoAct() { //Запускаем или ставим на паузу

                if(videoPlayer.paused) {

                videoPlayer.play();

                actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');

            } else {

                videoPlayer.pause();

                actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');

            }

                if(durationTime.innerHTML == '00:00') {

                durationTime.innerHTML = videoTime(videoPlayer.duration); //Об этой функции чуть ниже

            }

        }

    // const createModalVideo = () => {
    //     const modalVideo = document.createElement('aside');
    //     modalVideo.className = 'wrap_window_modal_video';

    //     modalVideo.innerHTML = `
    //                             <div class="window_modal">
    //                                 <span class="close_modal">x</span>
    //                                 <h3 class="my-video">Примеры видео</h3>
    //                             </div>`; 

    //     return modalVideo;

    // };

    const closeModalVideo = event => {
        const target = event.target;
        console.log(target);
        if( target === modalVideo || 
            modalVideo.classList.contains('cart-close') || 
            event.keyCode === 27) {
            // возвращение стиля к исходному состоянию
            wrapModalVideo.style.display = '';
            document.removeEventListener('keyup', closeModalVideo);
        }
        document.body.style.overflow = 'auto';
    };


    const openVideo = event => {
        const target = event.target;
        console.log(target);
        wrapModalVideo.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.addEventListener('keyup', closeModalVideo);
        // contentSkills.appendChild(createModalVideo());
    };


    {
        modalVideo.addEventListener('click', closeModalVideo);
        videoBtn.addEventListener('click', openVideo);
    }

});
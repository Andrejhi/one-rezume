 const score = document.querySelector('.score'),
       start = document.querySelector('.start'),
       gameArea = document.querySelector('.gameArea'),
       car = document.createElement('div');
        
    car.classList.add('car');

        start.addEventListener('click', startGame);
        document.addEventListener('keydown', startRun);
        document.addEventListener('keyup', stopRun);

        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false
        };

        const setting = {
            start: false,
            score: 0,
            speed: 3
        };

       function startGame() {
            start.classList.add('hide');

          for ( let i = 0; i < 20; i++) {
               const line = document.createElement('div');
               line.classList.add('line');
               line.style.top = (i * 100) + 'px';
               gameArea.appendChild(line);
          }


            // значение настроек будет меняться в начале игры поэтому ставим так
            setting.start = true;
            // вставляем в блок div элемент
            gameArea.appendChild(car);
            setting.x = car.offsetLeft;
            setting.y = car.offsetTop;
            requestAnimationFrame(playGame);
            // обработчики события
            // console.dir(start);
       };

       function playGame(){
           console.log('play Game!');
           if (setting.start){
                if(keys.ArrowLeft && setting.x > 0){
                     setting.x -= setting.speed;
                }
                if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
                     setting.x += setting.speed;
                }
                if(keys.ArrowUp && setting.y > 0){
                    setting.y -= setting.speed;
               }
                if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
                     setting.y += setting.speed;
                }

                car.style.left = setting.x + 'px';
                car.style.top = setting.y + 'px';

                requestAnimationFrame(playGame);
           }
           
       };

       function startRun(event){
            event.preventDefault();
            keys[event.key] = true;
       };

       function stopRun(event){
            event.preventDefault();
            keys[event.key] = false;
       };
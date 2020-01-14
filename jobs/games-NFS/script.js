 const score = document.querySelector('.score'),
       start = document.querySelector('.start'),
       gameArea = document.querySelector('.gameArea'),
       car = document.createElement('div'),
       closeGame = document.querySelector('.close_game'),
       rulsGame = document.querySelector('.ruls_game');
        
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
            speed: 3,
            traffic: 3
     };

     function getQuantityElements(heightElement){
          return document.documentElement.clientHeight / heightElement + 1;
     }
     console.log(getQuantityElements(200));

     function startGame() {
            start.classList.add('hide');


          for ( let i = 0; i < getQuantityElements(100); i++) {
               const line = document.createElement('div');
               line.classList.add('line');
               line.style.top = (i * 100) +'px';
               line.y = i * 100;
               gameArea.appendChild(line);

          }

          for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
               const enemy = document.createElement('div');
               enemy.classList.add('enemy');
               enemy.y = -100 * setting.traffic * (i + 1);
               enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
               enemy.style.background = 'transparent url(./img/car/car2.png) center no-repeat';
               enemy.style.top = enemy.y + 'px';
               gameArea.appendChild(enemy);
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
          //  console.log('play Game!');
           if (setting.start){
               moveRoad();
               moveEnemy();
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

     function moveRoad(){
            let lines = document.querySelectorAll('.line');
          //   closeGame.classList.add('open');
            setTimeout(() => {
               rulsGame.classList.add('open');
            }, 1000);
            setTimeout(() => {
               closeGame.classList.add('open');
            }, 2000);
            lines.forEach(function(line){
               line.y += setting.speed;
               line.style.top = line.y + 'px';

               if(line.y > document.documentElement.clientHeight) {
                    line.y = -100;
               }

            });
     }

     function moveEnemy(){
          let enemy = document.querySelectorAll('.enemy');
          enemy.forEach(function(item){
               item.y += setting.speed / 3;
               item.style.top = item.y + 'px';

               if(item.y >= document.documentElement.clientHeight){
                    item.y = -100 * setting.traffic;
                    item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
               }
          });
     }





     document.addEventListener('keydown', again);

     function again(event){
               if (event.code === 'Escape'){
                    setting.start = false;
                    closeGame.style.opacity = '0';
                    rulsGame.style.opacity = '0';
                    start.classList.add('start_again');
               }
     }
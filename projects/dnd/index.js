/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

function random(from, to) {
  return Number.parseInt(from + (to - Math.random() * to));
}

export function createDiv() {
  const minSize = 20,
    maxSize = 200,
    maxColor = 0xffffff;
  const div = document.createElement('div');
  div.draggable = true;
  div.style.height = random(minSize, maxSize) + 'px';
  div.style.width = random(minSize, maxSize) + 'px';
  div.style.background = '#' + random(0, maxColor).toString(16);
  div.style.top = random(0, window.innerHeight) + 'px';
  div.style.left = random(0, window.innerWidth) + 'px';
  div.classList.add('draggable-div');
  div.addEventListener('dragstart', (e) => {
    setTimeout(() => {
      div.classList.add('hide');
    }, 0);
  });
  div.addEventListener('dragend', (e) => {
    div.classList.remove('hide');
    div.style.top = `${e.clientY - Number.parseInt(div.style.height) / 2}px`;
    div.style.left = `${e.clientX - Number.parseInt(div.style.width) / 2}px`;
  });
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

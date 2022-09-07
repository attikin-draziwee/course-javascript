/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let isFiltred = false;

filterNameInput.addEventListener('input', function (e) {
  search(this.value);
});

function search(keyword) {
  if (keyword.length > 0) {
    const cookies = loadCookie();
    const filterWord = keyword;
    const result = {};
    for (const key of Object.keys(cookies)) {
      const value = cookies[key].toLowerCase();
      if (
        key.toLowerCase().includes(filterWord.toLowerCase()) ||
        value.includes(filterWord.toLowerCase())
      ) {
        result[key] = value;
      }
    }
    uploadTable(result);
    isFiltred = true;
  } else {
    isFiltred = false;
    uploadTable(loadCookie());
  }
}

addButton.addEventListener('click', () => {
  const name = addNameInput.value,
    value = addValueInput.value;
  const keyValue = `${name}=${value}`;
  if (name && value) {
    document.cookie = keyValue;
    addNameInput.value = '';
    addValueInput.value = '';
    if (!isFiltred) {
      uploadTable(loadCookie());
    } else {
      if (name.toLowerCase().includes(filterNameInput.value.toLowerCase())) {
        search(filterNameInput.value.toLowerCase());
      } else if (value.toLowerCase().includes(filterNameInput.value.toLowerCase())) {
        search(filterNameInput.value.toLowerCase());
      }
    }
  }
});

listTable.addEventListener('click', (e) => {
  if (!isFiltred) {
    uploadTable(loadCookie());
  }
});

document.addEventListener('DOMContentLoaded', (e) => {
  if (document.cookie) {
    uploadTable(loadCookie());
  }
});

function loadCookie() {
  return document.cookie.split('; ').reduce((acc, el) => {
    const [name, value] = el.split('=');
    acc[name] = value;
    return acc;
  }, {});
}

function uploadTable(obj) {
  const rows = [];
  for (const item of Object.keys(obj)) {
    const row = document.createElement('tr');
    const nameData = document.createElement('td');
    const valueData = document.createElement('td');
    const deleteData = document.createElement('td');
    const deleteButton = document.createElement('button');

    nameData.textContent = item;
    valueData.textContent = obj[item];
    deleteButton.textContent = 'Удалить';
    deleteData.append(deleteButton);

    deleteButton.addEventListener('click', () => deleteCookie(nameData.textContent));

    row.append(nameData, valueData, deleteData);
    rows.push(row);
  }
  listTable.innerHTML = '';
  listTable.append(...rows);
}

function deleteCookie(name) {
  if (Object.keys(loadCookie()).some((key) => key === name)) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  }
}

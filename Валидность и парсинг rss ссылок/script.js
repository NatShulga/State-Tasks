//находим элементики
const rssLinkInput = document.getElementById("rssLink");
const errorMessage = document.getElementById("errorMessage");
const loadButton = document.getElementById("loadButton");
const resultDiv = document.getElementById("resultDiv");
const feedsContainer = document.getElementById('feedsContainer');

//функция для проверки валидности.
function isValidUrl(str) {
  try {
    new URL(str); //создали новый объект юрл
    return true; // тру если получилось и ссылка валид
  } catch (error) {
    errorMessage.textContent = `Некорректная ссылка: ${error.message}`; //доступ к информации об ошибке
    return false; //если не валидная
  }
}

//сама валидация ссылки
function rssValidLink() {
  const rssLink = rssLinkInput.value; //ссылка из ввода

  if (isValidUrl(rssLink)) {
    //когда ссылка валидная.
    rssLinkInput.classList.remove("invalid"); //красную обводку убираем
    rssLinkInput.classList.add("valid"); //зеленая рамка
    errorMessage.textContent = ""; //сообщения об ошибке нет
  } else {
    //или когда не валидная
    rssLinkInput.classList.remove("valid"); //убираем зел рамку
    rssLinkInput.classList.add("invalid"); //добавл красн рамку
    errorMessage.textContent = "Введите rss-ссылку"; //
  }
}

//проверка ссылки при каждом изменении
rssLinkInput.addEventListener("input", rssValidLink);

//слушатель на кнопуську
loadButton.addEventListener("click", () => {
    console.log('кнопка нажата!');
  rssValidLink();
  if (isValidUrl(rssLinkInput.value)) {
    loadRssFeed(rssLinkInput.value);//грузит и парсит
    //alert('загрузка rss-ленты')//просто проверка работает ли кнопка
  }
});

//функция загрузки ленты
function loadRssFeed(url) {
    const corsProxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';//любой прокси

    //убрать предыдущие события
    errorMessage.textContent = '';
    resultDiv.textContent = '';
    resultDiv.classList.remove = ('valid', 'invalid');

    //проверка что url не пустой
    if (!url) {
      errorMessage.textContent = 'Пожалуйста, введите rss ссылку!';
      resultDiv.classList.add = 'invalid';
      return;
    }

    //запрос на сервер
    fetch(corsProxy + url)
      .then(response =>{
        if (!response.ok) {
          throw new error(`Ошибка сети: ${response.status}`);
        }
        return response.json();
      })
      .then(data =>{
        //смотрим вернулись ли данные
        if (!data || !data.contents) {
          throw new error('Нет данных');
        }

        //парсер данных XML
        const xmlString = data.contents;
        console.log("XML String:", xmlString); // Выводим XML-строку в консоль
        const parser = new DOMParser();
        let xmlDoc;
        try {
          xmlDoc = parser.parseFromString(xmlString,'text/xml');
        } catch (e) {
          console.error("Ошибка парсинга XML:", e);
        errorMessage.textContent = "Ошибка парсинга XML: Некорректный формат RSS.";
        resultDiv.classList.add('invalid');
        feedsContainer.innerHTML = '';
        return;
        }

        //смотрим содержит ли xml элементы rss
        const rssElement = xmlDoc.querySelector('rss');
        if (!rssElement) {
        console.error('Не корректный rss формат');
        errorMessage.textContent = 'Не корректный rss формат';
        resultDiv.classList.add('invalid');
        feedsContainer.innerHTML = '';
        return;
        }

        // Извлекаем данные из RSS-ленты (пример)
        const title = xmlDoc.querySelector('channel > title').textContent;
        const description = xmlDoc.querySelector('channel > description').textContent;
        const items = Array.from(xmlDoc.querySelectorAll('item'));

        // Создаем HTML-код для отображения фидов
        let feedsHTML = `<h3>${title}</h3><p>${description}</p>`;
        items.forEach(item => {
            const itemTitle = item.querySelector('title').textContent;
            const itemLink = item.querySelector('link').textContent;
            feedsHTML += `
                <div class="feed-item">
                    <a href="${itemLink}" target="_blank" class="feed-title">${itemTitle}</a>
                </div>
            `;
        });

        // Отображаем HTML-код в контейнере
        feedsContainer.innerHTML = feedsHTML;

        //если все ок, то пишем валид
        resultDiv.textContent = 'Rss-ссылка валидна!';
        resultDiv.classList.add = ('valid');
})    
//обработка ошибок
      .catch(error => {
        console.log('Ошибка:', error);
        errorMessage.textContent = `Ошибка: ${error.massage}`;
        resultDiv.classList.add('invalid');
      }


      )

}

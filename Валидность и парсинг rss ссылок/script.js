//находим элементики
const rssLinkInput = document.getElementById("rssLink");
const errorMessage = document.getElementById("errorMessage");
const loadButton = document.getElementById("loadButton");

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
loadButton.addEventListener("click", function () {
    console.log('кнопка нажата!');
  rssValidLink();
  if (isValidUrl(rssLinkInput.value)) {
    //alert('загрузка rss-ленты')//просто проверка работает ли кнопка
  }
});

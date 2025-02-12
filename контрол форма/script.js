const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting"); //находим элементы

//обновляем приветствие
function updateGreeting() {
  const name = nameInput.value; //получить значение из поля ввода
  greeting.textContent = `Привет, ${name}!`; //обновить приветствие
}

nameInput.addEventListener("input", updateGreeting); //добавляем обработчик события ипут к полю ввода

updateGreeting(); //вызов первоначальной отрисовки

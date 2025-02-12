document.addEventListener("DOMContentLoaded", function () {
  //Решение: находим элементы.
  const likeButton = document.getElementById("likeButton");
  const likeCount = document.getElementById("likeCount");

  //the first state
  let like = false; //если не лайкнуто
  let count = 0; //ноль лайков

  //function update interface
  function updateUI() {
    likeCount.textContent = count; //обновл счетчик лайкосов

    if (like) {
      likeButton.textContent = "Убрать лайк";
    } else {
      likeButton.textContent = "Лайк";
    }
  }
  likeButton.addEventListener("click", function () {
    if (like) {
      like = false;
      count--;
    } else {
      like = true;
      count++;
    }
    updateUI(); //обновление интерфейса пиу
  });

  updateUI(); //вызов функции первой отрисовки
});

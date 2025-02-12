const calculatorForm = document.getElementById("calculatorForm");
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const calculateBtn = document.getElementById("calculateBtn");
const resultCalc = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

//начальное инитиал состояние
let currentState = "initial";

//обновление интерфейса с разными состояниями
function calcUpdate() {
  switch (currentState) {
    case "initial":
      calculateBtn.disabled = false;
      resultCalc.textContent = "";
      errorMessage.textContent = "";
      break;
    case "valid_input":
      calculateBtn.disabled = false;
      resultCalc.textContent = "";
      errorMessage.textContent = "";
      break;
    case "invalid_input":
      calculateBtn.disabled = true;
      errorMessage.textContent = "Пожалуйста, введите корректные цифры";
      resultCalc.textContent = "";
      break;
    case "calculated":
      calculateBtn.disabled = false;
      errorMessage.textContent = "";
      break;
    default:
      console.error("Неизвестное состояние:", currentState);
  }
}
//валидация полей ввода
function validInput() {
  const num1 = num1Input.value;
  const num2 = num2Input.value;

  if (num1 === "" || num2 === "" || isNaN(parseFloat(num1)) || isNaN(parseFloat(num2))) { //Добавлено ParseFloat!
    currentState = "invalid_input";
  } else {
    currentState = "valid_input";
  }
  calcUpdate();
}
//расчет результата
function calcResult() {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    currentState = "invalid_input";
    calcUpdate();
    return; //при невалидном вводе прерывает выполнение
  }
  const sum = num1 + num2;
  resultCalc.textContent = `Результат ${sum}`;
  currentState = "calculated";
  calcUpdate();
}
//обработка событий
num1Input.addEventListener("input", validInput);
num2Input.addEventListener("input", validInput);
calculateBtn.addEventListener("click", calcResult);

calcUpdate();

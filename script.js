const select = document.querySelector(".dropdown-select");
const dropdownContent = document.querySelector(".dropdown-content");
const checkedArea = document.querySelector(".checked-area");
const labels = document.querySelectorAll(".checkbox-label:not(:first-child)");
const searchLabel = document.querySelector(".search-label");
const colors = [];
let index = -1;

select.addEventListener("click", function (event) { // При кліку на select клас hidden перемикається (показує або приховує вміст меню)
  dropdownContent.classList.toggle("hidden");

  const changeSelectImage = document.querySelector(".image");
  changeSelectImage.src = changeSelectImage.src.includes("arrowDown.png") ? "arrowUp.png" : "arrowDown.png";
  // Тут динамічно здійснюється зміна картинки при відкриванні та закритті меню. 

  // Якщо масив із обраними елементами colors = [] пустий, тобто ми ще не зробили жодного вибору, то текст головного поля меню стирається. Це реалізовано для того, щоб коли меню відкривається і ще не додано жодного елементу, напис Select зникає.
  if (!colors.length) { 
    checkedArea.textContent = "";
  }
  // Ця функція зупиняє розповсюдження події, щоб клік не спричинив закриття меню через інші обробники.
  event.stopPropagation(); 
});

// Тут реалізовано додавання елементу до checkedArea за допомогою кліку на елемент меню, його видалення таким же шляхом натискання ще раз на нього. І видалення по кліку на елемент, який вже був доданий до checkedArea.
labels.forEach((label) => {
  label.addEventListener("click", function (event) {
    event.stopPropagation();

    // Тут при кліку ЛКМ на елемент (label) його текст забирається у змінну, для подальшої перевірки на наявність в полі checkedArea.
    const labelText = label.textContent;
    // Перевіряємо, чи є обраний елемент в полі checkedArea. Список checkedArea.children це список вже обраниелементів, які метод Array.from перетворює у масив, а .find шукає серед обраних елементів той, який має такий же текст. Зберігаємо цей результат у змінну.
    const existingColorElement = Array.from(checkedArea.children).find((child) => child.textContent === labelText);

    // Якщо елемент вже був обраний, то наступний клік після його обрання в checkedArea видалить його.
    if (existingColorElement) {
      checkedArea.removeChild(existingColorElement);

      // Знаходимо індекс елементу в масиві colors і видаляємо його.
      const index = colors.indexOf(labelText);
      if (index !== -1) {
        colors.splice(index, 1);
      }
    } else { // Якщо елемент не був обраний, додаємо його.
      colors.push(labelText);

      const colorElement = document.createElement("div"); // Створюємо дів, який буде представляти собою контейнер маленької копії елемента зі списку меню. 
      colorElement.textContent = labelText; // Встановлюємо йому текст обраного елемента.
      colorElement.classList.add("color-item"); // Додаємо клас для стилізації.

      checkedArea.appendChild(colorElement); // Додаємо дів до checkedArea (кнопка випадного меню).

      // Обробник подій для видалення елементу.
      colorElement.addEventListener("click", function (event) {
        event.stopPropagation();

        checkedArea.removeChild(colorElement);

        // Знаходимо індекс елементу в масиві colors і видаляємо його.
        const index = colors.indexOf(labelText);
        if (index !== -1) {
          colors.splice(index, 1);
        }
      });
    }
  });
});

// Тут при введенні даних в інпут, всі символи порівнюються із символами в назвах елементів (використовуючи для цього цикл), переводячи їх в нижній регістр. Потім використовуємо зміну css властивоті display (block) на (none) у тих елементів, у яких нема збігів з введеними символами.
searchLabel.addEventListener("input", function () {
  const searchLabelText = searchLabel.value.toLowerCase();

  labels.forEach((label) => {
    const text = label.textContent.toLowerCase();

    label.style.display = text.includes(searchLabelText) ? "block" : "none";
  });
});

// Тут реалізуємо закриття меню кліком поза його межами. Виключаючи можливість закрити меню кліком на поле для пошуку, так як воно у нас не бере участі у циклі для обробки елементів.
document.addEventListener("click", function (event) {
  if (
    !dropdownContent.contains(event.target) &&
    !select.contains(event.target)
  ) {
    dropdownContent.classList.add("hidden");
  }
});


document.addEventListener("keydown", function (event) {
  event.stopPropagation();

  if (event.key === "ArrowDown") {
    console.log("ArrowDown");
    if (index < labels.length - 1) {
      clearSelection(); // Виклик функції, яка знімає виділення з попереднього елемента.
      index++;
      selectLabel(labels[index]); // Виклик функції, яка додає виділення на наступний обраний елемент.
    }
  } else if (event.key === "ArrowUp") {
    console.log("ArrowUp");
    if (index > 0) {
      clearSelection(); // Те саме тільки у зворотньому напрямку.
      index--;
      selectLabel(labels[index]); // Те саме тільки у зворотньому напрямку.
    }
  } else if (event.key === "Enter") {
    event.stopPropagation();
    const labelText = labels[index].textContent;

    if (!colors.includes(labelText)) {
      colors.push(labelText);

      const colorElement = document.createElement("div");
      colorElement.textContent = labelText;
      colorElement.classList.add("color-item");

      checkedArea.appendChild(colorElement);

      colorElement.addEventListener("click", function () {
        checkedArea.removeChild(colorElement);

        const index = colors.indexOf(labelText);
        if (index !== -1) {
          colors.splice(index, 1);
        }
      });
    }
  } else if (event.key === " ") {
    event.preventDefault(); // Вимикаємо стандартну поведінку пробілу, тобто прокручування сторінки.
    
    // Беремо останній обраний елемент і шукаємо його в checkedArea.
    if (colors.length > 0) {
      const lastColor = colors[colors.length - 1];
      const elementsToRemove = Array.from(checkedArea.children).filter((child) => child.textContent === lastColor);

      // Якщо знаходиться хоча б один елемент, то ми видаляємо його з checkedArea та colors при кліку на пробіл.
      if (elementsToRemove.length > 0) {
        checkedArea.removeChild(elementsToRemove[0]);
        colors.splice(colors.length - 1, 1);
      }
    }
  }
});

function selectLabel(label) {
  label.classList.add("selected");
  label.focus();
}

function clearSelection() {
  labels.forEach((label) => label.classList.remove("selected"));
}
const select = document.querySelector(".dropdown-select");
const dropdownContent = document.querySelector(".dropdown-content");
const checkedArea = document.querySelector(".checked-area");
const labels = document.querySelectorAll(".checkbox-label:not(:first-child)");
const searchLabel = document.querySelector(".search-label");
const closeButton = document.createElement("button");
const colors = [];

select.addEventListener("click", function (event) {
  
  dropdownContent.classList.toggle("hidden");

  const changeSelectImage = document.querySelector(".image");
  changeSelectImage.src = changeSelectImage.src.includes("arrowDown.png") ? "arrowUp.png" : "arrowDown.png";

  if (!colors.length) {
    checkedArea.textContent = "";
  }
  event.stopPropagation();
});

labels.forEach((label) => {
  label.addEventListener("click", function (event) {
    event.stopPropagation();

    const labelText = label.textContent;
    const existingColorElement = Array.from(checkedArea.children).find((child) => child.textContent === labelText);

    if (existingColorElement) {
      checkedArea.removeChild(existingColorElement);

      const index = colors.indexOf(labelText);
      if (index !== -1) {
        colors.splice(index, 1);
      }
    } else {
      colors.push(labelText);

      const colorElement = document.createElement("div");
      colorElement.textContent = labelText;
      colorElement.classList.add("color-item");

      checkedArea.appendChild(colorElement);

      colorElement.addEventListener("click", function (event) {
        event.stopPropagation();

        checkedArea.removeChild(colorElement);

        const index = colors.indexOf(labelText);
        if (index !== -1) {
          colors.splice(index, 1);
        }
      });
    }
  });
});

searchLabel.addEventListener("input", function () {
  const searchLabelText = searchLabel.value.toLowerCase();

  labels.forEach(label => {
    const text = label.textContent.toLowerCase();

    label.style.display = text.includes(searchLabelText) ? "block" : "none";
  });
});

document.addEventListener("click", function(event) {
  if (!dropdownContent.contains(event.target) && !select.contains(event.target)) {
    dropdownContent.classList.add("hidden");
  }
});
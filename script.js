const select = document.querySelector(".dropdown-select");
const dropdownContent = document.querySelector(".dropdown-content");
const checkedArea = document.querySelector(".checked-area");
const labels = document.querySelectorAll(".dropdown-content .checkbox-label");

select.addEventListener("click", function () {
  dropdownContent.classList.toggle("hidden");

  const changeSelectImage = document.querySelector(".image");
  changeSelectImage.src = changeSelectImage.src.includes("arrowDown.png") ? "arrowUp.png" : "arrowDown.png";

  if (checkedArea.textContent) {
    checkedArea.textContent = "";
  } else {
    checkedArea.textContent = "Dropdown-select";
  }
});
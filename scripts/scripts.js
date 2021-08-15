import displayController from "./displayController.js";

const restartBtn = document.querySelector('.restart-btn')

restartBtn.addEventListener('click', () => {
    displayController.resetDisplay();
});

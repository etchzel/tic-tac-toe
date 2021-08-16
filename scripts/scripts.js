import displayController from "./displayController.js";

const gameModeMessage = document.querySelector('.current-mode');
const vsHumanBtn = document.querySelector('.vs-human');
const vsAiBtn = document.querySelector('.vs-ai');
const aiModeSetting = document.querySelector('.ai-mode-settings');
const signOButton = document.querySelector('.sign-o');
const signXButton = document.querySelector('.sign-x');
const restartBtn = document.querySelector('.restart-btn');

restartBtn.addEventListener('click', () => {
    displayController.resetDisplay();
    if (signOButton.classList.contains('active')) {
        displayController.updateSign('O');
    };
});

vsHumanBtn.addEventListener('click', () => {
    displayController.resetDisplay();
    displayController.setGameMode('human');
    gameModeMessage.textContent = `Current Mode: ${vsHumanBtn.textContent}`;
    vsHumanBtn.classList.add('active');
    vsAiBtn.classList.remove('active');
    aiModeSetting.classList.add('hidden');
});

vsAiBtn.addEventListener('click', () => {
    displayController.resetDisplay();
    displayController.setGameMode('ai');
    gameModeMessage.textContent = `Current Mode: ${vsAiBtn.textContent}`;
    vsAiBtn.classList.add('active');
    vsHumanBtn.classList.remove('active');
    aiModeSetting.classList.remove('hidden');
});

signXButton.addEventListener('click', (e) => {
    displayController.resetDisplay();
    displayController.updateSign(e.target.textContent);
    signXButton.classList.add('active');
    signOButton.classList.remove('active');
});

signOButton.addEventListener('click', (e) => {
    displayController.resetDisplay();
    displayController.updateSign(e.target.textContent);
    signOButton.classList.add('active');
    signXButton.classList.remove('active');
});
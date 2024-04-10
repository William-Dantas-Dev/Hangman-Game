const contentButtons = document.querySelector(".buttons");
const contentGuessWord = document.querySelector(".guess-word");
const img = document.querySelector("img");
const contentClue = document.querySelector(".clue");
const buttonNew = document.querySelector(".new-game");
const congratulationText = document.querySelector(".congratulation");
let endGame = false;
let indexImage;

buttonNew.addEventListener('click', () => {
    resetGame();
})

const words = [
    {word: "banana", clue: "Fruta alongada e amarela"},
    {word: "chocolate", clue: "Doce feito a partir do cacau"},
    {word: "sorvete", clue: "Sobremesa gelada"},
    {word: "foguete", clue: "Veículo espacial"},
    {word: "dinossauro", clue: "Réptil pré-histórico"},
    {word: "sanduíche", clue: "Refeição rápida com pão e recheio"},
    {word: "leão", clue: "O rei da selva"},
    {word: "girafa", clue: "Animal com pescoço longo"},
    {word: "floresta", clue: "Ecossistema com muitas árvores"},
    {word: "ocidental", clue: "Relativo ao oeste"},
    {word: "suculento", clue: "Que contém muito suco"},
    {word: "palavra", clue: "Unidade básica da linguagem"},
    {word: "radiante", clue: "Brilhante e luminoso"},
    {word: "chaveiro", clue: "Objeto utilizado para organizar chaves"},
    {word: "perigoso", clue: "Que representa risco"},
    {word: "silêncio", clue: "Ausência de som"},
    {word: "jornal", clue: "Publicação impressa com notícias"},
    {word: "pipoca", clue: "Lanche feito de milho estourado"},
    {word: "bicicleta", clue: "Meio de transporte de duas rodas"},
    {word: "livro", clue: "Coleção de páginas com texto"},
]
function getWord(){
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

init();

function init(){
    indexImage = 1;
    img.src = "./src/image/img1.png";
    generateGuessSection();
    generateButtons();
}


function generateGuessSection(){
    contentGuessWord.textContent = "";
    const {word, clue} = getWord();
    const wordWithoutAccent = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    Array.from(wordWithoutAccent).forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("word", letter.toUpperCase());
        contentGuessWord.append(span);
    })

    contentClue.textContent = `Dica: ${clue}`;
}

function generateButtons(){
    contentButtons.textContent = "";
    for(let i = 97; i < 123; i++){
        const button = document.createElement("button");
        const letter = String.fromCharCode(i).toUpperCase();
        button.textContent = letter;
        button.addEventListener('click', () => {
            button.disabled = true;
            verifyLetter(letter, button);
        })
        contentButtons.appendChild(button);
    }
}

function verifyLetter(letter, button){
    if(!endGame){
        const arr = document.querySelectorAll(`[word="${letter}"]`);
        if(arr.length){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
            wrongAnser();
        };
        arr.forEach((e) => {
            e.textContent = letter;
        });
        
        const spans = document.querySelectorAll(`.guess-word span`);
        const won = !Array.from(spans).find((span) => span.textContent === "_");

        if(won){
            playerWon(true);
        }
    }
}

function wrongAnser(){
    indexImage++;
    img.src = `./src/image/img${indexImage}.png`;

    if(indexImage === 7){
        playerWon(false);
    }
}

function playerWon(won){
    if(won){
        congratulationText.classList.add("won");
        congratulationText.textContent = "Parabens. Você Venceu!";
    }else{
        congratulationText.classList.add("lose");
        congratulationText.textContent = "Tente Novamente. Infelizmente você perdeu!";
    }
    congratulationText.classList.remove("invisible");
    congratulationText.classList.add("visible");
    
    endGame = true;
}

function resetGame(){
    congratulationText.classList.add("invisible");
    congratulationText.classList.remove("visible");
    congratulationText.classList.remove("won");
    congratulationText.classList.remove("lose");
    congratulationText.textContent = "";
    endGame = false;
    init();
}
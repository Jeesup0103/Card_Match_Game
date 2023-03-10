/*
추가 기능
-시도 횟수 표시 기능
  -오른쪽에 있는 tool-box에 총 시도 횟수 표시
  -게임 종료 후 총 시도 횟수 표시
  -가장 적은 횟수로 성공시 축하 메세지 표시
-게임 종료 후 container 숨기고 재시작 묻는 박스 표시
*/
const CARD_NUM = 16;
var imgFile = [
  "img/icons8-bear-94.png",
  "img/icons8-bird-94.png",
  "img/icons8-cat-94.png",
  "img/icons8-clown-fish-94.png",
  "img/icons8-cow-94.png",
  "img/icons8-dog-94.png",
  "img/icons8-dolphin-94.png",
  "img/icons8-octopus-94.png",
];
const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");
const completed = document.querySelector(".EOG");
const completeText = document.querySelector(".eogText");
const toolBox = document.querySelector(".tool-box");
const attempt = document.querySelector(".attemptNum");
let card1, card2;
let disableDeck = false;
let matchedCard = 0;
let attemptNum = 0;

function makeCardDeck() {
  let cardDeck = [];
  for (let i = 0; i < CARD_NUM / 2; i++) {
    cardDeck.push(i);
    cardDeck.push(i);
  }
  cardDeck.sort(() => Math.random() - 0.5);

  for (let i = 0; i < CARD_NUM; i++) {
    let cardIdx = cardDeck[i];
    const myimg = new Image(94, 94);
    myimg.src = imgFile[cardIdx];
    cards[i].childNodes[1].appendChild(myimg);
  }
}

function flipCard(element) {
  let clickedCard = element.target;
  if (clickedCard != card1 && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    card2 = clickedCard;
    disableDeck = true;
    let card1Img = card1.querySelector("img").src;
    let card2Img = card2.querySelector("img").src;
    match(card1Img, card2Img);
  }
}

function match(img1, img2) {
  attemptNum++;
  attempt.innerText = `Number of attempts: ${attemptNum}`;
  //right answer
  if (img1 === img2) {
    matchedCard++;
    //completed
    if (matchedCard === CARD_NUM / 2) {
      setTimeout(() => {
        container.classList.add("hidden");
        toolBox.classList.add("hidden");
        if (attemptNum == CARD_NUM / 2) {
          completeText.innerHTML = "Best Score! Good Job!";
        } else {
          completeText.innerHTML = `Game completed in ${attemptNum} steps!`;
        }
        completed.classList.remove("hidden");
      }, 500);
    }
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    card1 = card2 = "";
    return (disableDeck = false);
  }
  //wrong answer
  else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      card1 = card2 = "";
      disableDeck = false;
    }, 500);
  }
}
function initial() {
  cards.forEach((card) => {
    card.classList.add("noclick");
    setTimeout(() => {
      card.classList.add("flip");
    }, 500);
    setTimeout(() => {
      card.classList.remove("flip");
      card.classList.remove("noclick");
    }, 3000);
  });
}

makeCardDeck();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
initial();

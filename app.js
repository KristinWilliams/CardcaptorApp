const sakuraCardBtn = document.querySelector(".sakura-crd");

const clowCardBtn = document.querySelector(".clow-crd");

const modalContainer = document.querySelector(".modal-container");

const modalOverlay = document.querySelector(".overlay");
const backBtn = document.querySelector(".back-btn");

async function getCards() {
  try {
    const getAllCards = await fetch(
      "https://protected-taiga-89091.herokuapp.com/api/card"
    );
    const cardData = await getAllCards.json();

    loadSakuraCards(cardData.data);

    sakuraCardBtn.addEventListener("click", () => {
      loadSakuraCards(cardData.data);
    });

    clowCardBtn.addEventListener("click", () => {
      loadClowCards(cardData.data);
    });
  } catch (error) {
    alert(error.message);
  }
}

getCards();

const loadSakuraCards = function (cards) {
  sakuraCardBtn.style.border = "2rem solid Cornsilk";
  clowCardBtn.style.border = "none";

  const cardContainer = document.querySelector(".card-container");

  cards.forEach((card, i) => {
    if (card.cardNumber === 1) {
      cardContainer.innerHTML = `<img src="${cards[0].sakuraCard}" alt="sakura card"
    class = "sakura_${i}"/>`;
    } else if (card.sakuraCard && card.cardNumber !== 1) {
      cardContainer.insertAdjacentHTML(
        "beforeend",
        `<img src="${card.sakuraCard}" alt="sakura card" class = "sakura_${i}"
      />`
      );
    }
  });
  cardDescriptionLink(cards);
};

const loadClowCards = function (cards) {
  clowCardBtn.style.border = "2rem solid Cornsilk";
  sakuraCardBtn.style.border = "none";

  const cardContainer = document.querySelector(".card-container");

  cards.forEach((card, i) => {
    console.log(cardContainer);
    if (card.cardNumber === 1) {
      cardContainer.innerHTML = `
      <img src="${cards[0].clowCard}" alt="sakura card" class="clow_${i}"
    />`;
    } else if (card.clowCard && card.cardNumber !== 1) {
      cardContainer.insertAdjacentHTML(
        "beforeend",
        `<img src="${card.clowCard}" alt="sakura card"
        class="clow_${i}"
      />`
      );
    }
  });
  cardDescriptionLink(cards);
};

function cardDescriptionLink(cards) {
  const descriptionContainer = document.querySelector(".description-container");
  const cardsImg = document.querySelectorAll("img");
  const cardName = document.querySelector("h1");

  cardsImg.forEach((card, i) => {
    card.addEventListener("click", () => {
      modalContainer.classList.toggle("hidden");
      modalOverlay.classList.toggle("hidden");

      cardName.textContent = `${cards[i].englishName}`;
      descriptionContainer.innerHTML = ` <ul>
          <li>Card Number: ${cards[i].cardNumber}</li>
          <li>Spanish Name: ${cards[i].spanishName}</li>
          <li>Kanji: ${cards[i].kanji}</li>
          <li>Rōmaji: ${cards[i].Rōmaji}</li>
          <li>First Manga Apperance:  ${cards[i].appeardManga}</li>
          <li>First Anime Appearance: Episode ${cards[i].appeardAnime}</li>
       </ul>`;
    });
  });
}

backBtn.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
  modalOverlay.classList.add("hidden");
  console.log("hi");
});

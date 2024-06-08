const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let product = [
  {
    id: 1,
    name: "PRODUCT 1",
    image:
      "assets/img/zapatos-correr-o-zapatillas-deporte-sobre-fondo-transparente_84443-1665.avif",
    price: 2000,
  },
  {
    id: 2,
    name: "PRODUCT 2",
    image:
      "assets/img/zapatos-correr-o-zapatillas-deporte-sobre-fondo-transparente_84443-1682.avif",
    price: 2200,
  },
  {
    id: 3,
    name: "PRODUCT 3",
    image:
      "assets/img/zapatos-correr-o-zapatillas-deporte-sobre-fondo-transparente_84443-1683.avif",
    price: 1000,
  },
  {
    id: 4,
    name: "PRODUCT 4",
    image:
      "assets/img/zapatos-correr-o-zapatillas-deporte-sobre-fondo-transparente_84443-2190.avif",
    price: 2400,
  },
  {
    id: 5,
    name: "PRODUCT 5",
    image:
      "assets/img/zapatos-correr-o-zapatillas-deporte-sobre-fondo-transparente_84443-2221.avif",
    price: 1800,
  },
  {
    id: 6,
    name: "PRODUCT 6",
    image: "assets/img/zapatos-correr-2.jpg",
    price: 1100,
  },
];

let listCards = [];
const initApp = () => {
  product.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
    <img src="${value.image}">
        <div class="title">${value.name}</div>    
    <div class="price">${value.price.toLocaleString()}</div>
    <button onclick="addToCard(${key})">Add To Card</button>
    `;
    list.appendChild(newDiv);
  });
};
initApp();

const addToCard = (key) => {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(product[key]));
    listCards[key].quantity = 1; // Inicializamos la cantidad en 1
  } else {
    listCards[key].quantity++; // Incrementamos la cantidad si el producto ya está en el carrito
  }
  reloadCard();
};
const reloadCard = () => {
  listCard.innerHTML = ``;
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity; // Multiplicamos el precio por la cantidad
    count += value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
      <div><img src="${value.image}"></div>
      <div class="cardTitle">${value.name}</div>
      <div class="cardPrice">${(
        value.price * value.quantity
      ).toLocaleString()}</div>
      <div>
        <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
        <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
      </div>
      `;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
};
const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * product[key].price;
  }
  reloadCard();
};

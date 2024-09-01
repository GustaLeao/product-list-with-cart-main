//variáveis contendo elementos DOM
const container = document.getElementById("desserts_container");
const wrappersArray = document.getElementsByClassName("btn_wrapper");
const cartQty = document.getElementById("cart_title");
const cartList = document.getElementById("cart_list");
const confirmationDialog = document.getElementById("confirmation");
//svgs abaixo
const icons = {
  addToCart: `<img src="./assets/images/icon-add-to-cart.svg" />`,
  carbonNeutral: `<img src="./assets/images/icon-carbon-neutral.svg" />`,
  minus: `<img src="./assets/images/icon-decrement-quantity.svg" />`,
  plus: `<img src="./assets/images/icon-increment-quantity.svg" />`,
  orderConfirmed: `<img src="./assets/images/icon-order-confirmed.svg" />`,
  removeItem: `<img src="./assets/images/icon-remove-item.svg" />`,
  emptyCart: `<img src="./assets/images/illustration-empty-cart.svg" />`,
};
let dessertsInCart = [];
let btnArr = [];

// Pesquisa os dado das sobremesas dentro do data.json
const getDataTo = async (f, id) => {
  try {
    const res = await fetch("data.json");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (f === modifyCartList) {
      f("add", data, id);
    }

    f(data);
  } catch (error) {
    console.error("error fetching data:", error);
  }
};

// Cria os elementos html contendo as sobremesas
const populateContainer = (dataArr) => {
  if (dataArr.length <= 0) {
    console.error("there was no data in Array");
    return;
  }

  container.innerHTML = "";

  for (let data of dataArr) {
    const { image, name, category, price } = data;
    container.innerHTML += `
            <div class='dessert'> 
                <img class='dessert_img' src='${image.desktop}'/>
                <div class='btn_wrapper'>
                  <button class='dessert_btn' onclick=verifyBtn(event) value="${name}">  </button>
                  ${icons.addToCart} 
                  <p>Add to Cart</p> 
                </div>
                <span class='category'> ${category} </span>
                <p class='dessert_name'> ${name} </p>
                <p class='dessert_price'> $${price.toFixed(2)} </p>
            </div>
        `;
  }
};

// Acha o botão apertado pelo index e identifica a qual sobremesa pertence pelo seu valor, que é nome da sobremesa
// Find clicked button by index and identify wich dessert it belongs by your value, what is the name of the dessert
const verifyBtn = (e) => {
  const btns = document.getElementsByClassName("dessert_btn");
  btnArr = Array.from(btns);

  let i = btnArr.findIndex((btn) => btn == e.target);

  let indentifier = btnArr[i].getAttribute("value");
  console.log(indentifier);

  getDataTo(modifyCartList, indentifier);
};

// Remove a sobremesa da array do carrinho
const removeDessert = (i, name) => {
  dessertsInCart = dessertsInCart.filter((dessert) => dessert.i !== i);

  wrappersArray[i].classList.remove("clicked");
  wrappersArray[i].innerHTML = `
      <button class='dessert_btn' onclick=verifyBtn(event) value="${name}"></button>
      ${icons.addToCart} 
      <p>Add to Cart</p> `;
  modifyCartList("remove", "dessert", i);

  showTotal();
};

// Diminui a quantidade de uma determinada sobremessa através de um botão apertado
const decrementQty = (i) => {
  let dessert = dessertsInCart.find((el) => el.i == i);

  dessert.qty--;

  if (dessert.qty == 0) {
    removeDessert(i, dessert.name);
    return;
  }
  showTotal();

  // busca os elementos relacionados a sobremesa para atualização da saída de dados
  let btnQty = document.getElementById(`qty_${i}`);
  let cartQty = document.getElementById(`order_qty_${i}`);
  let totalPrice = document.getElementById(`total_price_${i}`);

  let { qty, price } = dessert;

  btnQty.innerHTML = `${qty}`;
  cartQty.innerHTML = `${qty}x`;
  totalPrice.innerHTML = `$${(qty * price).toFixed(2)}`;
};

// Aumenta a quantidade de uma determinada sobremessa através de um botão apertado
const incrementQty = (i) => {
  let dessert = dessertsInCart.find((el) => el.i == i);
  let btnQty = document.getElementById(`qty_${i}`);
  let orderQty = document.getElementById(`order_qty_${i}`);
  let totalPrice = document.getElementById(`total_price_${i}`);

  dessert.qty++;

  let { qty, price } = dessert;
  btnQty.innerHTML = `${qty}`;
  orderQty.innerHTML = `${qty}x`;
  totalPrice.innerHTML = `$${(qty * price).toFixed(2)}`;

  showTotal();
};

//Atualiza a lista do carrinho
const modifyCartList = (addRemove, dataArr, id) => {
  if ((!dataArr && addRemove === "add") || (!id && addRemove === "add")) {
    console.log("index/data not referenced");
    return;
  }

  // Adiciona uma sobremesa ao carrinho através do identificador: o nome
  if (addRemove === "add") {
    let { name, price, image } = dataArr.find((el) => el.name === id);
    let i = dataArr.findIndex((el) => el.name === id);

    console.log(name, price);

    dessertsInCart.push({
      i,
      price,
      name,
      qty: 1,
      dialogImg: image.thumbnail,
    });

    //atualiza o elemento que continha o botão de "Add Cart" para incrementar ou dimnuir a quantidade do produto comprado
    wrappersArray[i].classList.add("clicked");
    wrappersArray[i].innerHTML = `
    <button class="minus_button" onclick='decrementQty(${i})'> ${icons.minus} </button>
    <p id="qty_${i}"> 1 </p> 
    <button class="plus_button" onclick='incrementQty(${i})'> ${icons.plus} </button> 
    `;
  }

  //Se não tiver mais nenhuma sobremesa no carrinho, exibe um ícone e uma frase
  if (dessertsInCart.length <= 0) {
    cartList.innerHTML = `
        <div class="empty_cart">${icons.emptyCart}</div>
        <div class="empty_warning">Your added items will appear here</div>
        `;
    cartList.classList.add("centralized");
    return;
  }

  cartList.innerHTML = "";
  cartList.classList.remove("centralized");

  let cartTotalPrice = 0;
  //Adiciona cada uma sobremesa que estiver na lista ao carrinho
  for (let dessert of dessertsInCart) {
    let { i, name, qty, price } = dessert;
    let totalPrice = qty * price;
    cartTotalPrice += totalPrice;
    cartList.innerHTML += `
      <section class='order border-top'>
        <div class='order_text'>  
          <span class='order_name'>${name}</span>
          <div class='price_wrapper'>
              <p id="order_qty_${i}" class='order_qty'> ${qty}x </p>  
              <p class='unity_price'> <small> @ </small> $${price.toFixed(
                2
              )} </p>
              <p id="total_price_${i}" class='total_order_price'> $${totalPrice.toFixed(
      2
    )} </p>
          </div>
        </div>
        <button class="remove_btn" onclick="removeDessert(${i}, '${name}')"> ${
      icons.removeItem
    }   </button>
      </section>
    `;
  }

  cartList.innerHTML += `
    <div id="total_of_cart" class="border-top">
      <p> Order Total</p> 
      <p id='total_cart_price'>${cartTotalPrice.toFixed(2)}</p>
    </div>

    <div id="card">
      ${icons.carbonNeutral}
      <p> This is a <strong>carbon-neutral</strong> delivery </p>
    </div>

    <button id="confirmation_btn" class="red_btn" onclick="showConfirmation()"> Confirm Order </button>
  `;

  showTotal();
};

const showTotal = () => {
  const totalQty = dessertsInCart.reduce((acc, { qty }) => acc + qty, 0);
  const cartTotalEl = document.getElementById("total_cart_price");
  const totalPrice = dessertsInCart.reduce(
    (acc, { qty, price }) => acc + qty * price,
    0
  );
  cartQty.innerHTML = `Your Cart`;
  if (totalQty > 0) {
    cartQty.innerHTML = `Your Cart (${totalQty})`;
    cartTotalEl.innerHTML = `$${totalPrice.toFixed(2)}`;
  }
};

//abre um dialog para exibir a confrimação da compra
const showConfirmation = () => {
  confirmationDialog.innerHTML = `
    ${icons.orderConfirmed}
    <h2 id="confirmation_title"> Order Confirmed </h2>
    <p id="confirmation_subtitle"> We hope you enjoy your food! </p>
    <div id="confirmation_container"></div>
  `;
  const body = document.querySelector("body");
  const container = document.getElementById("confirmation_container");
  let cartTotalEl = document.getElementById("total_cart_price");
  let cartTotalPrice = cartTotalEl.innerHTML;

  for (let dessert of dessertsInCart) {
    let { name, qty, price, dialogImg } = dessert;
    container.innerHTML += `
      <section class="order_confirmed">
      <div class="dessert_content_wrapper">
        <img class="thumbnail" src="${dialogImg}"/>
          <div class="order_text_wrapper">
            <span class="order_name"> ${name} </span>
            <div class="price_wrapper">
              <p class="order_qty"> ${qty}x </p>
              <p class="unity_price"> @ $${price.toFixed(2)} </p>
            </div>
          </div>
        </div>
            <p class="total_order_price"> $${(price * qty).toFixed(2)}</p>
      </section>
    `;
  }
  confirmationDialog.innerHTML += `
  <div id="total_of_cart" class="border-top">
      <p> Order Total</p> 
      <p id='total_cart_price'>${cartTotalPrice}</p>
    </div>

  <button id="new_order" class="red_btn" onclick="reset()"> Start a new order </button>
  `;

  body.classList.add("stop_scroll");
  confirmationDialog.showModal();
};

// Limpa todos os espaços de exibição, exceto a sessão de compra das sobremesas
const reset = () => {
  const body = document.querySelector("body");

  body.classList.remove("stop_scroll");
  confirmationDialog.close();
  dessertsInCart = [];
  cartList.innerHTML = "";
  confirmationDialog.innerHTML = "";
  cartQty.innerHTML = `Your Cart`;
  getDataTo(populateContainer);
};

window.onload = () => {
  const btns = document.getElementsByClassName("dessert_btn");

  btnArr = Array.from(btns);

  if (cartList.innerHTML == "") {
    cartList.innerHTML = `
        <div class="empty_cart">${icons.emptyCart}</div>
        <div class="empty_warning">Your added items will appear here</div>
        `;
  }
  cartList.classList.add("centralized");
  getDataTo(populateContainer);
};

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Escape" && confirmationDialog.open) {
    const body = document.querySelector("body");

    res = confirm("Are you sure you want to close this dialog?");

    if (res === true) {
      body.classList.remove("stop_scroll");
      confirmationDialog.close();
    }
  }
});

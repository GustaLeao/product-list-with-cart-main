//variáveis contendo elementos DOM
const container = document.getElementById("desserts_container");
const wrappersArray = document.getElementsByClassName("btn_wrapper");
const cartQty = document.getElementById("cart_title");
const cartList = document.getElementById("cart_list");
const confirmationDialog = document.getElementById("confirmation");
//svgs abaixo
const icons = {
  addToCart: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>`,
  carbonNeutral: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>`,
  minus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  orderConfirmed: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
<path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
</svg>
`,
  removeItem: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>`,
  emptyCart: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128">
<path fill="#260F08" d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/>
<path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/>
<path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/>
<path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/>
<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="m81.076 28.966 34.187-4.16"/>
<path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/>
<path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/>
<path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/>
<path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/>
<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/>
</svg>`,
};
let dessertsInCart = [];
let btnArr = [];

// Pesquisa os dado das sobremesas dentro do data.json
const getDataTo = async (f, id) => {
  try {
    const res = await fetch("data.json");
    const resTwo = await fetch("svg-data.json");

    if (!res.ok || !resTwo.ok) {
      throw new Error(`HTTP error! status: ${res.status} ${resTwo.status}`);
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

// Acha o botão apertado pelo index e identifica a qual sobremesa pertence
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
  cartQty.innerHTML = `Your Cart`;
  let totalQty = dessertsInCart.reduce((acc, { qty }) => acc + qty, 0);
  let cartTotalEl = document.getElementById("total_cart_price");
  let totalPrice = dessertsInCart.reduce(
    (acc, { qty, price }) => acc + qty * price,
    0
  );
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

  let container = document.getElementById("confirmation_container");
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
  confirmationDialog.showModal();
};

// Limpa todos os espaços de exibição, exceto a sessão de compra das sobremesas
const reset = () => {
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

# Product list with cart solution

![Screenshot of desktop layout](./assets/images/screenshot.png)

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Live Site URL: [GitHub Pages](https://gustaleao.github.io/product-list-with-cart-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow

### What I learned

I populate the HTML dinamically using functions on the JavaScript, thing i just have done in my course from [freeCodeCamp](https://www.freecodecamp.org/), and make ID to choose the correct element in a dinamic array;

```js
const proudOfThisFunc = () => {
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
}
```

### Continued development

I want to refine the use of dinamic array and fetch data for dinamic updates UI (User Interface). The next step i will take is learn a CSS framework, for less trouble in my futures projects 🤣.

### Useful resources

- [PowerToys](https://learn.microsoft.com/pt-br/windows/powertoys/) - This helped me align texts in my project.
- [Responsive Viewer](https://chromewebstore.google.com/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb?pli=1) - This Google extension helped me visualize responsiveness in different device layouts.

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/GustaLeao)
- LinkedIn - [@Gustavo Leão](https://www.linkedin.com/in/075leao/)

//Preloader
window.addEventListener("load", function () {
  setTimeout(function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
    // preloader.style.display = "none";

    const content = document.querySelector(".content");
    if (content) {
      content.style.display = "block";
    }
    // content.style.display = "block";
  }, 3000);
});

/**Dark mode */
let darkmode = localStorage.getItem("darkmode");
const enableDarmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};
const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};
if (darkmode === "active") enableDarmode();
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarmode() : disableDarkmode();
});

/**============= CART ================== */
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartclose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartclose.addEventListener("click", () => cart.classList.remove("active"));

/***cpyyy */
const cartcontent = document.querySelector(".cart-content");

const addTocart = (productbox) => {
  const productImage = productbox.querySelector("img").src;
  const productTitle = productbox.querySelector(".product-title").textContent;
  const productPrice = productbox.querySelector(".price").textContent;

  const cartItems = document.querySelectorAll(".cart-product-title");
  for (const item of cartItems) {
    if (item.textContent === productTitle) {
      alert("this item is already in the cart");
      return;
    }
  }

  
  cartcontent.appendChild(cartbox);
  const buynowbutton = document.querySelector(".btn-buy");
  buynowbutton.addEventListener("click", () => {
    const cartboxs = cartcontent.querySelectorAll(".cart-box");
    if (cartboxs.length === 0) {
      alert("your cart empty ,please add item before buying");
      return;
    }
    cartboxs.forEach((cartbox) => cartbox.remove());
    cartItemCount = 0;
    updateCount(0);
    ubdateTotalPrice();
    alert("Thank You for buying");
    const clearCartBtn = document.querySelector("#clear-cart");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        cartcontent.innerHTML = "";
        updateCount(0);
        updateTotalPrice();
      });
    }
  });

  cartbox.querySelector(".cart-quantity").addEventListener("click", (event) => {
    const numberElement = cartbox.querySelector(".number");
    const decrementButton = cartbox.querySelector("#decrement");
    let quantity = numberElement.textContent;
    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color = "#999";
      }
    } else if (event.target.id === "increment") {
      quantity++;
      decrementButton.style.color = "#333";
    }
    numberElement.textContent = quantity;
    ubdateTotalPrice();
  });
  updateCount(1);
  ubdateTotalPrice();
};

//========== Slider ==================
document.addEventListener("DOMContentLoaded", function () {
  const numberSlides = document.querySelectorAll(".slider-item");
  const containerSlides = document.querySelector(".slider-wraper");
  const previousButton = document.querySelector(".button-prev");
  const nextButton = document.querySelector(".button-next");

  const slidesTotal = numberSlides.length;
  let sliderIndex = 0;
  let intervalSlider;

  // Function to change the slide
  function changeSlide() {
    numberSlides.forEach((slide) => {
      // Move the slide based on the sliderIndex
      slide.style.transform = `translateX(-${sliderIndex * 100}%)`;
    });
  }

  // Function for the next slide
  function nextSlide() {
    sliderIndex = (sliderIndex + 1) % slidesTotal; // Go to next slide
    changeSlide();
  }

  // Function for the previous slide
  function previousSlide() {
    sliderIndex = (sliderIndex - 1 + slidesTotal) % slidesTotal; // Go to previous slide
    changeSlide();
  }

  // Start automatic slide change
  function continuousSlide() {
    intervalSlider = setInterval(nextSlide, 4500); // Change slide every 4.5 seconds
  }

  // Stop the automatic slide change
  function stopSlide() {
    clearInterval(intervalSlider);
  }

  // Event listeners for buttons
  nextButton.addEventListener("click", () => {
    nextSlide();
    stopSlide();
    continuousSlide();
  });
  previousButton.addEventListener("click", () => {
    previousSlide();
    stopSlide();
    continuousSlide();
  });

  // Start the slider
  continuousSlide();
  // mouseleave and mouseenter
  containerSlides.addEventListener("mouseleave", continuousSlide);
  containerSlides.addEventListener("mouseenter", stopSlide);
});

// ======= CARDS ======================

let allItems = [];
// GET ALL CARDS

function getCardItems() {
  let myHttp = new XMLHttpRequest();
  myHttp.open("GET", "data.json");
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status === 200) {
      allItems = JSON.parse(myHttp.response);
      // console.log(allItems);
      // console.log(allItems.products[0].title);
      allItems.products.forEach((item, index) => {
        document.querySelector(".cards").innerHTML += `
                <div class="card-layer">
                    <div class="card">
                        <div class="img-card">
                            <img src="${item.image}" alt="${item.title}">
                                <div class="overlay">
                                    <i class="show-card-details fa-regular fa-eye"></i>
                                </div>
                        </div>
                        <div class="card-text">
                            <h5>${item.title}</h5>
                            <h5 class="price">$${item.price}</h5>
                        </div>
                        <button class="btn addToCart" onclick="AddToCart(${index})" >Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>`;
      });
      popOut();
      
    }
  });
}
getCardItems();


// REDIRECT TO CART
function AddToCart(index,count=1) {
  console.log("index", index);
  console.log("count", count);
  
  console.log(allItems.products[index]);
  const productImage = allItems.products[index].image;
  console.log(productImage);

  const productTitle = allItems.products[index].title;
  const productPrice = allItems.products[index].price;
  console.log(productPrice);
  console.log("=====");
  const cartbox = document.createElement("div");
  cartbox.classList.add("cart-box");
  cartbox.innerHTML = `
        <img src="${productImage}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="minus">-</button>
                <span  class="counter">${count}</span>
                <button id="plus">+</button>
            </div>
        </div>
        <svg  class="cart-remove" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>`;

  cartcontent.appendChild(cartbox);
  cartbox.querySelector(".cart-remove").addEventListener("click",()=>{
    cartbox.remove();
    updateCount(-1);

    ubdateTotalPrice();
});
cartcontent.appendChild(cartbox);
cartbox.querySelector(".cart-remove").addEventListener("click",()=>{
    cartbox.remove();
updateCount(-1);

ubdateTotalPrice();
});
cartbox.querySelector(".cart-quantity").addEventListener("click",event=>{
    const numberElement=cartbox.querySelector(".counter");
    const decrementButton=cartbox.querySelector("#minus");
    let quantity=numberElement.textContent;
    if (event.target.id === "minus" && quantity>1) {
        quantity --;
        if (quantity === 1) {
            decrementButton.style.color="#999"; 
        }
    } else if(event.target.id ==="plus")
        {
        quantity ++;
        decrementButton.style.color="#333"; 

    }
    numberElement.textContent=quantity;
    ubdateTotalPrice();

});
updateCount(1);
ubdateTotalPrice();
}

/**Total Price */
const ubdateTotalPrice = () => {
  const totalpriceElement = document.querySelector(".total-price");
  const cartboxs = cartcontent.querySelectorAll(".cart-box");
  let total = 0;
  cartboxs.forEach((cartbox) => {
    const priceElement = cartbox.querySelector(".cart-price");
    const quantityElement = cartbox.querySelector(".counter");
    const price = parseFloat(
      priceElement.textContent.replace("Rs.", "").replace(/,/g, "").trim()
    );
    let quantity = parseInt(quantityElement.textContent);
    total += price * quantity;
  });
  totalpriceElement.textContent = `${total}`;
};
let cartItemCount = 0;
const updateCount = (change) => {
  const countbage = document.querySelector(".cart-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    countbage.style.visibility = "visible";
    countbage.textContent = cartItemCount;
  } else {
    countbage.style.visibility = "hidden";
    countbage.textContent = "";
  }
};
//Message bu
const buynowbutton = document.querySelector(".btn-buy");
buynowbutton.addEventListener("click", () => {
  const cartboxs = cartcontent.querySelectorAll(".cart-box");
  if (cartboxs.length === 0) {
    alert("your cart empty ,please add item before buying");
    return;
  }
  cartboxs.forEach((cartbox) => cartbox.remove());
  cartItemCount = 0;
  updateCount(0);
  ubdateTotalPrice();
  alert("Thank You for buying");
});
// CARD DETAILS
function popOut() {
  let closeBtn = document.querySelectorAll(".close-btn");
  let lightBoxContainer = document.getElementById("lightBox-container");
  let imgCard = document.querySelectorAll(".img-card");
  let addToPopCart = document.querySelector(".AddToPopCart");
  let minus = document.querySelector(".minus");
  let plus = document.querySelector(".plus");
  let inputCounter = document.querySelector(".counter");

  let    count = parseInt(inputCounter.textContent);
  imgCard.forEach((e, i) => {
    e.addEventListener("click", () => {
      let oneProduct = allItems.products[i];
      
      let img = document.querySelector("#lightBox-container .lightBox-img img");
      img.src = oneProduct.image;

      let lightBoxTitle = document.querySelector(".lightBox-title h3");
      lightBoxTitle.textContent = oneProduct.title;

      let lightBoxPrice = document.querySelector(".lightBox-title h4");
      lightBoxPrice.textContent = "$" + oneProduct.price;

      let SkinType = document.querySelector(".lightBox-desc .SkinType");
      SkinType.textContent = oneProduct.skin_type;

      let UnitCount = document.querySelector(".lightBox-desc .UnitCount");
      UnitCount.textContent = oneProduct.size;

      lightBoxContainer.style.display = "flex";
    });
  });
  closeBtn.forEach((e) => {
    e.addEventListener("click", () => {
      lightBoxContainer.style.display = "none";
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      lightBoxContainer.style.display = "none";
    }
  });

  // - & +
  plus.addEventListener("click", function () {
    count++;
    inputCounter.textContent = count;
  });

  minus.addEventListener("click", function () {
    if (count > 1) {
      count--;
      inputCounter.textContent = count;
    }
  });
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      inputCounter.textContent = 1;
    });
  });
  addToPopCart.addEventListener("click", function () {
    AddToCart(i,count);
});


}


var personal_image = document.getElementsByClassName("personal_image")[0];
var personalabout = document.getElementsByClassName("about")[0];
var personal_name = document.getElementsByClassName("name")[0];

var images = [
  "image/rehab.jpg",
  "image/elbordiny.jpg",
  "image/samir.jpg",
  "image/yosri.jpg",
  "image/abodief.jpg",
];
var about = [
  "amet consectetur elit us odio dolorum explicabo adipisicing elit. Possimus, ea nam fugit idbeatae eligendi cum eius odio dolorum explicabo rem inventore atque exercitationem?adipisicing elit. Possimus, cum eius Laudantium praesentium alias dolore eveniet incidunt? Lorem ipsum dolor sit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, ea nam fugit idbeatae eligendi cum eius odio dolorum explicabo rem inventore atque exercitationem? Laudantium praesentium alias dolore eveniet incidunt? Lorem ipsum dolor sit amet consectetur.",
  "amet consectetur adipisicing elit us odio dolorum explicabo Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, ea nam fugit idbeatae eligendi cum eius odio dolorum explicabo rem inventore, ea nam fugit idbeatae eligendi cum eius Laudantium praesentium Lorem ipsum dolor sit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, ea nam fugit idbeatae eligendi cum eius odio dolorum explicabo rem inventore atque exercitationem? Laudantium praesentium alias dolore eveniet incidunt? Lorem ipsum dolor sit amet.",
  "adipisicing elit. Possimus, ea nam fugit us odio dolorum explicabo idbeatae eligendi Lorem ipsum dolor sit amet consectetur, exercitationem?  Lorem ipsum dolor sit amet consectetur adipisicing elit us odio dolorum explicaboLaudantium praesentium alias dolore eveniet incidunt.",
];
var names = [
  "Rehab Battah",
  "Mohamed Elbordiny",
  "Mohmoud Samir",
  "Mahmoud Yosri",
  "Mohamed Abodief",
];

var i = 0;

function changeContent() {
  personal_image.src = images[i];
  personalabout.innerHTML = about[i];
  personal_name.innerHTML = names[i];

  i = (i + 1) % images.length;
}

changeContent();
setInterval(changeContent, 5000);


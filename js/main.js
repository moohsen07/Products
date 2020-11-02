$(document).ready(function () {

  // show the search bar 

  let searchIcon = $(".right-side .fa-search")

  closeIcon = $(".search .fa-times");

  searchIcon.click(function () {

    $(".search").css("transform", "translateY(0)")

  })

  closeIcon.click(function () {

    $(".search").css("transform", "translateY(-100%)")

  })


  // Change The image scr when hover on it

  let img = $(".recent-product .img-fluid"),

    imgSrc = '';

  img.hover(function () {

    imgSrc = $(this).attr("src")

    $(this).attr("src", $(this).data("src"));

  }, function () {

    $(this).attr("src", imgSrc)

  })


});

// Open Cart

let cartBtn = document.querySelector(".cart-btn")

let cartSection = document.querySelector(".cart")

let addCart = document.querySelectorAll(".add")

let products = [{
    name: "Portable Bluetooth speaker",
    tag: "portableBluetooth",
    price: 249,
    incart: 0
  },
  {
    name: "Elephant Chair",
    tag: "elephantChair",
    price: 800,
    incart: 0
  },
  {
    name: "Libero Hedphone",
    tag: "liberoHedphone",
    price: 499,
    incart: 0
  },
  {
    name: "Decorative Alarm Clock",
    tag: "decorativeAlarmClock",
    price: 65,
    incart: 0
  },
  {
    name: "Molted Plastic Armchair",
    tag: "moltedPlasticArmchair",
    price: 560,
    incart: 0
  },
  {
    name: "Lounge Chair",
    tag: "loungeChair",
    price: 599,
    incart: 0
  },
  {
    name: "Mauris Dining Chair",
    tag: "maurisChair",
    price: 2350,
    incart: 0
  },
  {
    name: "Fusce Porta Armchair",
    tag: "fusceArmchair",
    price: 300,
    incart: 0
  }
]

cartBtn.addEventListener("click", (e) => {
  e.preventDefault()
  cartSection.classList.toggle("open")
})

document.querySelector(".right").addEventListener("click", () => cartSection.classList.toggle("open"))


for (let i = 0; i < addCart.length; i++) {

  addCart[i].addEventListener("click", () => {
    cartNumbers(products[i])
    totallCost(products[i])
    displayProducts()
  })
}

function cartIncrease() {
  let productNumbers = localStorage.getItem("cartNumbers")

  if (productNumbers) {
    document.querySelector(".cart-btn span").textContent = productNumbers
  }
}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem("cartNumbers")
  productNumbers = parseInt(productNumbers)

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1)
  } else {
    localStorage.setItem("cartNumbers", 1)
  }
  cartIncrease()
  setItems(product)
}

function setItems(product) {

  let cartItem = localStorage.getItem("productInCart")
  cartItem = JSON.parse(cartItem)

  if (cartItem) {

    if (cartItem[product.name] == undefined) {

      cartItem = {
        ...cartItem,
        [product.name]: product
      }

    }

    cartItem[product.name].incart += 1

  } else {
    product.incart = 1;
    cartItem = {
      [product.name]: product
    }

  }

  localStorage.setItem("productInCart", JSON.stringify(cartItem))

}

function totallCost(product) {

  let tottalCost = localStorage.getItem("tottalCost")
  tottalCost = parseInt(tottalCost)

  if (tottalCost) {
    localStorage.setItem("tottalCost", tottalCost + product.price)
  } else {
    localStorage.setItem("tottalCost", product.price)
  }
}

function displayProducts() {

  let productContainer = document.querySelector(".product-container")
  productContainer.innerHTML = ''
  let cartItem = localStorage.getItem("productInCart")
  let tottalCost = localStorage.getItem("tottalCost")
  cartItem = JSON.parse(cartItem)

  Object.values(cartItem).map(item => {

    productContainer.innerHTML += `
          <div class=" row align-items-center justify-content-center mb-2">
            <div class="col-7">
              <div class="row">
                <div class="col-4">
                  <img class="img-fluid" src="media/${item.tag}.jpg" alt="">
                </div>
                <div class="col-8">
                  <div class="d-flex flex-column justify-content-center h-100">
                    <span>${item.name}</span>
                    <span class="text-muted">Delivery 25th Sep</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="quantity d-flex justify-content-between">
                <i class="far fa-minus-square"></i>
                <span class="product-quantity">${item.incart}</span>
                <i class="far fa-plus-square"></i>
              </div>
            </div>
            <div class="col-2">
              <div class="cart-price text-center"><span>${item.incart * item.price}$</span></div>
            </div>
          </div>
          <hr>
    `
  })

  productContainer.innerHTML += `
  <div class="tottal-cost">
  <span class="tottal font-weight-bold">TOTTAL<span class="float-right">${tottalCost}$</span></span>
  </div>`

}

cartIncrease()
displayProducts()
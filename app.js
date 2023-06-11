// SELECT ELEMENTS
const productE1 = document.querySelector(".product");
const cartItemsE1 = document.querySelector(".cart-items");
const totalE1 = document.querySelector(".total");
const totaltiemsincartE1 = document.querySelector(".total-tiems-in-cart");
console.log(totalE1);

// RENDER PRODUCTS
function renderProducts() {
    products.forEach((product) => {
        productE1.innerHTML += `
            <div class="item">
                <!-- <div class="item-container"> -->
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="">
                        <div class="desc">
                            <span>${product.brand}</span>
                            <h5>${product.name}</h5>
                            <h4>${product.price}</h4>
                        </div>
                        <div onclick="addToCart(${product.id})">
                            <p class="cart">+</p>
                        </div>
                    <!-- </div> -->
                </div>
            </div>
        `
    });
}
renderProducts();

// CART TO ADD SELECTED ITEMS
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
    // IF ITEM ALREADY PRSENT
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus",id);
    }
    else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberofunits: 1,
        });
    }
    updateCart();
}

//UPDATE CART
function updateCart() {
    renderCartItems();
    renderTotal();

    //SAVE CART IN LOCAL STORAGE
    localStorage.setItem("CART",JSON.stringify(cart));
}

//CALCULATE TOTAL
function renderTotal(){
    let totalprice = 0, 
    totalitems = 0;

    cart.forEach((item) => {
        totalprice += item.price * item.numberofunits;
        totalitems += item.numberofunits;
    });

    totalE1.innerHTML = ` 
        <h3>CART TOTALS</h3>
        <table>
            <tr>
                <td>CART SUBTOTAL</td>
                <td>${totalprice}</td>
            </tr>
            <tr>
                <td>SHIPPING</td>
                <td>FREE</td>
            </tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>${totalprice}</strong></td>
            </tr>
        </table>
        <button class="normal">BUY NOW</button>
         `
    totaltiemsincartE1.innerHTML = `<a href="#cart"><i class="fa fa-shopping-bag" aria-hidden="true">[ ${totalitems} ]</i></a>`
}

//REMOVE FROM CART
function removeItemFromCart(id){
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

//RENDER CART ITEMS
function renderCartItems() {
    cartItemsE1.innerHTML = ""; //CLEAR CART
    cart.forEach((item) => {
        cartItemsE1.innerHTML += `
        <tr>
        <td><p onclick="removeItemFromCart(${item.id})">-</p></td>
        <td><img src="${item.imgSrc}" alt=""></td>
        <td>${item.name}</td>
        <td><div class="minus" onclick="changeNumberOfUnits('minus',${item.id})"> - </div> ${item.numberofunits} <div class="plus" onclick="changeNumberOfUnits('plus',${item.id})"> + </div></td>
        <td>${item.price}</td>
        </tr><br>`
    });
}

//CHANGE NUMBER OF UNITS
function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {

        let numberofunits = item.numberofunits;
        console.log(numberofunits);
        if (item.id === id) {
            if(action === "minus" && numberofunits > 1) {
                numberofunits--;
            }
            else if(action === "plus" && numberofunits < item.instock ) {
                numberofunits++;
            }
        }

        return {
            ...item,
            numberofunits,
        };
    });
    updateCart(); 
}
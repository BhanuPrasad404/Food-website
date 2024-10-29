const addItemButton = document.getElementById('increment');
const removeItemButton = document.getElementById('decrement');
const quantityDisplay = document.getElementById('quantity');
const addButtons = document.querySelectorAll('.add-btn');
const subtotalDisplay = document.getElementById('subt');


let quantity = 0;
let subtotal = 0;
let cartItems = [];
function updateSubtotalDisplay() {
   
    subtotalDisplay.textContent = `Subtotal: RS:${subtotal.toFixed(2)}`;
}

addButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const itemPrice = parseFloat(button.dataset.price);
        const itemName = button.dataset.name;
        const itemImage = button.dataset.image;
        let itemQuantity;
        itemQuantity++;
        
        subtotal += itemPrice;
        updateSubtotalDisplay();
        cartItems.push({ name: itemName, price: itemPrice, image: itemImage });


       

        addItemToCart(itemName, itemPrice, itemImage);
        updateQuantityDisplay();

        function addItemToCart(name, price, image) {

            const cartContainer = document.getElementById('div');
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            itemQuantity = 1;
        
            cartItem.innerHTML = `
                <img src="${image}" alt="${name}" width="200" height="200">
                <button class="btn btn-primary btn-sm decrement-btn" id="d">-</button>
                <span class="mx-2 quantity-display" id="q">0</span>
                <button class="btn btn-primary btn-sm increment-btn" id="i">+</button>
        
                <button class="btn btn-danger btn-sm remove-btn">Remove</button>
        
        
                <hr>
                <h3>${name}</h3>
                <h2>RS:${price.toFixed(2)}</h2>
                
                <hr>
            `;
        
        
            cartContainer.appendChild(cartItem);
            const  quantityDisplay =  cartItem.querySelector('.quantity-display');
            const itemsub = cartItem.querySelector('.sb-total');
        
        
        
            cartItem.querySelector('.remove-btn').addEventListener('click', function () {
                removeCartItem(name, price, cartItem ,itemQuantity);
            });
        
            cartItem.querySelector('.increment-btn').addEventListener('click', function(){
                
                    itemQuantity++;
                    subtotal += price;
                    quantityDisplay.textContent = itemQuantity;
                    updateSubtotalDisplay();
        
                    updateQuantityDisplay();
            });
        
            cartItem.querySelector('.decrement-btn').addEventListener('click',function(){
                if (itemQuantity>0) {
                    itemQuantity--;
                    subtotal -= price;
                    quantityDisplay.textContent = itemQuantity;
                    updateSubtotalDisplay();
                }
            }); 
        
        
            
           // function subtotal(name,price, cartItem) {
              // sub += price;
        
              // itemsub.textContent = sub;
           // }
        }

        
    });
});

function removeCartItem(name, price, cartItem ,itemQuantity) {
    const cartContainer = document.getElementById('div');
    cartContainer.removeChild(cartItem);
    const itemIndex = cartItems.findIndex(item => item.name === name && item.price === price);
    // here we need to remove the duplicates prices and names insid the cartItems list 
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);

        subtotal -= price*itemQuantity;
        updateSubtotalDisplay();

        updateQuantityDisplay();
    }
}

document.getElementById('signup-form').addEventListener('submit',function(e){

    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpassword = document.getElementById('confirmpassword').value;

    if(!validateEmail(email)){

        alert("Enter the valid emial")
    }

    if(!validatePassword(password)){
        alert("Enter the minimum 8 charecters")
    }

    if(password !== cpassword){
        alert("password do not match")


    }

    sendDataToServer(email, password);
});

function validateEmail(email){

    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function validatePassword(password){

    const r = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return r.test(password);
}

function sendDataToServer(email, password) {
    // Here you would make an AJAX request to your server
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Sign up successful!'); // Replace this with actual handling of server response
  }
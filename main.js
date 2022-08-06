var p = document.getElementsByClassName("plus");
var flavours = document.getElementsByClassName("flavour");
var s = document.getElementById("order");
var t = document.getElementById("total_price");
var submitButton = document.getElementsByClassName("submit");
var heart_icon = document.getElementsByClassName("fa-heart");
var cart = new Map();
var total = 0;

function minus(flavour, flavourText, parent) {
    total--;
    if (cart.get(flavour) > 1) {
        var n = cart.get(flavour) - 1;
        cart.set(flavour, n);
        var newE = s.getElementsByClassName(flavour);
        newE[0].firstElementChild.firstElementChild.innerHTML = flavourText + " x " + cart.get(flavour) + " x " + 2 + "$";
        t.firstElementChild.innerHTML = "Total price:" + total * 2 + "$";
    } else {
        parent.remove();
        cart.delete(flavour);
        if (total == 0) {
            t.firstElementChild.innerHTML = "";
        } else {
            t.firstElementChild.innerHTML = "Total price:" + total * 2 + "$";
        }
    }
}

function total_price() {
    var total_price = document.createElement("h5");
    total_price.appendChild(document.createTextNode("Total price:" + total * 2 + "$"));
    if (total == 1) {
        t.appendChild(total_price);
    } else {
        t.firstElementChild.innerHTML = "Total price:" + total * 2 + "$";
    }
}

function enable_disable_plus_button() {
    Array.from(p).map((i) => {
        if (total === 6) {
            i.setAttribute("disabled", "");
        } else if (i.hasAttribute("disabled")) {
            i.removeAttribute("disabled");
        }
    });
}

function manageShoppingCard(flavour, flavourText) {
    var newDiv = document.createElement("div");
    var newDiv2_1 = document.createElement("div");
    var newDiv2_2 = document.createElement("div");
    var paragraph = document.createElement("p");
    var text = document.createTextNode(flavourText + " x " + 1 + " x " + 2 + "$");
    var icon = document.createElement("i");
    var b = document.createElement("button");
    var b2 = document.createElement("button");
    var text2 = document.createTextNode("-");
    newDiv2_1.setAttribute('class', 'div2_1');
    b.setAttribute('class', 'delete');
    paragraph.setAttribute('class', 'text');
    b2.setAttribute('class', 'minus');
    icon.setAttribute('class', 'fa-solid');
    icon.classList.add('fa-xmark', 'fa-xs');
    newDiv.setAttribute('class', 'selection');
    newDiv.classList.add(flavour);
    paragraph.appendChild(text);
    b.appendChild(icon);
    b2.appendChild(text2);
    newDiv2_1.appendChild(paragraph);
    newDiv2_1.appendChild(b2);
    newDiv2_2.appendChild(b);
    newDiv.appendChild(newDiv2_1);
    newDiv.appendChild(newDiv2_2);
    b.addEventListener('click', () => {
        total -= cart.get(flavour);
        newDiv.remove();
        cart.delete(flavour);
        if (total == 0) {
            t.firstElementChild.innerHTML = "";
        } else {
            t.firstElementChild.innerHTML = "Total price:" + total * 2 + "$";
        }
        enable_disable_plus_button();
    });
    b2.addEventListener('click', () => {
        minus(flavour, flavourText, newDiv);
        enable_disable_plus_button();
    });
    return newDiv;
}

function add(flavour, flavourText) {
    total++;
    if (!cart.has(flavour)) {
        s.appendChild(manageShoppingCard(flavour, flavourText));
        cart.set(flavour, 1);
        total_price();
    } else {
        var n = cart.get(flavour) + 1;
        cart.set(flavour, n);
        var newE = s.getElementsByClassName(flavour);
        newE[0].firstElementChild.firstElementChild.innerHTML = flavourText + " x " + cart.get(flavour) + " x " + 2 + "$";
        t.firstElementChild.innerHTML = "Total price:" + total * 2 + "$";
    }
}

Array.from(p).map((i) => {
    i.addEventListener('click', () => {
        var f = i.parentElement.parentElement.parentElement.classList[1];
        switch (f) {
            case "chocolate":
                add("chocolate", "Chocolate");
                break;
            case "vanilla":
                add("vanilla", "Vanilla");
                break;
            case "yogurt":
                add("yogurt", "Yogurt");
                break;
            case "coffee":
                add("coffee", "Coffee");
                break;
            case "melon":
                add("melon", "Melon");
                break;
            case "mango":
                add("mango", "Mango");
                break;
            case "mint":
                add("mint", "Mint");
                break;
            case "stracciatella":
                add("stracciatella", "Stracciatella");
                break;
            case "strawbery":
                add("strawbery", "Strawbery");
                break;
            case "caramel":
                add("caramel", "Butter Salted Caramel");
                break;
            case "passion_fruit":
                add("passion_fruit", "Passion Fruit");
                break;
            case "banana":
                add("banana", "Banana");
                break;
        }
        enable_disable_plus_button();
    });
});

Array.from(submitButton).map((i) => {
    i.addEventListener('click', () => {
        s.innerHTML = "";
        cart.clear();
        total = 0;
        enable_disable_plus_button();
        total_price();
        alert("Your order has been succesfully submitted !");
    });
});

Array.from(heart_icon).map((i) => {
    i.addEventListener('click', () => {
        i.classList.toggle("heart_clicked");
    });
});



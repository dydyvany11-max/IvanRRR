const MENU = {
    pizzas: {
        "Маргарита": { price: 500, calories: 300 },
        "Пепперони": { price: 800, calories: 400 },
        "Баварская": { price: 700, calories: 450 },
    },
    sizes: {
        "Большая":   { price: 200, calories: 200 },
        "Маленькая": { price: 100, calories: 100 },
    },
    toppings: {
        "сливочная моцарелла": { price: 50,  priceSmall: 50,  priceLarge: 50,  calories: 20 },
        "сырный борт":         { price: null, priceSmall: 150, priceLarge: 300, calories: 50 },
        "чедер и пармезан":    { price: null, priceSmall: 150, priceLarge: 300, calories: 50 },
    },
};

const order = {
    pizza:    '',
    size:     '',
    toppings: [],
};

function getToppingPrice(name, size) {
    const t = MENU.toppings[name];
    return size === 'Маленькая' ? t.priceSmall : t.priceLarge;
}

function calcTotal() {
    const price    = MENU.pizzas[order.pizza].price + MENU.sizes[order.size].price;
    const extras   = order.toppings.reduce((sum, t) => sum + getToppingPrice(t, order.size), 0);
    return price + extras;
}

function calcCalories() {
    const cals   = MENU.pizzas[order.pizza].calories + MENU.sizes[order.size].calories;
    const extras = order.toppings.reduce((sum, t) => sum + MENU.toppings[t].calories, 0);
    return cals + extras;
}

function showEl(id) {
    document.getElementById(id).classList.remove('hidden');
}

document.getElementById('pizzaType').addEventListener('change', function () {
    order.pizza = this.value;
    if (order.pizza) showEl('sizeDiv');
});

document.getElementById('size').addEventListener('change', function () {
    order.size = this.value;
    if (order.size) {
        showEl('toppingsDiv');
        showEl('calculateBtn');
    }
});

document.getElementById('calculateBtn').addEventListener('click', function () {
    if (!order.pizza || !order.size) {
        alert('Пожалуйста, выберите пиццу и размер.');
        return;
    }

    order.toppings = Array.from(
        document.querySelectorAll('#toppingsDiv input[type=checkbox]:checked'),
        cb => cb.value
    );

    document.getElementById('result').innerText =
        `Цена: ${calcTotal()} рублей\nКалорийность: ${calcCalories()} Ккалорий`;
});

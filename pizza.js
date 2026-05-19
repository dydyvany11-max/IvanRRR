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
        "сливочная моцарелла": { priceSmall: 50,  priceLarge: 50,  calories: 20 },
        "сырный борт":         { priceSmall: 150, priceLarge: 300, calories: 50 },
        "чедер и пармезан":    { priceSmall: 150, priceLarge: 300, calories: 50 },
    },
};

const state = {
    pizzaType:        null,
    size:             'Маленькая',
    selectedToppings: new Set(),
};

document.querySelector('input[name=size][value="Маленькая"]').checked = true;

function getToppingPrice(name) {
    const t = MENU.toppings[name];
    return state.size === 'Маленькая' ? t.priceSmall : t.priceLarge;
}

function getTotal() {
    if (!state.pizzaType) return { price: 0, calories: 0 };

    const pData = MENU.pizzas[state.pizzaType];
    const sData = MENU.sizes[state.size];

    let price    = pData.price    + sData.price;
    let calories = pData.calories + sData.calories;

    state.selectedToppings.forEach(name => {
        price    += getToppingPrice(name);
        calories += MENU.toppings[name].calories;
    });

    return { price, calories };
}

function refreshButton() {
    const { price, calories } = getTotal();
    document.getElementById('price').innerText    = price;
    document.getElementById('calories').innerText = calories;
}

document.querySelectorAll('.pizza-item').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.pizza-item').forEach(p => p.classList.remove('selected'));
        el.classList.add('selected');
        state.pizzaType = el.dataset.type;
        refreshButton();
    });
});

document.querySelectorAll('input[name=size]').forEach(radio => {
    radio.addEventListener('change', () => {
        state.size = radio.value;
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        radio.closest('.size-option').classList.add('selected');
        refreshButton();
    });
});

document.querySelectorAll('.topping-item').forEach(el => {
    el.addEventListener('click', () => {
        const key = el.dataset.topping;
        if (state.selectedToppings.has(key)) state.selectedToppings.delete(key);
        else                                 state.selectedToppings.add(key);
        el.classList.toggle('selected');
        refreshButton();
    });
});

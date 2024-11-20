const order = {}; // Object to store items and their quantities
let totalAmount = 0;

function addToOrder(item, price) {
    if (order[item]) {
        order[item].quantity += 1;
    } else {
        order[item] = { price, quantity: 1 };
    }
    totalAmount += price;
    updateOrder();
}

function removeSingleItem(item) {
    if (order[item]) {
        totalAmount -= order[item].price;
        order[item].quantity -= 1;
        if (order[item].quantity === 0) {
            delete order[item];
        }
    }
    updateOrder();
}

function removeEntireItem(item) {
    if (order[item]) {
        totalAmount -= order[item].price * order[item].quantity;
        delete order[item];
    }
    updateOrder();
}

function updateOrder() {
    const orderList = document.getElementById('order-list');
    const total = document.getElementById('total');
    orderList.innerHTML = '';

    for (const [item, details] of Object.entries(order)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item} *${details.quantity} - ₹${details.price * details.quantity}
            <button onclick="removeSingleItem('${item}')">-1</button>
            <button onclick="removeEntireItem('${item}')">Remove All</button>
        `;
        orderList.appendChild(listItem);
    }

    total.textContent = `Total: ₹${totalAmount}`;
}

function placeOrder() {
    if (Object.keys(order).length === 0) {
        alert('Your order is empty!');
    } else {
        alert('Thank you for your order!');
        // Clear the order
        for (const item in order) {
            delete order[item];
        }
        totalAmount = 0;
        updateOrder();
    }
}

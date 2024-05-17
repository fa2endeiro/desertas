// scripts.js

let cart = [];
let total = 0;

const updateTotal = () => {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `R$${(total / 100).toFixed(2)}`;
};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const price = parseInt(event.target.getAttribute('data-price'));
        cart.push({
            id: event.target.getAttribute('data-id'),
            price: price
        });
        total += price;
        updateTotal();
    });
});

document.getElementById('checkout-button').addEventListener('click', () => {
    // Carregar o Stripe.js
    const stripe = Stripe('pk_live_51PCpIXRsmSWYuL3jxbZAJa0pWsxrKRaExqJRAcFp5wc9Vm5ZFQKSpaMGstjwKZBuOXqj95tbx2JBRs1yRP02IXuZ00AACllRhf');

    // Crie uma instância do Stripe Checkout com seus produtos
    stripe.redirectToCheckout({
        lineItems: cart.map(product => ({
            price: product.id,
            quantity: 1
        })),
        mode: 'payment',
        successUrl: 'https://sua-url.com/success',
        cancelUrl: 'https://sua-url.com/cancel'
    }).then((result) => {
        if (result.error) {
            alert(result.error.message);
        }
    });
});

var stripe = Stripe('SEU_PUBLISHABLE_KEY_DO_STRIPE');
    var form = document.getElementById('donation-form');
    form.addEventListener('submit', function(event) {
    event.preventDefault();

    var amount = form.elements.amount.value;
    if (amount === 'custom') {
        amount = form.elements.amount_custom.value;
    }

    stripe.redirectToCheckout({
        lineItems: [{price: 'PREÇO_DO_PRODUTO_NO_STRIPE', quantity: 1}],
        mode: 'payment',
        successUrl: 'URL_DE_RETORNO',
        cancelUrl: 'URL_DE_CANCELAMENTO',
    }).then(function(result) {
        // Handle any errors that occur during the redirect.
    });
});
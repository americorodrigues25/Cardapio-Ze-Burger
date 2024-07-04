const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const adressInput = document.getElementById("adress")
const adressWarn = document.getElementById("adress-warn")
const toRemove = document.getElementById("to-remove")

let cart = [];

// FUNÇÃO PARA ABRIR MODAL DO CARRINHO
cartBtn.addEventListener("click", function () {
    updateCarModal();
    cartModal.style.display = "flex"
});

// FUNÇÃO PARA FECHAR MODAL QUANDO CLICAR NO BOTÃO
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
});

// FUNÇÃO PARA FECHAR MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function () {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
});

// FUNÇÃO PARA ADICIONAR ITEMS AO CARRINHO
menu.addEventListener("click", function () {
    let parentButton = event.target.closest(".add-to-card-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)

    }
})

// VERIFICA SE JA EXISTE O ITEM NO CARRINHO
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    // SE EXISTIR O ITEM NO CARRINHO, AUMENTA +1 NA QUANTIDADE AO INVÉZ DE DUPLICAR O NOME
    if (existingItem) {
        existingItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCarModal()

};

// ATUALIZAR O CARRINHO
function updateCarModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    // CRIANDO UM FOREACH PARA PERCORRER OS ITENS DO ARRAY "CART" E INCLUIR ITENS NO CARRINHO EXIBINDO OS DETALHES
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p>R$: ${item.price.toFixed(2)}</p>
                </div>

                <div class="text-red-500">
                    <button class="remove-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

    });

    // DEIXAR O VALOR COMO MOEDA REAL
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // CONTADOR DE ITENS NO CARRINHO
    cartCounter.innerText = cart.length;

};

// FUNÇÃO PARA REMOVER ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }

});

// FUNÇÃO PARA VERIFICAR SE TEM ITENS COM MAIS DE 1 QTD E REMOVE ITEM POR ITEM
function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCarModal();
            return;
        }

        cart.splice(index, 1);
        updateCarModal();

    }

};

// FUNÇÃO PARA PEGAR O QUE FOR DIGITADO NO INPUT
adressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    // VERIFICAR SE O INPUT ENDEREÇO ESTA SENDO DIGITADO
    if (inputValue.value !== "") {
        adressInput.classList.remove("border-red-500")
        adressWarn.classList.add("hidden")
    }
});

toRemove.addEventListener("input", function (event) {
    let inputValue = event.target.value;
});

// FINALIZAR CARRINHO
checkoutBtn.addEventListener("click", function () {

    // VERIFICA SE ESTA ABERTO OU FECHADO, CASO FECHADO EXIBE UM ALERTA
    const isOpen = checkRestauranteOpen();
    if (!isOpen) {
        alert("Restaurante fechado no momento!")
        return;
    }

    if (cart.length === 0)
        return;

    // ADICIONA O WARN E UMA BORDA VERMELHA CASO NÃO TENHA SIDO DIGITADO NADA NO INPUT
    if (adressInput.value === "") {
        adressWarn.classList.remove("hidden")
        adressInput.classList.add("border-red-500")
        return;
    }

    //ENVIAR PEDIDO PARA API WHATSAPP 
    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("");

    const message = encodeURIComponent(cartItems);
    const phone = "5511964166962";


    window.open(`https://wa.me/${phone}?text=Olá, gostaria de fazer um pedido: ${message} Endereço: ${adressInput.value} | Remover item: ${toRemove.value}`, "_blank");
    
    // ZERAR O CARRINHO APÓS FINALIZAR O PEDIDO
    cart = [];
    updateCarModal();

    // ZERA OS DADOS PREENCHIDOS NOS INPUTS
    adressInput.value = "";
    toRemove.value = "";

    // APÓS FINALIZAR PEDIDO FECHA O MODAL
    cartModal.style.display = "none";
});

// VALIDAR SE O RESTAURANDO ESTA ABERTO OU FECHADO
function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
};

const spanItem = document.getElementById("date-span")
const isOpen = checkRestauranteOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-700");
    spanItem.classList.add("bg-green-700");
} else {
    spanItem.classList.remove("bg-green-700");
    spanItem.classList.add("bg-red-700");
};

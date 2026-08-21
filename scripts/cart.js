/* =========================================================
   TÔ NO TRABALHO
   CART ENGINE

   Responsabilidades:
   → Renderizar o cardápio
   → Organizar produtos por categoria
   → Controlar opções
   → Gerenciar o carrinho
   → Calcular totais
   → Abrir/fechar carrinho
   → Gerar pedido para o WhatsApp

   Dados:
   → MENU
   → PRICES
========================================================= */


/* =========================================================
   ESTADO
========================================================= */

const cart = [];


/* =========================================================
   CONFIGURAÇÃO DAS CATEGORIAS
========================================================= */

const CATEGORY_CONFIG = {
    hamburgueres: {
        title: "Hambúrgueres",
        description: "Artesanais, generosos e feitos para matar a fome."
    },

    "caldos-pasteis": {
        title: "Caldos & Pastéis",
        description: "Escolha seu sabor e aproveite."
    },

    espetinhos: {
        title: "Espetinhos na Brasa",
        description: "Na brasa, do simples ao completo."
    }
};


/* =========================================================
   ELEMENTOS
========================================================= */

const menuContainer = document.querySelector("#menu");

const cartPanel = document.querySelector("#cart-panel");
const cartOverlay = document.querySelector("#cart-overlay");

const cartTrigger = document.querySelector("#cart-trigger");
const cartClose = document.querySelector("#cart-close");

const cartContainer = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout");


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: MENU_CONFIG.currency
    });
}


/* =========================================================
   PREÇO
========================================================= */

function getProductPrice(product, option = null) {

    if (typeof product.priceKey === "string") {
        return PRICES[product.priceKey];
    }

    if (option) {
        return PRICES[product.priceKey[option]];
    }

    return 0;
}


/* =========================================================
   RENDERIZAÇÃO DO CARDÁPIO
========================================================= */

function renderMenu() {

    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    const categories = [
        "hamburgueres",
        "caldos-pasteis",
        "espetinhos"
    ];

    categories.forEach(categoryId => {

        const products = MENU.filter(
            product => product.category === categoryId
        );

        if (!products.length) return;

        const category = CATEGORY_CONFIG[categoryId];

        const section = document.createElement("section");

        section.className = "menu-category";
        section.id = categoryId;
        section.dataset.category = categoryId;

        const heading = document.createElement("header");

        heading.className = "menu-category__heading";

        const title = document.createElement("h3");

        title.className = "menu-category__title";
        title.textContent = category.title;

        const description = document.createElement("p");

        description.className = "menu-category__description";
        description.textContent = category.description;

        heading.append(
            title,
            description
        );

        const grid = document.createElement("div");

        grid.className = "menu-category__grid";

        products.forEach(product => {

            grid.appendChild(
                createProductCard(product)
            );
        });

        section.append(
            heading,
            grid
        );

        menuContainer.appendChild(section);
    });
}


/* =========================================================
   CARD DO PRODUTO
========================================================= */

function createProductCard(product) {

    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.productId = product.id;

    const image = document.createElement("img");

    image.className = "product-card__image";

    image.src =
        `${MENU_CONFIG.imagePath}${product.image}`;

    image.alt = product.name;

    image.loading = "lazy";

    const content = document.createElement("div");

    content.className = "product-card__content";

    const title = document.createElement("h4");

    title.className = "product-card__title";
    title.textContent = product.name;

    const description = document.createElement("p");

    description.className =
        "product-card__description";

    description.textContent =
        product.description || "";

    content.append(
        title,
        description
    );


    /* =====================================================
       CALDOS E PASTÉIS
    ====================================================== */

    if (product.category === "caldos-pasteis") {

        const select =
            createFlavorSelect(product);

        const price =
            document.createElement("strong");

        price.className =
            "product-card__price";

        price.textContent =
            formatPrice(
                getProductPrice(product)
            );

        const button =
            createAddButton(product, () => {

                if (!select.value) {

                    select.focus();

                    return false;
                }

                addToCart(
                    product,
                    select.value,
                    getProductPrice(product)
                );

                return true;
            });

        content.append(
            select,
            price,
            button
        );
    }


    /* =====================================================
       ESPETINHOS
    ====================================================== */

    else if (product.category === "espetinhos") {

        const options =
            createSkewerOptions(product);

        const price =
            document.createElement("strong");

        price.className =
            "product-card__price";

        const updatePrice = () => {

            price.textContent =
                formatPrice(
                    getProductPrice(
                        product,
                        options.value
                    )
                );
        };

        options.addEventListener(
            "change",
            updatePrice
        );

        updatePrice();

        const button =
            createAddButton(product, () => {

                addToCart(
                    product,
                    options.value,
                    getProductPrice(
                        product,
                        options.value
                    )
                );

                return true;
            });

        content.append(
            options,
            price,
            button
        );
    }


    /* =====================================================
       HAMBÚRGUERES
    ====================================================== */

    else {

        const price =
            document.createElement("strong");

        price.className =
            "product-card__price";

        price.textContent =
            formatPrice(
                getProductPrice(product)
            );

        const button =
            createAddButton(product, () => {

                addToCart(
                    product,
                    null,
                    getProductPrice(product)
                );

                return true;
            });

        content.append(
            price,
            button
        );
    }

    card.append(
        image,
        content
    );

    return card;
}


/* =========================================================
   SELECT — CALDOS E PASTÉIS
========================================================= */

function createFlavorSelect(product) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "product-card__option";

    const label =
        document.createElement("label");

    label.textContent =
        "Escolha o sabor";

    label.htmlFor =
        `${product.id}-flavor`;

    const select =
        document.createElement("select");

    select.id =
        `${product.id}-flavor`;

    select.className =
        "product-card__select";

    const placeholder =
        document.createElement("option");

    placeholder.value = "";
    placeholder.textContent =
        "Selecionar sabor";

    placeholder.disabled = true;
    placeholder.selected = true;

    select.appendChild(
        placeholder
    );

    product.options.forEach(option => {

        const item =
            document.createElement("option");

        item.value = option;
        item.textContent = option;

        select.appendChild(item);
    });

    wrapper.append(
        label,
        select
    );

    return select;
}


/* =========================================================
   RADIO — ESPETINHOS
========================================================= */

function createSkewerOptions(product) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "product-card__option";

    const label =
        document.createElement("span");

    label.className =
        "product-card__option-label";

    label.textContent =
        "Escolha a opção";

    wrapper.appendChild(label);

    const group =
        document.createElement("div");

    group.className =
        "product-card__radio-group";

    product.options.forEach(
        (option, index) => {

            const label =
                document.createElement("label");

            label.className =
                "product-card__radio";

            const input =
                document.createElement("input");

            input.type = "radio";
            input.name = product.id;
            input.value = option;

            if (index === 0) {
                input.checked = true;
            }

            const text =
                document.createElement("span");

            text.textContent =
                option === "simples"
                    ? "Simples"
                    : "Completo";

            label.append(
                input,
                text
            );

            group.appendChild(label);
        }
    );

    wrapper.appendChild(group);

    Object.defineProperty(
        wrapper,
        "value",
        {
            get() {

                return wrapper.querySelector(
                    "input:checked"
                )?.value;
            }
        }
    );

    return wrapper;
}


/* =========================================================
   BOTÃO DE ADICIONAR
========================================================= */

function createAddButton(product, callback) {

    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "product-card__add";

    button.textContent =
        "Adicionar";

    button.addEventListener(
        "click",
        () => {

            const success =
                callback();

            if (!success) return;

            button.classList.add(
                "product-card__add--added"
            );

            button.textContent =
                "Adicionado ✓";

            setTimeout(() => {

                button.classList.remove(
                    "product-card__add--added"
                );

                button.textContent =
                    "Adicionar";

            }, 900);
        }
    );

    return button;
}


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function addToCart(
    product,
    option,
    price
) {

    const existingItem =
        cart.find(item =>
            item.productId === product.id &&
            item.option === option
        );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            productId: product.id,
            name: product.name,
            option,
            price,
            quantity: 1
        });
    }

    renderCart();
}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function changeQuantity(
    index,
    amount
) {

    const item = cart[index];

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart.splice(index, 1);
    }

    renderCart();
}


/* =========================================================
   REMOVER ITEM
========================================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    renderCart();
}


/* =========================================================
   TOTAL
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );
}


/* =========================================================
   QUANTIDADE TOTAL
========================================================= */

function getCartQuantity() {

    return cart.reduce(
        (total, item) =>
            total +
            item.quantity,
        0
    );
}


/* =========================================================
   RENDERIZAÇÃO DO CARRINHO
========================================================= */

function renderCart() {

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (!cart.length) {

        const empty =
            document.createElement("p");

        empty.className =
            "cart__empty";

        empty.textContent =
            "Seu carrinho está vazio.";

        cartContainer.appendChild(
            empty
        );

    } else {

        cart.forEach(
            (item, index) => {

                const element =
                    document.createElement(
                        "article"
                    );

                element.className =
                    "cart-item";

                const name =
                    document.createElement(
                        "h4"
                    );

                name.className =
                    "cart-item__name";

                name.textContent =
                    item.option
                        ? `${item.name} — ${formatOption(item.option)}`
                        : item.name;

                const subtotal =
                    document.createElement(
                        "span"
                    );

                subtotal.className =
                    "cart-item__subtotal";

                subtotal.textContent =
                    formatPrice(
                        item.price *
                        item.quantity
                    );

                const controls =
                    document.createElement(
                        "div"
                    );

                controls.className =
                    "cart-item__controls";

                const decrease =
                    document.createElement(
                        "button"
                    );

                decrease.type = "button";
                decrease.textContent = "−";
                decrease.setAttribute(
                    "aria-label",
                    `Diminuir quantidade de ${item.name}`
                );

                decrease.addEventListener(
                    "click",
                    () =>
                        changeQuantity(
                            index,
                            -1
                        )
                );

                const quantity =
                    document.createElement(
                        "span"
                    );

                quantity.textContent =
                    item.quantity;

                const increase =
                    document.createElement(
                        "button"
                    );

                increase.type = "button";
                increase.textContent = "+";
                increase.setAttribute(
                    "aria-label",
                    `Aumentar quantidade de ${item.name}`
                );

                increase.addEventListener(
                    "click",
                    () =>
                        changeQuantity(
                            index,
                            1
                        )
                );

                const remove =
                    document.createElement(
                        "button"
                    );

                remove.type = "button";
                remove.textContent =
                    "Remover";

                remove.addEventListener(
                    "click",
                    () =>
                        removeFromCart(
                            index
                        )
                );

                controls.append(
                    decrease,
                    quantity,
                    increase,
                    remove
                );

                element.append(
                    name,
                    subtotal,
                    controls
                );

                cartContainer.appendChild(
                    element
                );
            }
        );
    }

    const total =
        getCartTotal();

    const quantity =
        getCartQuantity();

    if (cartCount) {
        cartCount.textContent =
            quantity;
    }

    if (cartTotal) {
        cartTotal.textContent =
            formatPrice(total);
    }

    if (checkoutButton) {
        checkoutButton.disabled =
            cart.length === 0;
    }
}


/* =========================================================
   FORMATAÇÃO DAS OPÇÕES
========================================================= */

function formatOption(option) {

    const labels = {
        simples: "Simples",
        completo: "Completo"
    };

    return labels[option] || option;
}


/* =========================================================
   CARRINHO — ABRIR
========================================================= */

function openCart() {

    if (!cartPanel) return;

    document.body.classList.add(
        "cart-open"
    );

    cartPanel.setAttribute(
        "aria-hidden",
        "false"
    );

    cartOverlay?.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* =========================================================
   CARRINHO — FECHAR
========================================================= */

function closeCart() {

    if (!cartPanel) return;

    document.body.classList.remove(
        "cart-open"
    );

    cartPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    cartOverlay?.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   CARRINHO — TOGGLE
========================================================= */

function toggleCart() {

    if (
        document.body.classList.contains(
            "cart-open"
        )
    ) {

        closeCart();

    } else {

        openCart();
    }
}


/* =========================================================
   WHATSAPP
========================================================= */

function createWhatsAppMessage() {

    if (!cart.length) {
        return "";
    }

    const lines = [];

    lines.push(
        `*Pedido — ${MENU_CONFIG.restaurantName}*`
    );

    lines.push("");

    cart.forEach(item => {

        const itemName =
            item.option
                ? `${item.name} — ${formatOption(item.option)}`
                : item.name;

        const subtotal =
            item.price *
            item.quantity;

        lines.push(
            `• ${item.quantity}x ${itemName} — ${formatPrice(subtotal)}`
        );
    });

    lines.push("");

    lines.push(
        `*Total: ${formatPrice(getCartTotal())}*`
    );

    lines.push("");

    lines.push(
        "Olá! Gostaria de finalizar meu pedido. Poderiam calcular a entrega e o frete, por favor?"
    );

    return lines.join("\n");
}


/* =========================================================
   FINALIZAÇÃO
========================================================= */

function checkout() {

    if (!cart.length) return;

    if (!MENU_CONFIG.whatsapp) {

        console.warn(
            "Número do WhatsApp ainda não configurado em menu.js."
        );

        return;
    }

    const message =
        createWhatsAppMessage();

    const phone =
        MENU_CONFIG.whatsapp.replace(
            /\D/g,
            ""
        );

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   NAVEGAÇÃO DAS CATEGORIAS
========================================================= */

function setupCategoryNavigation() {

    const links =
        document.querySelectorAll(
            ".category-nav__item"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                links.forEach(
                    item =>
                        item.classList.remove(
                            "category-nav__item--active"
                        )
                );

                link.classList.add(
                    "category-nav__item--active"
                );
            }
        );
    });
}


/* =========================================================
   EVENTOS DO CARRINHO
========================================================= */

cartTrigger?.addEventListener(
    "click",
    toggleCart
);

cartClose?.addEventListener(
    "click",
    closeCart
);

cartOverlay?.addEventListener(
    "click",
    closeCart
);

checkoutButton?.addEventListener(
    "click",
    checkout
);


/* =========================================================
   ESC — FECHAR CARRINHO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            document.body.classList.contains(
                "cart-open"
            )
        ) {

            closeCart();
        }
    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderMenu();
renderCart();
setupCategoryNavigation();
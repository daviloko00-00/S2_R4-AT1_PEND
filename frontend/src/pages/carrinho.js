import { getCart, saveCart } from "../storage/cart";
import { enviarPedido } from "../api/api";

export function renderCarrinho(root) {
    const cart = getCart();

    let total = 0;

    root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Carrinho</span>
                <h2>Resumo do pedido</h2>
                <p>Veja os itens escolhidos, quantidades e valores antes de finalizar a compra.</p>
            </div>
        </section>
        <div class="cart-layout">
            <div class="cart-list" id="lista"></div>
            <aside class="cart-summary">
                <div class="summary-card">
                    <h3>Resumo da compra</h3>
                    <p id="total"></p>
                    <button id="checkout" class="btn-primary">Checkout</button>
                </div>
            </aside>
        </div>
    `;

    const lista = document.getElementById("lista");
    const checkoutButton = document.getElementById("checkout");

    if (cart.length === 0) {
        lista.innerHTML = '<p>Seu carrinho está vazio. Adicione produtos na página de produtos.</p>';
        checkoutButton.disabled = true;
        checkoutButton.textContent = "Carrinho vazio";
        checkoutButton.classList.add("disabled");
    } else {
        cart.forEach(item => {
            total += item.preco * item.qtd;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <h3>${item.nome}</h3>
                <div class="item-details">
                    <p>Quantidade: <strong>${item.qtd}</strong></p>
                    <p>Preço unitário: <strong>R$ ${item.preco}</strong></p>
                    <p>Subtotal: <strong>R$ ${item.preco * item.qtd}</strong></p>
                </div>
            `;

            lista.appendChild(div);
        });

        checkoutButton.disabled = false;
        checkoutButton.textContent = "Checkout";
        checkoutButton.classList.remove("disabled");

        checkoutButton.onclick = async () => {
            if (cart.length === 0) {
                return;
            }
            await enviarPedido(cart);
            alert("Pedido enviado 🚀");
            saveCart([]);
            location.hash = "#/";
        };
    }

    document.getElementById("total").innerText = `Total: R$ ${total}`;
}
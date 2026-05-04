import { getCart, saveCart } from "../storage/cart";
import { enviarPedido } from "../api/api";

export function renderCarrinho(root) {
    const cart = getCart();

    let total = 0;

    root.innerHTML = "<h1>Carrinho</h1><div id='lista'></div><h2 id='total'></h2><button id='checkout'>Finalizar</button>";

    const lista = document.getElementById("lista");

    cart.forEach(item => {
        total += item.preco * item.qtd;

        const div = document.createElement("div");
        div.innerHTML = `
            ${item.nome} - R$ ${item.preco} x ${item.qtd}
        `;

        lista.appendChild(div);
    });

    document.getElementById("total").innerText = `Total: R$ ${total}`;

    document.getElementById("checkout").onclick = async () => {
        await enviarPedido(cart);
        alert("Pedido enviado 🚀");
        saveCart([]);
        location.hash = "#/";
    };
}
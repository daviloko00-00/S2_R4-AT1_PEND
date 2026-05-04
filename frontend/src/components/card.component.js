import { addToCart } from "../storage/cart";

export function criarCard(produto) {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <img src="${produto.imagem}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco}</p>
        <button>Adicionar</button>
    `;

    div.querySelector("button").onclick = () => {
        addToCart(produto);
        alert("Adicionado ao carrinho 🛒");
    };

    return div;
}
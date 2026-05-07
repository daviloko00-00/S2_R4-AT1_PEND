import { addToCart } from "../storage/cart";

export function criarCard(produto) {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <img src="${produto.imagem}" />
        <div class="card-content">
            <h3>${produto.nome}</h3>
            <p class="category">${produto.categoria}</p>
            <p class="description">${produto.descricao}</p>
            <div class="card-meta">
                <span class="price">R$ ${produto.preco}</span>
                <span class="date">${produto.dataCad ? new Date(produto.dataCad).toLocaleDateString('pt-BR') : ''}</span>
            </div>
            <button>Comprar</button>
        </div>
    `;

    div.querySelector("button").onclick = () => {
        addToCart(produto);
        alert("Adicionado ao carrinho 🛒");
    };

    return div;
}
import { getProdutos } from "../api/api.js";
import { criarCard } from "../components/card.component.js";

export async function renderProdutos(root) {
    root.innerHTML = "<h1>Produtos</h1><div id='grid'></div>";

    const grid = document.getElementById("grid");
    const produtos = await getProdutos();

    produtos.forEach(p => {
        grid.appendChild(criarCard(p));
    });
}
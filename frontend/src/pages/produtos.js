import { getProdutos } from "../api/api.js";
import { criarCard } from "../components/card.component.js";

export async function renderProdutos(root) {
    root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Produtos</span>
                <h2>Escolha seus itens favoritos</h2>
                <p>Explore a vitrine de produtos com cartões visualmente destacados e navegação suave.</p>
            </div>
        </section>
        <section class="cards-grid" id="grid"></section>
    `;

    const grid = document.getElementById("grid");
    const produtos = await getProdutos();

    produtos.forEach(p => {
        grid.appendChild(criarCard(p));
    });
}
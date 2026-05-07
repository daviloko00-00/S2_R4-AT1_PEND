import './style.css'
import { renderProdutos } from './pages/produtos.js'
import { renderCarrinho } from './pages/carrinho.js'

const app = document.querySelector('#app');

function router() {
    const rota = location.hash || "#/";

    if (rota === "#/carrinho") {
        renderCarrinho(app);
    } else {
        renderProdutos(app);
    }
}

window.addEventListener("hashchange", router);
router();
const API_URL = "http://localhost:8081";

export async function getProdutos() {
    const res = await fetch(`${API_URL}/produtos`);
    const data = await res.json();
    const produtos = data?.result ?? [];

    return produtos.map(produto => ({
        id: produto.Id ?? produto.id,
        nome: produto.Nome ?? produto.nome,
        preco: produto.Valor ?? produto.valor,
        imagem: produto.CaminhoImagem ?? produto.caminhoImagem ?? produto.imagem
    }));
}

export async function enviarPedido(pedido) {
    await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    });
}
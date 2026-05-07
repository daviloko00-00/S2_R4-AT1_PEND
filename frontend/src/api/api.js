const API_URL = "http://10.87.169.50:8081";

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

export async function getPedidos() {
    const res = await fetch(`${API_URL}/pedidos`);
    const data = await res.json();
    const pedidos = data?.result ?? [];

    return pedidos.map(pedido => ({
        id: pedido.Id ?? pedido.id,
        clienteId: pedido.IdCliente ?? pedido.clienteId,
        subtotal: pedido.Subtotal ?? pedido.subtotal,
        status: pedido.Status ?? pedido.status,
        dataCad: pedido.DataCad ?? pedido.dataCad
    }));
}

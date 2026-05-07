const API_URL = "http://10.87.169.50:8081";

export async function getProdutos() {
    const res = await fetch(`${API_URL}/produtos/detalhes`);
    const data = await res.json();
    const produtos = Array.isArray(data) ? data : data?.result ?? [];

    return produtos.map(produto => ({
        id: produto.ProdutoId ?? produto.Id ?? produto.id,
        nome: produto.ProdutoNome ?? produto.Nome ?? produto.nome,
        preco: produto.Valor ?? produto.valor,
        imagem: produto.CaminhoImagem ?? produto.caminhoImagem ?? produto.imagem,
        categoria: produto.CategoriaNome ?? produto.categoriaNome ?? produto.Categoria ?? "",
        descricao: produto.Descricao ?? produto.descricao ?? "",
        dataCad: produto.ProdutoDataCad ?? produto.DataCad ?? produto.dataCad ?? ""
    }));
}

export async function enviarPedido(pedido) {
    await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            clienteId: 27,
            itens: pedido.map(item => ({
                produtoId: item.id,
                quantidade: item.qtd,
                valorItem: item.preco
            }))
        })
    });
}

export async function getPedidos() {
    const res = await fetch(`${API_URL}/pedidos`);
    const data = await res.json();
    const pedidos = Array.isArray(data) ? data : data?.result ?? [];

    return pedidos.map(pedido => ({
        id: pedido.Id ?? pedido.id,
        clienteId: pedido.ClienteId ?? pedido.clienteId,
        subtotal: pedido.SubTotal ?? pedido.Subtotal ?? pedido.subtotal,
        status: pedido.Status ?? pedido.status,
        dataCad: pedido.DataCad ?? pedido.dataCad
    }));
}
